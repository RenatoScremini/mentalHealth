module.exports = (sequelize, DataTypes) => {
    const CheckIn = sequelize.define("CheckIn", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mood: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sleepHours: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
      },
      checkinDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    });
  
    return CheckIn;
  };
  