const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/sql.connection");
const Users = require("./users.model");
const Groups = require("./groups.model");

const GroupUser = sequelize.define("GroupUser", {
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
  addedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
  },
});

GroupUser.belongsTo(Users, { foreignKey: "userId" });
GroupUser.belongsTo(Groups, { foreignKey: "groupId" });
GroupUser.belongsTo(Users, { foreignKey: "addedBy" });

module.exports = GroupUser;
