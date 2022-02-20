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
      User.belongsToMany(models.Trip,{ through: models.UserTrip })
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
          args: ["^[A-Za-z0-9]+$",'i'],
          msg: "username can not contain symbols"
        },
      }
    },
    avatar: DataTypes.STRING,
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Phone Number has already been taken"
      },
      validate:{
        notNull:{
          msg: "Phone Number is required"
        },
        notEmpty:{
          msg: "Phone Number is required"
        },
        len: {
          args: [8,13],
          msg: "Phone Number should contain 8-13 digits"
        }
      }
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Birth Date is required"
        },
        notEmpty:{
          msg: "Birth Date is required"
        },
        isDate: {
          msg: "Invalid date format"
        }
      }
    }
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