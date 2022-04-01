const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");
const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");

const PORT = config.get("port") ?? 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

const start = async () => {
  try {
    mongoose.connection.once("open", async () => {
      await initDatabase();
    });
    await mongoose.connect(config.get("mongodbUri"));
    console.log(chalk.green("Server was connected to MongoDB"));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server is running on PORT: ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
};

start();
