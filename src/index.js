const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./config/serverConfig");
const userRouter = require("./routes/User");

const app = express();
const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  app.use("/api", userRouter);
  app.listen(PORT, () => {
    console.log("Server connected to port ", PORT);
  });
};

prepareAndStartServer();
