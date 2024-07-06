const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/sql.connection");

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Users;
