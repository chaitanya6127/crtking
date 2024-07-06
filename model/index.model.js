const sequelize = require("../connection/sql.connection");
const Users = require("./users.model");
const Groups = require("./groups.model");
const GroupUser = require("./usergroups.model");
const GroupUserHistory = require("./groupUserHistory.model");
const Message = require("./message.model");
const MessageHistory = require("./messageHistory.model");

Users.belongsToMany(Groups, { through: GroupUser, foreignKey: "userId" });
Groups.belongsToMany(Users, { through: GroupUser, foreignKey: "groupId" });

Groups.belongsTo(Users, { foreignKey: "createdBy" });
GroupUser.belongsTo(Users, { foreignKey: "addedBy" });

GroupUserHistory.belongsTo(Users, { foreignKey: "userId" });
GroupUserHistory.belongsTo(Groups, { foreignKey: "groupId" });
GroupUserHistory.belongsTo(Users, { foreignKey: "actionBy" });

Message.belongsTo(Users, { foreignKey: "userId" });
Message.belongsTo(Groups, { foreignKey: "groupId" });

MessageHistory.belongsTo(Message, { foreignKey: "messageId" });
MessageHistory.belongsTo(Users, { foreignKey: "actionBy" });

module.exports = {
  Users,
  Groups,
  GroupUser,
  GroupUserHistory,
  Message,
  MessageHistory,
};
