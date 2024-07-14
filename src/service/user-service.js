const { user } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

const getByEmail = async (userEmail) => {
  try {
    console.log(userEmail);
    const getUser = await user.findOne({
      where: {
        email: userEmail,
      },
    });
    return getUser;
  } catch (error) {
    console.log(error);
    throw { error };
  }
};

const checkPassword = (plainPassword, encryptedPassword) => {
  try {
    const check = bcrypt.compareSync(plainPassword, encryptedPassword);
    return check;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createToken = (getUser) => {
  try {
    const result = jwt.sign(
      {
        email: getUser.email,
        id: getUser.id,
        name: getUser.name,
      },
      JWT_KEY
    );
    return result;
  } catch (error) {
    console.log(error);
    throw { error };
  }
};

const verifyToken = (token) => {
  try {
    const result = jwt.verify(token, JWT_KEY);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw { error: error };
  }
};

module.exports = {
  getByEmail,
  checkPassword,
  createToken,
  verifyToken,
};
