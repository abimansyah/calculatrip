const {
  User,
  Expense,
  ExpenseCategory,
  Images,
  PaymentMethod,
  Saving,
  Trip,
  UserTrip,
  sequelize,
} = require("../models/index");
const imageRandomizer = require("../helpers/imageRandomizer");

const defaultBackgrounds = [
  "https://images.unsplash.com/photo-1642287458180-449fad5abc2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
  "https://images.unsplash.com/photo-1462400362591-9ca55235346a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2032&q=80",
  "https://images.unsplash.com/photo-1510908072721-6fbd31199630?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1535747790212-30c585ab4867?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2025&q=80",
  "https://images.unsplash.com/photo-1465256410760-10640339c72c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1488441770602-aed21fc49bd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
];

class TripController {
  static async postTrip(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        name,
        startDate,
        endDate,
        homeCurrency,
        tripImageUrl,
        targetBudget,
      } = req.body;

      const newTrip = await Trip.create(
        {
          name,
          startDate,
          endDate,
          homeCurrency,
          tripImageUrl,
          targetBudget,
        },
        { transaction: t }
      );

      await UserTrip.create(
        {
          UserId: req.user.id,
          TripId: newTrip.id,
          status: "active",
          role: "owner",
        },
        { transaction: t }
      );

      await t.commit();
      res.status(201).json({
        message: `Trip ${newTrip.name} has been created!`,
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async getTrips(req, res, next) {
    try {
      const output = await User.findOne({
        where: {
          id: req.user.id,
        },
        include: [
          {
            model: Trip,
            order: [["createdAt", "desc"]],
            through: {
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
          },
        ],
      });
      res.status(200).json(output.Trips);
    } catch (err) {
      next(err);
    }
  }

  static async getTripById(req, res, next) {
    try {
      const { id } = req.params;
      const findTrip = await Trip.findByPk(id, {
        include: {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
          through: {
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
        },
      });
      if (!findTrip) {
        throw { name: "TripNotFound" };
      } else {
        res.status(200).json(findTrip);
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteTrip(req, res, next) {
    try {
      const { id } = req.params;
      const findTrip = await Trip.findByPk(id);
      if (!findTrip) {
        throw { name: "TripNotFound" };
      } else {
        await Trip.destroy({
          where: { id },
        });
        res.status(200).json({
          message: `Trip ${findTrip.name} has been deleted!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async editTrip(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        name,
        startDate,
        endDate,
        homeCurrency,
        tripImageUrl,
        targetBudget,
      } = req.body;

      const { id } = req.params;

      const findTrip = await Trip.findByPk(id);

      if (!findTrip) {
        throw { name: "TripNotFound" };
      } else {
        const editedTrip = await Trip.update(
          {
            name,
            startDate,
            endDate,
            homeCurrency,
            tripImageUrl:
              tripImageUrl ||
              defaultBackgrounds[imageRandomizer(defaultBackgrounds)],
            targetBudget,
          },
          { where: { id }, returning: true },
          { transaction: t }
        );

        await t.commit();
        res.status(201).json({
          message: `Trip ${editedTrip[1][0].name} has been updated!`,
        });
      }
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}
module.exports = TripController;
