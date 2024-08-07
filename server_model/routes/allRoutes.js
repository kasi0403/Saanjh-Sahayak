const express = require("express");
const multer = require("multer");
const { 
  usersModel, 
  patientIdModel, 
  reportIdsModel, 
  careIDsModel, 
  reportDatasModel 
} = require("../schemas/allSchemas");

const allroutes = express.Router();
const upload = multer();

const generateUniqueUserId = async () => {
  let unique = false;
  let userId;

  while (!unique) {
    userId = Math.floor(1000 + Math.random() * 9000).toString();
    let existingUser = await patientIdModel.findOne({ userId });
    if (!existingUser) {
      unique = true;
    }
  }

  return userId;
};

allroutes.get('/', (req, res) => {
  console.log("Reached root");
  res.send("Backend home");
});

allroutes.get('/patients', async (req, res) => {
  try {
    const patients = await patientIdModel.find({}, 'userId name');
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal Server Error: Failed to fetch patients' });
  }
});

allroutes.get('/reports/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const reports = await reportIdsModel.find({ userId });
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Internal Server Error: Failed to fetch reports' });
  }
});

allroutes.get('/reportData/:reportId', async (req, res) => {
  try {
    const { reportId } = req.params;
    const reportData = await reportDatasModel.findOne({ _id: reportId });
    if (!reportData) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json(reportData);
  } catch (error) {
    console.error('Error fetching report data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



allroutes.post('/addpatient', upload.none(), async (req, res) => {
  try {
    console.log(req.body);
    const userId = await generateUniqueUserId();

    const { name, age, gender } = req.body;
    if (!name || !age || !gender) {
      return res.status(400).send('Missing required fields: name, age, gender');
    }

    const caretakers = await careIDsModel.find({});
    if (caretakers.length === 0) {
      throw new Error('No caretakers available');
    }

    let minLength = Infinity;
    let assignedCaretaker = null;

    caretakers.forEach(caretaker => {
      if (caretaker.patientIds.length < minLength) {
        minLength = caretaker.patientIds.length;
        assignedCaretaker = caretaker;
      }
    });

    if (!assignedCaretaker) {
      throw new Error('Unable to find a caretaker with minimum patients');
    }

    let newPatient = new patientIdModel({
      userId,
      name,
      age,
      gender,
      caretakerId: assignedCaretaker.userId
    });

    let patientFromDB = await newPatient.save();
    let newReportId = new reportIdsModel({
      userId,
      ALLreportIDs: [],
      PredictionID: []
    });
    let ReportIdfromDb = await newReportId.save();

    assignedCaretaker.patientIds.push(userId);
    await assignedCaretaker.save();

    console.log(patientFromDB, ReportIdfromDb);
    res.send(patientFromDB);
  } catch (err) {
    console.log("Error while adding patient. Check if it is duplicate.");
    console.log(err);
    res.status(500).send(err);
  }
});

allroutes.post('/signup', upload.none(), async (req, res) => {
  try {
    console.log(req.body);
    const userId = await generateUniqueUserId();

    let newUser = new usersModel({
      userId,
      username: req.body.username,
      password: req.body.password,
      userType: "Care Taker"
    });

    let userFromDB = await newUser.save();

    let newCareTaker = new careIDsModel({
      userId,
      patientIds: []
    });

    let careTakerFromDB = await newCareTaker.save();

    console.log(userFromDB);
    console.log(careTakerFromDB);

    res.send(userFromDB);
  } catch (err) {
    console.log("Error while adding user. Check if it is duplicate.");
    console.log(err);
    res.status(500).send(err);
  }
});

allroutes.post('/login', upload.none(), async (req, res) => {
  try {
    console.log(req.body);
    let user = await usersModel.findOne({ userId: req.body.userId });

    if (!user) {
      return res.status(400).send('Invalid username or password');
    }

    if (user.password !== req.body.password) {
      return res.status(400).send('Incorrect password');
    }

    res.send({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

allroutes.post("/submit", async (req, res) => {
  const { userId, date, ...AllData } = req.body;
  
  const reportData = AllData;
  const DocNote = "";
  const dietPlan = "";

  if (!userId || !date || !AllData) {
    return res.status(400).send("User ID, date, and report data are required");
  }

  try {
    const newReportData = new reportDatasModel({
      userId,
      date,
      reportPdf: reportData,
      docNote: DocNote,
      dietPlan: dietPlan,
    });
    
    const savedReportData = await newReportData.save();

    const updatedReportIds = await reportIdsModel.findOneAndUpdate(
      { userId },
      { $push: { ALLreportIDs: savedReportData._id } },
      { upsert: true, new: true }
    );

    console.log(savedReportData);
    res.send({ success: true, message: "Data saved successfully", report: savedReportData, reportIds: updatedReportIds });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Internal Server Error: Failed to save data');
  }
});

module.exports = allroutes;
