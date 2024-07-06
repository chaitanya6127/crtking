// ### Message Model

// ```javascript
// // models/message.model.js
// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../connection/sql.connection");
// const Users = require("./users.model");
// const Groups = require("./groups.model");

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
```

// #### MessageHistory Model (Optional)

// ```
// // models/messageHistory.model.js
// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../connection/sql.connection");
// const Users = require("./users.model");
// const Messages = require("./message.model");

// const MessageHistory = sequelize.define("MessageHistory", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   messageId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: Messages,
//       key: "id",
//     },
//   },
//   content: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   action: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   actionBy: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: Users,
//       key: "id",
//     },
//   },
//   timestamp: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// });

// MessageHistory.belongsTo(Messages, { foreignKey: "messageId" });
// MessageHistory.belongsTo(Users, { foreignKey: "actionBy" });

// module.exports = MessageHistory;
// ```

// ### Controllers

// #### Message Controller

// ```javascript
// // controllers/messageController.js
// const { Message, MessageHistory, Users, Groups } = require('../models');

// exports.sendMessage = async (req, res) => {
//   const { content, userId, groupId } = req.body;

//   try {
//     const user = await Users.findByPk(userId);
//     const group = await Groups.findByPk(groupId);

//     if (!user || !group) {
//       return res.status(400).json({ error: 'User or Group does not exist' });
//     }

//     const message = await Message.create({ content, userId, groupId });
//     res.status(201).json(message);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Optional: Update and delete message functions for MessageHistory tracking
// exports.editMessage = async (req, res) => {
//   const { messageId, content, userId } = req.body;

//   try {
//     const message = await Message.findByPk(messageId);

//     if (!message) {
//       return res.status(404).json({ error: 'Message not found' });
//     }

//     message.content = content;
//     await message.save();

//     await MessageHistory.create({ messageId, content, action: 'edited', actionBy: userId });

//     res.status(200).json(message);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteMessage = async (req, res) => {
//   const { messageId, userId } = req.body;

//   try {
//     const message = await Message.findByPk(messageId);

//     if (!message) {
//       return res.status(404).json({ error: 'Message not found' });
//     }

//     await MessageHistory.create({ messageId, content: message.content, action: 'deleted', actionBy: userId });

//     await message.destroy();

//     res.status(200).json({ message: 'Message deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// ```

// ### Routes

// #### Message Routes

// ```javascript
// // routes/messageRoutes.js
// const express = require('express');
// const router = express.Router();
// const messageController = require('../controllers/messageController');

// router.post('/messages', messageController.sendMessage);
// router.put('/messages', messageController.editMessage); // Optional
// router.delete('/messages', messageController.deleteMessage); // Optional

// module.exports = router;
// ```

// ### Integration in `index.js`

// Ensure you integrate the new routes into your main application file.

// ```javascript
// // index.js
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;

// const userRoutes = require('./routes/userRoutes');
// const groupRoutes = require('./routes/groupRoutes');
// const groupUserRoutes = require('./routes/groupUserRoutes');
// const messageRoutes = require('./routes/messageRoutes');

// app.use(express.json());
// app.use('/api', userRoutes);
// app.use('/api', groupRoutes);
// app.use('/api', groupUserRoutes);
// app.use('/api', messageRoutes);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
// ```

// ### Summary of Today's Updates

// 1. **Updated Models:**
//    - **Users Model**
//    - **Groups Model**
//    - **GroupUser Model**
//    - **GroupUserHistory Model**
//    - **Message Model**: For storing messages in groups.
//    - **MessageHistory Model** (Optional): For tracking edits and deletions of messages.

// 2. **Controllers:**
//    - **User Controller**: Functionality to create users.
//    - **Group Controller**: Functionality to create groups.
//    - **GroupUser Controller**: Functionality to add and remove users from groups.
//    - **Message Controller**: Functionality to send messages, and optionally edit and delete messages.

// 3. **Routes:**
//    - **User Routes**: Routes to handle user operations.
//    - **Group Routes**: Routes to handle group operations.
//    - **GroupUser Routes**: Routes to handle adding and removing users from groups.
//    - **Message Routes**: Routes to handle message operations.

// 4. **Integration:**
//    - Integrated all routes into the main application file (`index.js`).

// These updates provide a robust messaging functionality within the group-user structure, allowing users to send, edit, and delete messages in groups, with optional tracking of message history. If you need further enhancements or adjustments, feel free to ask!