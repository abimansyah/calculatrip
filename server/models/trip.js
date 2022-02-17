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
        }
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "startDate is required"
        },
        isDate:true
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "endDate is required"
        },
        isDate:true,
        examineDate() {
          const sDate = this.startDate.getTime()
          const eDate = this.endDate.getTime()
          if(sDate > eDate){
            throw new Error("endDate cannot end before startDate");
          }
        }
      }
    },
    homeCurrency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "homeCurrency is required"
        }
      }
    },
    tripImageUrl: {
      type: DataTypes.STRING,
    },
    targetBudget: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: 'Target Budget Must be in Number!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};