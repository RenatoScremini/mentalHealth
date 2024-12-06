const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./models");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/checkins", require("./routes/checkinRoutes"));

// Sync database and start server
db.sequelize
  .sync({ force: false }) // Use `force: true` for resetting tables
  .then(() => {
    console.log("Database synced.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Error syncing database:", err));
