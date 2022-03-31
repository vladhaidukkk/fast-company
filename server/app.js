const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('config');

const PORT = config.get('port') ?? 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const start = async () => {
  try {
    await mongoose.connect(config.get('mongodbUri'));
    console.log(chalk.green('Server was connected to MongoDB'));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server is running on PORT: ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
  }
};

start();
