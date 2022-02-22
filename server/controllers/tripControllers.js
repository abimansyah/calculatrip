const {
  User,
  Trip,
  UserTrip,
  sequelize
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

      const newTrip = await Trip.create({
        name,
        startDate,
        endDate,
        homeCurrency,
        tripImageUrl: req.uploadUrl,
        targetBudget: targetBudget || 0,
      }, {
        transaction: t
      });


      await UserTrip.create({
        UserId: req.user.id,
        TripId: newTrip.id,
        status: "accept",
        role: "owner",
      }, {
        transaction: t
      });

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
      const trip = await UserTrip.findAll({
        where: {
          UserId: req.user.id,
          status: "accept",

        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [{
          model: Trip,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [{
            model: User,
            through: {
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          }, ],
        }, ],
      });
      res.status(200).json(trip);
    } catch (err) {
      next(err);
    }
  }

  static async getTripById(req, res, next) {
    try {
      const {
        id
      } = req.params;
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
        throw {
          name: "TripNotFound"
        };
      } else {
        res.status(200).json(findTrip);
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteTrip(req, res, next) {
    try {
      const {
        id
      } = req.params;
      const findTrip = await Trip.findByPk(id);

      await Trip.destroy({
        where: {
          id
        },
      });
      res.status(200).json({
        message: `Trip ${findTrip.name} has been deleted!`,
      });
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
      const {
        id
      } = req.params;
      const findTrip = await Trip.findByPk(id);
      const editedTrip = await Trip.update({
        name,
        startDate,
        endDate,
        homeCurrency,
        tripImageUrl: req.uploadUrl ||
          defaultBackgrounds[imageRandomizer(defaultBackgrounds)],
        targetBudget,
      }, {
        where: {
          id
        },
        returning: true
      }, {
        transaction: t
      });

      await t.commit();
      res.status(201).json({
        message: `Trip ${editedTrip[1][0].name} has been updated!`,
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async addCompanion(req, res, next) {
    try {
      const {
        input
      } = req.body;

      let findUser = await User.findOne({
        where: {
          username: input,
        },
      });

      if (!findUser) {
        findUser = await User.findOne({
          where: {
            email: input,
          },
        });
      }
      if (!findUser) {
        throw {
          name: "User not found"
        };
      }

      await UserTrip.create({
        UserId: findUser.id,
        TripId: req.params.id,
        status: "pending",
        role: "companion",
      });

      res.status(201).json({
        message: `Invitation sent to ${findUser.username}`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async acceptInvitation(req, res, next) {
    try {
      const {
        userTripId
      } = req.params;
      const {
        status
      } = req.body;


      if (status !== "accept") {
        await UserTrip.destroy({
          where: {
            id: userTripId
          }
        })
        res.status(200).json({
          message: `You ${status} the invitation`,
        });
      }


      const userTrip = await UserTrip.findOne({
        where: {
          id: userTripId,
          UserId: req.user.id,
        },
      });
      if (!userTrip) {
        throw {
          name: "UserTripNotFound"
        };
      }

      await UserTrip.update({
        status: status
      }, {
        where: {
          id: userTripId,
          UserId: req.user.id,
        },
      });
      res.status(200).json({
        message: `You ${status} the invitation`,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = TripController;