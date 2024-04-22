const {
  PORT,
  MONGO_DB_URI,
  MONGO_DB_SESSION_URI,
} = require("./config/server-config");
const express = require("express");
const app = express();
const apiRouter = require("./routes/index");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
app.use("/api/v1", apiRouter);

const setupAndStartServer = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI);
  } catch (error) {
    console.log("error connecting to the db", error);
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
};

setupAndStartServer();
