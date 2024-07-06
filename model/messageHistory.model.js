const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/sql.connection");
const Users = require("./users.model");
const Messages = require("./message.model");

const MessageHistory = sequelize.define("MessageHistory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  messageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Messages,
      key: "id",
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  actionBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

MessageHistory.belongsTo(Messages, { foreignKey: "messageId" });
MessageHistory.belongsTo(Users, { foreignKey: "actionBy" });

module.exports = MessageHistory;
