const express = require("express");
const router = express.Router();
const { User } = require("../models");

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//update user
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const updatedUser = await User.update(
        { name, email, password },
        { where: { id } }
      );
      res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
