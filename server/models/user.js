'use strict';
const {
  Model
} = require('sequelize');
const {
  hasPassword
} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email must be unique'
      },
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        notNull: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        notNull: {
          msg: "Password is required"
        },
        len: {
          args: [7, 100],
          msg: "Password length min 7"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Username  must be unique'
      },
      validate: {
        notEmpty: {
          msg: "Username is required"
        },
        notNull: {
          msg: "Username is required"
        },
        len: {
          args: [6, 100],
          msg: "Username must have more than 6 characters"
        },
        is: {
          args: ["^[a-z]+$", 'i'],
          msg: "username can not contain symbols"
        },
      }
    },
    avatar: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birthDate: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate(inst, opt) {
        inst.password = hasPassword(inst.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};