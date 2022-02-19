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
}

module.exports = ExpenseController;