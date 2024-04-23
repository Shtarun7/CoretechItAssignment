const {
  PORT,
  MONGO_DB_URI,
  MONGO_DB_SESSION_URI,
} = require("./config/server-config");
const express = require("express");
const app = express();
const https = require("https");
const apiRouter = require("./routes/index");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const fs = require("fs");
app.use(mongoSanitize());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", apiRouter);
const sessionStore = MongoStore.create({
  mongoUrl: MONGO_DB_SESSION_URI,
  ttl: 1000 * 24 * 60 * 60,
});

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

console.log("options", options);
const setupAndStartServer = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI);
  } catch (error) {
    console.log("error connecting to the db", error);
    process.exit(1);
  }
  https.createServer(options, app).listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
};

setupAndStartServer();
