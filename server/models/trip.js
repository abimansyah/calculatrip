'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trip.belongsToMany(models.User, {through: models.UserTrip})
      Trip.hasMany(models.UserTrip)
    }
  }
  Trip.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Trip name is required"
        },
        notNull: {
          msg: "Trip name is required"
        }
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Start Date is required"
        },
        notNull:{
          msg: "Start Date is required"
        },
        isDate:{
          msg: "Invalid date format"
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "End Date is required"
        },
        notNull: {
          msg: "End Date is required"
        },
        isDate:{
          msg: "Invalid date format"
        },
        examineDate() {
          const sDate = this.startDate.getTime()
          const eDate = this.endDate.getTime()
          if(sDate > eDate){
            throw "End Date cannot end before Start Date"
          }
        }
      }
    },
    homeCurrency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Home Currency is required"
        },
        notNull: {
          msg: "Home Currency is required"
        },
      }
    },
    tripImageUrl: {
      type: DataTypes.STRING,
    },
    targetBudget: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};