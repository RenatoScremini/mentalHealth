const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || "localhost",
  dialect: "mysql",
  logging: false, // Disable logging for a cleaner output
});

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Unable to connect to the database:", err));

// Export models and Sequelize instance
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./User")(sequelize, Sequelize);
db.CheckIn = require("./CheckIn")(sequelize, Sequelize);

// Define relationships
db.User.hasMany(db.CheckIn, { foreignKey: "userId" });
db.CheckIn.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;
