const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/sql.connection");
const Users = require("./users.model");
const Groups = require("./groups.model");

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Groups,
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Message.belongsTo(Users, { foreignKey: "userId" });
Message.belongsTo(Groups, { foreignKey: "groupId" });

module.exports = Message;