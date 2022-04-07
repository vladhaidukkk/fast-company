const tokenService = require("../services/token.service");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    if (!accessToken) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }

    const data = tokenService.verifyAccessToken(accessToken);
    if (!data) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }

    req.userId = data._id;
    next();
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};
