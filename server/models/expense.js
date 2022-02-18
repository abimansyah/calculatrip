'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Expense.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Expense name is required"
        },
        notEmpty: {
          msg: "Expense name is required"
        },
      }
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Amount is required"
        },
        notEmpty: {
          msg: "Amount is required"
        },
        belowZero() {
          if(this.amount <= 0) {
            throw new error("Amount can't be 0 or below")
          }
        }
      }
    },
    expenseCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expenseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Expense Date is required"
        },
        notNull: {
          msg: "Expense Date is required"
        },
        isDate: {
          msg: "Invalid input date"
        }
      }
    },
    location: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};