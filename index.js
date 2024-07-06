const express = require("express");
const app = express();
const { connectToMysql, syncToDb } = require("./connection/sql.connection");

require("./model/users.model");
require("./model/groups.model");
require("./model/usergroups.model");
require("./model/groupUserHistory.model");
require("./model/message.model");

require("./model/index.model");


const userRoutes = require('./routes/user.routes');
const groupRoutes = require('./routes/group.routes');
const userGroupRoutes = require('./routes/usergroup.routes');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/many', userRoutes);
app.use('/api/many', groupRoutes);
app.use('/api/many', userGroupRoutes);


syncToDb();
connectToMysql()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    console.log("In connectToMysql()");
    console.log("SQL CONNECTED");
  })
  .catch((error) => {
    console.log("Not connected", error);
  });

const port = 4001;




