const { user } = require("../models/index");
const {
  getByEmail,
  checkPassword,
  createToken,
} = require("../service/user-service");

const handleUserRegister = async (req, res) => {
  const body = req.body;

  try {
    if (
      !body ||
      !body.name ||
      !body.email ||
      !body.position ||
      !body.password
    ) {
      throw { errors: [{ message: "Fill up the all requireds fields." }] };
    }
    const newUser = await user.create({
      name: body.name,
      password: body.password,
      position: body.position,
      email: body.email,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      error: "",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "",
      error,
      data: [],
    });
  }
};

const handleUserLogin = async (req, res) => {
  const body = req.body;
  try {
    if (!body || !body.email || !body.password) {
      throw { errors: { message: "Fill up the all requireds fields." } };
    }
    console.log(body);
    const getUser = await getByEmail(body.email);
    if (!getUser) {
      throw { errors: { message: "Email not found" } };
    }
    if (getUser.status === "Blocked") {
      throw { errors: { message: "You are blocked" } };
    }
    const correctPassword = checkPassword(body.password, getUser.password);
    if (!correctPassword) {
      console.log("aaaa");

      throw { errors: { message: "Password doesn't match" } };
    }
    const token = createToken(getUser);

    const update = await user.update(
      { last_login: new Date() },
      {
        where: {
          id: getUser.id,
        },
      }
    );
    return res.status(200).json({
      success: true,
      data: token,
      message: "Successfully logged in",
      error: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "",
      error: error,
      data: [],
    });
  }
};

const showAllUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: ["id", "name", "email", "status", "last_login", "position"],
    });
    return res.status(200).json({
      success: true,
      data: users,
      message: "Successfully logged in",
      error: [],
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error,
      data: [],
      message: "",
    });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const id = req.body.id;

    if (!id) throw { error: { message: "Id not found" } };
    const deleteUser = await user.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      success: true,
      error: [],
      message: "Deleted Successfully.",
      data: deleteUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      data: [],
      message: "",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.body.id;
    const upd = req.body.upd;

    if (!id) throw { error: { message: "Id not found" } };
    const updateUser = await user.update(
      { status: upd },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      error: [],
      message: "Updated Successfully.",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
      data: [],
      message: "",
    });
  }
};

const checkAuth = (req, res) => {
  return res.status(200).json({
    authorised: true,
    message: "You're authorised",
    err: [],
    data: [],
  });
};

module.exports = {
  handleUserRegister,
  handleUserLogin,
  showAllUsers,
  deleteUsers,
  updateUser,
  checkAuth,
};
