const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const dotenv = require('dotenv');
dotenv.config();

// express.js package to handle file uploads
const multer = require("multer");

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");


const app = express();
app.use(bodyParser.json());
app.use(cors());

const upload = multer({ dest: "uploads/" });

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

//chatbot endpoint
app.post('/diagnose',async(req,res)=>{
  const{prompt} = req.body;
  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }
  try{
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      res.send(text);
  }catch(error){
    console.log(error);
    res.status(500).send("Failed to generate content");
  }
})




// Upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = path.join(__dirname, req.file.path);

  const pythonProcess = spawn("python", ["main.py", filePath]);

  pythonProcess.stdout.on("data", (data) => {
    try {
      res.json({ details: JSON.parse(data.toString()) });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).send("Error parsing output from Python script");
    }
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).send(data.toString());
  });

  pythonProcess.on("close", (code) => {
    fs.unlinkSync(filePath); // Clean up the uploaded file
    console.log(`child process exited with code ${code}`);
  });
});



// Save endpoint
app.post("/save", (req, res) => {
  const updatedData = req.body;
  // Here you can handle the logic to save the updated data
  // For example, you might save it to a database or a file
  // This is a placeholder response
  console.log('Received data to save:', updatedData);
  res.send({ success: true, message: "Data saved successfully" });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});





