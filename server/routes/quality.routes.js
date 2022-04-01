const express = require("express");
const router = express.Router({ mergeParams: true });
const Quality = require("../models/Quality");

router.get("/", async (req, res) => {
  try {
    const list = await Quality.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Try it later",
    });
  }
});

module.exports = router;
