const {PORT,MONGO_DB_URI}=require("./config/server-config");
const express=require("express");
const app = express();
const apiRouter = require("./routes/index");
const mongoose=require("mongoose")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);

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