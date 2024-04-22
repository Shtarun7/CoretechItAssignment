const {PORT,MONGO_DB_URI}=require("./config/server-config");
const express=require("express");
const app = express();
const apiRouter = require("./routes/index");
const mongoose=require("mongoose");
const cookieParser=require('cookie-parser');
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", apiRouter);

const setupAndStartServer = async() => {
    try {
        await mongoose.connect(MONGO_DB_URI);
      } catch (error) {
        console.log("error connecting to the db",error);
        process.exit(1)
      }
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  }

  setupAndStartServer();