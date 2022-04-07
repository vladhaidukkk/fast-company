const express = require("express");
const router = express.Router({ mergeParams: true });
const Comment = require("../models/Comment");
const authMiddleware = require("../middlewares/auth.middleware");

router
  .route("/")
  .get(authMiddleware, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Comment.find({ [orderBy]: equalTo });

      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong. Try it later",
        error,
      });
    }
  })
  .post(authMiddleware, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.userId,
      });
      res.status(201).send(newComment);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: "Something went wrong. Try it later",
        error,
      });
    }
  });

router.delete("/:commentId", authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(400).send({
        message: "Comment does not exist",
      });
    }

    if (
      comment.userId.toString() !== req.userId &&
      comment.pageId.toString() !== req.userId
    ) {
      return res.status(403).send({
        message: "Forbidden",
      });
    }

    await comment.remove();
    res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Try it later",
      error,
    });
  }
});

module.exports = router;
