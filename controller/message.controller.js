const { Message, Users , Groups} = require('../model/index.model');

exports.sendMessage = async (req, res) => {
  const { content, userId, groupId } = req.body;

  try {
    const user = await Users.findByPk(userId);
    const group = await Groups.findByPk(groupId);

    if (!user || !group) {
      return res.status(400).json({ error: 'User or Group does not exist' });
    }

    const message = await Message.create({ content, userId, groupId });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessagesFromGroup = async (req, res) => {
  const { groupId } = req.params;

  try {         
    const messages = await Message.findAll({
      where: { groupId },
      include: [{ model: Users, attributes: ['id', 'userName'] }],
      order: [['createdAt', 'ASC']]
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
