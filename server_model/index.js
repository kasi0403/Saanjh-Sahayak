const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "sk-proj-YPVKMq7DuIq5OlfSUdKST3BlbkFJQXi1ka1TRULHWV9sitRf",
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const upload = multer({ dest: "uploads/" });

// Chat endpoint
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    res.send(chatCompletion.choices[0].message);
    console.log(chatCompletion.choices[0].message);
  } catch (error) {
    console.error("Error completing chat:", error);
    res.status(500).send("Error processing chat request");
  }
});

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






// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const {OpenAI} = require ('openai');

// const openai = new OpenAI({
//     apiKey: "sk-proj-YPVKMq7DuIq5OlfSUdKST3BlbkFJQXi1ka1TRULHWV9sitRf"
// });

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// app.post("/chat", async (req, res) => {
//     const { message } = req.body;
//     try {
//         const chatCompletion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [{"role": "user", "content": message}],
//           });
//         res.send(chatCompletion.choices[0].message)
//         console.log(chatCompletion.choices[0].message);

//     } catch (error) {
//         console.error("Error completing chat:", error);
//         res.status(500).send("Error processing chat request");
//     }
    
// });

// const port = 8080;
// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });

// const express = require("express");
// const cors = require("cors");
// const APIKEY="sk-proj-bVCBLwF7pIAEFthYMIQZT3BlbkFJmERfxWTwwM4oqWHnRlkF"
// const app = express();
// app.use(express.json());
// app.use(cors());

// app.post("/chat", async (req, res) => {
//     const options={
//         method:"POST",
//         headers:{
//             'Content-Type':'application/json',
//             'Authorization':`Bearer ${APIKEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             messages: [
//               {
//                 role: "user",
//                 content: "who won world cup 2022"
//               }
//             ],
//             max_tokens: 100,
//           })
         
//     }
//     try{
// const response= await fetch('https://api.openai.com/v1/chat/completions',options)
//         const data= await response.json()
//         res.send(data)
//     }
//     catch(err){
//         console.log(err)
//     }
    
// });

// const port = 5000;
// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });