const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const list = await User.find();
    res.send(list);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Try it later",
    });
  }
});

router.patch("/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId !== req.userId) {
      return res.status(403).send({
        message: "Forbidden",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.send(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Try it later",
    });
  }
});

module.exports = router;
