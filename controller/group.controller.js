const { Users, Groups } = require("../model/index.model");

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Groups.findAll();
    
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.createGroup = async (req, res) => {
  const { groupName, createdBy } = req.body;

  try {
    const creator = await Users.findByPk(createdBy);

    if (!creator) {
      return res.status(400).json({ error: "Creator does not exist" });
    }

    const group = await Groups.create({ groupName, createdBy });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
