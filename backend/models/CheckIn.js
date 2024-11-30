module.exports = (sequelize, DataTypes) => {
    const CheckIn = sequelize.define("CheckIn", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      moodScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 5,
      },
      sleepHours: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 8,
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
  