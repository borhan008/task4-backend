"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { SALT } = require("../config/serverConfig");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: { type: DataTypes.STRING, allowNull: false },
      position: { type: DataTypes.STRING, allowNull: false },
      last_login: { type: DataTypes.DATE },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Active",
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  user.beforeCreate((each) => {
    each.password = bcrypt.hashSync(each.password, SALT);
  });
  return user;
};
