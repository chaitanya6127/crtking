const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/sql.connection");
const Users = require("./users.model");
const Groups = require("./groups.model");

const GroupUserHistory = sequelize.define("GroupUserHistory", {
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

GroupUserHistory.belongsTo(Users, { foreignKey: "userId" });
GroupUserHistory.belongsTo(Groups, { foreignKey: "groupId" });
GroupUserHistory.belongsTo(Users, { foreignKey: "actionBy" });

module.exports = GroupUserHistory;
