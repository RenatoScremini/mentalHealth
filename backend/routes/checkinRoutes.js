const express = require("express");
const router = express.Router();
const { CheckIn } = require("../models");

// Create a new check-in
router.post("/create", async (req, res) => {
  try {
    console.log("Received userId:", req.body.userId);  //
    const { userId, mood, sleepHours, notes } = req.body;
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
    const checkIns = await CheckIn.findAll({ where: { userId } });
    res.json(checkIns);
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
