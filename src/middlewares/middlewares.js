const { verifyToken, getByEmail } = require("../service/user-service");

const authCheck = async (req, res, next) => {
  try {
    console.log(req.headers);
    const header = req.headers.authorization;
    const token = header.split("Bearer ")[1];
    const verify = verifyToken(token);
    if (!verify) {
      throw { error: "Unauthorised" };
    }
    const getUser = await getByEmail(verify.email);
    if (!getUser || getUser.status != "Active") {
      throw { error: "Unauthorised" };
    }
    next();
  } catch (error) {
    return res.status(401).json({
      error,
      message: "Unauthorised",
      authorised: false,
      data: {},
    });
  }
};

module.exports = { authCheck };
