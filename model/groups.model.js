const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/sql.connection");
const Users = require("./users.model");

const Groups = sequelize.define("Groups", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  groupName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
  },
});

Groups.belongsTo(Users, { foreignKey: "createdBy" });

module.exports = Groups;
