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
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
          height: "45mm",
          contents:
            '<div style="text-align: center;">Author: Shyam Hajare</div>',
        },
        footer: {
          height: "28mm",
          contents: {
            first: "Cover page",
            2: "Second page", // Any page number is working. 1-based index
            default:
              '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: "Last Page",
          },
        },
      };

      let users = [
        {
          name: "Shyam",
          age: "26",
        },
        {
          name: "Navjot",
          age: "26",
        },
        {
          name: "Vitthal",
          age: "26",
        },
        {
          name: "Abi",
          age: "26",
        },
        {
          name: "Ab2i",
          age: "26",
        }
      ];

      const { id } = req.params;
      const trip= await Trip.findByPk(id, {
        include: [{
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },{model:Expense}, {model:Saving}
      ],
      });
      console.log(typeof trip.dataValues);
      
      let document = {
        html: html,
        data: {
          users: users,
          trip: trip.dataValues
        },
        path: "./trip-report.pdf",
        type: "",
      };

      await pdf.create(document, options)
       
      // res.status(200).json({
      //   message: "Your trip report has been created",
      // });
      res.status(200).json(trip);
    } catch (err) {
      console.log(err);
      // next(err)
    }
  }
}

module.exports = reportController;
