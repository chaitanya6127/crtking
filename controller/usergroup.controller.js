const { sequelize } = require("../connection/sql.connection");
const {
  GroupUser,
  GroupUserHistory,
  Users,
  Groups,
} = require("../model/index.model");

exports.addUserToGroup = async (req, res) => {
  const { userId, groupId, addedBy } = req.body;

  try {
    const user = await Users.findByPk(userId);
    const group = await Groups.findByPk(groupId);
    const adder = await Users.findByPk(addedBy);

    if (!user || !group || !adder) {
      return res
        .status(400)
        .json({ error: "User, Group, or Adder does not exist" });
    }

    await GroupUser.create({
      userId,
      groupId,
      addedBy,
    });
    await GroupUserHistory.create({
      userId,
      groupId,
      action: "added",
      actionBy: addedBy,
    });

    res.status(201).json({ message: "User added to group successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.removeUserFromGroup = async (req, res) => {
  const { userId, groupId, removedBy } = req.body;

  try {
    const user = await Users.findByPk(userId);
    const group = await Groups.findByPk(groupId);
    const remover = await Users.findByPk(removedBy);

    if (!user || !group || !remover) {
      return res
        .status(400)
        .json({ error: "User, Group, or Remover does not exist" });
    }

    const groupUser = await GroupUser.findOne({
      where: {
        userId,
        groupId,
      },
    });

    if (!groupUser) {
      return res.status(404).json({ error: "User not found in the group" });
    }

    await groupUser.destroy();
    await GroupUserHistory.create({
      userId,
      groupId,
      action: "removed",
      actionBy: removedBy,
    });

    res.status(200).json({ message: "User removed from group successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCommonGroups = async (req, res) => {
  const userId1 = Number(req.query.userId1);
  const userId2 = Number(req.query.userId1);

  const query = `SELECT * 
      FROM example.groups g
      INNER JOIN example.groupusers gu1 ON g.id = gu1.groupId
      INNER JOIN example.groupusers gu2 ON g.id = gu2.groupId
      WHERE gu1.userId =  ? AND gu2.userId = ?
    `;

  // SELECT *
  // FROM  example.groupusers gu1
  // INNER JOIN example.groupusers gu2 ON g1.groupId = gu2.groupId
  // inner join example.groups g on g.id = gu2.groupId
  // WHERE gu1.userId =  ? AND gu2.userId = ?
  // SELECT *
  // FROM example.group s g
  // INNER JOIN example.groupusers gu1 ON g.id = gu1.groupId
  // INNER JOIN example.groupusers gu2 ON g.id = gu2.groupId
  // WHERE gu1.userId =  3 AND gu2.userId = 4
  try {
    const [results, metadata] = await sequelize.query(query, {
      replacements: [userId1, userId2],
      // type: sequelize.QueryTypes.SELECT,
    });
    console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
