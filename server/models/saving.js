'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Saving extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Saving.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "Name is required"
        },
        notNull: {
          msg: "Name is required"
        }
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "Amount is required"
        },
        notNull: {
          msg: "Amount is required"
        },
        belowZero() {
          if(this.amount <= 0) {
            throw new error("Amount can't be 0 or below")
          }
        }
      }
    },
    savingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: "Saving Date is required"
        },
        notNull: {
          msg: "Saving Date is required"
        },
      isDate: {
        msg: "Invalid input date"
      }
    }
  },
    tripId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Saving',
  });
  return Saving;
};