const {
  Saving,
  Trip,
  User,
  UserTrip,
  Expense,
  ExpenseCategory,
  PaymentMethod,
} = require("../models/index");

let pdf = require("pdf-creator-node");
let fs = require("fs");
let html = fs.readFileSync("./db/report.html", "utf8");

class reportController {
  static async getReport(req, res, next) {
    try {

      let options = {
        format: "A4",
        orientation: "landscape",
        border: "5mm",
        header: {
          height: "0mm",
          // contents:
          //   '<div style="text-align: center;">Author: Shyam Hajare</div>',
        },
        // footer: {
        //   height: "28mm",
        //   contents: {
        //     first: "1",
        //     2: "2", // Any page number is working. 1-based index
        //     default:
        //       '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        //     last: "Last Page",
        //   },
        // },
      };

      const {
        tripId
      } = req.params;

      let trip = await Trip.findByPk(tripId, {
        include: [{
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          {
            model: Expense,
            include: [{
              model: User
            }, {
              model: ExpenseCategory
            }, {
              model: PaymentMethod
            }]
          },
          {
            model: Saving,
            include: [{
              model: User
            }]
          },
        ],
      });

      let index = 0

      let savings = trip.dataValues.Savings.map((e, index) => {
        let saving = e
        saving.dataValues.savingDate = new Date(saving.dataValues.savingDate).toISOString().split('T')[0]
        saving.dataValues.id = index + 1
        return saving
      })

      let expenses = trip.dataValues.Expenses.map((e, index) => {
        let expense = e
        expense.dataValues.expenseDate = new Date(expense.dataValues.expenseDate).toISOString().split('T')[0]
        expense.dataValues.id = index + 1
        return expense
      })

      let companions = trip.dataValues.Users.map((e, index) => {
        let companion = e
        companion.dataValues.id = index + 1
        return companion
      })

      trip.dataValues.startDate = new Date(trip.dataValues.startDate).toISOString().split('T')[0]

      trip.dataValues.endDate = new Date(trip.dataValues.endDate).toISOString().split('T')[0]

      let savingsAmount = trip.dataValues.Savings.map(e => {
        return e.amount
      })
      let expensesAmount = trip.dataValues.Expenses.map(e => {
        return e.amount
      })

      let totalSavings = 0
      for (let i = 0; i < savingsAmount.length; i++) {
        totalSavings += savingsAmount[i]
      }

      let totalExpenses = 0
      for (let i = 0; i < expensesAmount.length; i++) {
        totalExpenses += expensesAmount[i]
      }

      let remainingSavings = totalSavings - totalExpenses


      let tripNameUrl = trip.name.toLowerCase().split(" ").join("-")

      let document = {
        html: html,
        data: {
          trip: trip.dataValues,
          companions: companions,
          savings: savings,
          expenses: expenses,
          totalSavings: totalSavings,
          totalExpenses: totalExpenses,
          remainingSavings: remainingSavings
        },

        //kasih id trip di trip
        path: `./reportPdf/${tripNameUrl}-trip-report-${trip.id}.pdf`,
        type: "",
      };

      await pdf.create(document, options);

      let baseUrl = "http://localhost:3000"
      res.status(200).json({
        message: "Your trip report has been created",
        url: `${baseUrl}/${tripNameUrl}-trip-report-${trip.id}.pdf`,
      });
    } catch (err) {
      next(err)
    }
  }
}

module.exports = reportController;