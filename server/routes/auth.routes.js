const express = require("express");
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcryptjs");
const tokenService = require("../services/token.service");
const User = require("../models/User");
const { generateUserData } = require("../utils/helpers");
const { check, validationResult } = require("express-validator");

router.post("/signUp", [
  check("email", "Email is not correct").normalizeEmail().isEmail(),
  check("password", "Password length should in range 8-20 symbols").isLength({
    min: 8,
    max: 20,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            details: errors.array(),
          },
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXISTS",
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        ...generateUserData(),
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save({
        userId: newUser._id,
        refreshToken: tokens.refreshToken,
      });

      res.status(201).send({
        ...tokens,
        userId: newUser._id,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: "Something went wrong. try it later",
      });
    }
  },
]);

router.post("/signInWithPassword", [
  check("email", "Email is not correct").normalizeEmail().isEmail(),
  check("password", "Password can not be empty").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            details: errors.array(),
          },
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }

      const isPasswordsEqual = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordsEqual) {
        return res.status(400).json({
          error: {
            message: "INVALID_PASSWORD",
            code: 400,
          },
        });
      }

      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save({
        userId: existingUser._id,
        refreshToken: tokens.refreshToken,
      });

      res.status(200).send({
        ...tokens,
        userId: existingUser._id,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong. try it later",
      });
    }
  },
]);

router.post("/token", [
  check("refresh_token", "refresh_token is required").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            details: errors.array(),
          },
        });
      }

      const { refresh_token: refreshToken } = req.body;

      const data = tokenService.verifyRefreshToken(refreshToken);
      const dbToken = await tokenService.findToken(refreshToken);

      if (!data || !dbToken || data?._id !== dbToken?.userId?.toString()) {
        return res.status(401).send({
          message: "Unauthorized",
        });
      }

      const tokens = tokenService.generate({ _id: data._id });
      await tokenService.save({
        userId: data._id,
        refreshToken: tokens.refreshToken,
      });

      res.status(200).send({
        ...tokens,
        userId: data._id,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong. Try it later",
      });
    }
  },
]);

module.exports = router;
