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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
    {
      indexes: [
        {
          unique: true, // Enforces one check-in per day per user
          fields: ["userId", "checkinDate"],
        },
      ],
    }
  );

  return CheckIn;
};
