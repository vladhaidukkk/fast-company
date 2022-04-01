const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get("accessSecretKey"), {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, config.get("refreshSecretKey"));

    return { accessToken, refreshToken, expiresIn: 3600 };
  }

  async save({ userId, refreshToken }) {
    const existingToken = await Token.findOne({ userId });

    if (existingToken) {
      existingToken.refreshToken = refreshToken;
      return existingToken.save();
    }

    return await Token.create({ userId, refreshToken });
  }

  verifyRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("refreshSecretKey"));
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
