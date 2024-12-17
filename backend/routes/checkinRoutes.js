const express = require("express");
const router = express.Router();
const { CheckIn } = require("../models");
const { Op } = require("sequelize");

// Create a new check-in
router.post("/create", async (req, res) => {
  try {
    console.log("Received userId:", req.body.userId);  //
    const { userId, mood, sleepHours, notes } = req.body;
    const existingCheckIn = await CheckIn.findOne({
      where: {
        userId,
        checkinDate: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD
      },
    });
    if (existingCheckIn) {
      return res.status(400).json({ error: "You have already checked in today!" });
    }
    const checkIn = await CheckIn.create({ userId, mood, sleepHours, notes });
    res.status(201).json(checkIn);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get check-ins for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const checkIns = await CheckIn.findAll({
      where: { userId },
      order: [["checkinDate", "DESC"]],
    });

    res.status(200).json(checkIns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get check-in data for a specific user on a specific day
router.get("/history/:userId/:date", async (req, res) => {
  try {
    const { userId, date } = req.params;

    const checkIn = await CheckIn.findOne({
      where: {
        userId,
        checkinDate: date,
      },
    });

    if (!checkIn) {
      return res.status(404).json({ message: "No check-in data for this day." });
    }

    res.status(200).json(checkIn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get monthly check-in stats (mood and sleep hours)
router.get("/stats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const startDate = new Date();
    startDate.setDate(1); // Set to first day of the current month
    const endDate = new Date();

    const checkIns = await CheckIn.findAll({
      where: {
        userId,
        checkinDate: {
          [Op.between]: [startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0]],
        },
      },
      order: [["checkinDate", "ASC"]],
    });

    // Process data for charts
    const moodData = [];
    const sleepHoursData = [];
    let totalSleepHours = 0;

    checkIns.forEach((checkIn) => {
      moodData.push({ date: checkIn.checkinDate, mood: checkIn.mood });
      sleepHoursData.push({ date: checkIn.checkinDate, sleepHours: checkIn.sleepHours });
      totalSleepHours += checkIn.sleepHours;
    });

    const averageSleepHours = checkIns.length > 0 ? (totalSleepHours / checkIns.length).toFixed(2) : 0;

    res.status(200).json({ moodData, sleepHoursData, averageSleepHours });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check if the user has already checked in today
router.get("/hasCheckedInToday/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if the user has already checked in today
    const existingCheckIn = await CheckIn.findOne({
      where: {
        userId,
        checkinDate: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD
      },
    });

    // If a check-in is found, return true, otherwise false
    if (existingCheckIn) {
      return res.json({ hasCheckedIn: true });
    } else {
      return res.json({ hasCheckedIn: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//update check in --> Probably we won´t use this
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params; // id of the chek-in for founding it 
      const { mood, note } = req.body;
      const updatedCheckIn = await CheckIn.update(
        { mood, note },
        { where: { id } }
      );
      res.status(200).json({ message: 'Check-In updated successfully', updatedCheckIn });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
