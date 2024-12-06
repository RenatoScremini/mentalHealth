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

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Compare the plain text password
      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // console.log("userFound:", user);
      
      // Return user details or a success message (exclude the password)
      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(500).json({ error: "An error occurred while logging in" });
    }
  });
  

module.exports = router;
