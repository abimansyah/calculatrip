const {
  Expense,
  Trip,
  ExpenseCategory,
  PaymentMethod,
  User
} = require("../models/index");


class ExpenseController {
  static async postExpense(req, res, next) {
    try {
      const userId = req.user.id
      const {
        tripId
      } = req.params;
      const trip = await Trip.findByPk(tripId);
      if (!trip) {
        throw {
          name: "TripNotFound",
        };
      }
      const {
        name,
        amount,
        expenseCategoryId,
        paymentMethodId,
        location,
        description,
        expenseDate
      } = req.body;

      await Expense.create({
        name,
        amount,
        expenseCategoryId,
        paymentMethodId,
        location,
        description,
        tripId,
        userId,
        expenseDate
      })

      res.status(201).json({
        message: "Expense added!"
      })
    } catch (error) {
      next(error)
    }
  }

  static async getExpenses(req, res, next) {
    try {
      const {
        tripId
      } = req.params;
      const trip = await Trip.findByPk(tripId);
      if (!trip) {
        throw {
          name: "TripNotFound",
        };
      }
      const expenses = await Expense.findAll({
        where: {
          tripId: tripId
        },
        include: [{
          model: ExpenseCategory,
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"]
          }
        }, {
          model: PaymentMethod,
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"]
          }
        }, {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "avatar", "phoneNumber", "birthDate"]
          }
        }]
      })
      res.status(200).json(expenses)
    } catch (error) {
      next(error)
    }
  }

  static async getExpenseById(req, res, next) {
    try {
      const {
        expenseId
      } = req.params
      const expense = await Expense.findByPk(expenseId, {
        include: [{
          model: ExpenseCategory,
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"]
          }
        }, {
          model: PaymentMethod,
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"]
          }
        }, {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "avatar", "phoneNumber", "birthDate"]
          }
        }]
      })

      if (!expense) {
        throw {
          name: "ExpenseNotFound"
        }
      }

      res.status(200).json(expense)

    } catch (error) {
      next(error)
    }
  }

  static async deleteExpense(req, res, next) {
    try {
      const {
        expenseId
      } = req.params
      const expense = await Expense.findByPk(expenseId)
      if (!expense) {
        throw {
          name: "ExpenseNotFound"
        }
      }
      await Expense.destroy({
        where: {
          id: expenseId
        }
      })
      res.status(200).json({
        message: "Expense has been deleted!"
      })
    } catch (error) {
      next(error)
    }
  }

  static async uploadImage(req,res,next) {
    try {
      const { expenseId } = req.params
      await Images.create({
        expenseId,
        imageUrl: req.uploadUrl,
      })
      res.status(200).json({
        message: "Image has been added to expense!"
      })
    } catch (error) {
      next(error)
    }
  }

  static async deleteImage(req,res,next) {
    try {
      const { expenseId, imageId } = req.params

      const expense = await Expense.findByPk(expenseId)
      
      if(!expense){
        throw{name:"ExpenseNotFound"}
      }

      const deleteImage = await Images.findByPk(imageId)
      if(!deleteImage) {
        throw {name: "ImageNotFound"}
      }
      await Images.destroy({
        where: {
          id:imageId,
          expenseId
        }
      })
      res.status(200).json({
        message: "Image has been removed"
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = ExpenseController;