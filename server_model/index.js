const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const upload = multer({ dest: "uploads/" });

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Chatbot endpoint
app.post('/diagnose', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to generate content");
  }
});

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const filePath = path.join(__dirname, req.file.path);

  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    // Extract text from PDF
    const extractedText = data.text;
    console.log("Extracted Text:", extractedText);

    // Send the extracted text to Gemini to generate a nested dictionary
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `${extractedText} Generate a nested dictionary from the text where first give the patient details then give a dictionary where the primary keys are test categories (e.g., Blood Group, CBC) and each category contains a dictionary of test names as keys and their values as the test result along with their units as a single string without the range.Ignore non-whitespace characters.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedText = response.text();

      // Extract JSON dictionary from the generated text
      let dictionaryString = generatedText.substring(generatedText.indexOf('{'), generatedText.lastIndexOf('}') + 1);

      // Attempt to parse the JSON string
      let dictionary;
      try {
        dictionary = JSON.parse(dictionaryString);
      } catch (parseError) {
        // Clean the JSON string by removing backticks and fixing any potential issues
        dictionaryString = dictionaryString.replace(/`/g, '').replace(/[\n\r]/g, '');
        try {
          dictionary = JSON.parse(dictionaryString);
        } catch (finalParseError) {
          console.log("Final parsing error:", finalParseError);
          return res.status(500).send("Failed to parse generated dictionary");
        }
      }

      console.log("Generated Dictionary:", dictionary);

      // Respond with the generated dictionary
      res.json({ details: dictionary });
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to generate content");
    }
  } catch (error) {
    console.error("Error processing PDF:", error);

    // Clean up uploaded file in case of error
    fs.unlinkSync(filePath);

    res.status(500).send('Error processing PDF');
  }
});

// Save endpoint
app.post("/save", (req, res) => {
  const updatedData = req.body;
  // Handle the logic to save the updated data
  // For example, you might save it to a database or a file
  console.log('Received data to save:', updatedData);
  res.send({ success: true, message: "Data saved successfully" });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
