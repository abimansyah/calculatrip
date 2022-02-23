const {
  User,
  Trip,
  UserTrip,
  sequelize
} = require("../models/index");


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
        order: [
          ['id', 'DESC']
        ]
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
        tripImageUrl: req.uploadUrl,
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

  static async deleteCompanion(req, res, next) {
    try {
      const {
        tripId,
        userId
      } = req.params;

      const user = await User.findByPk(userId)
      const trip = await Trip.findByPk(tripId)

      const owner = await UserTrip.findOne({
        where: {
          UserId: req.user.id,
          TripId: trip.id
        }
      })

      if (owner.role !== "owner") {
        throw {
          name: 'Unauthorize'
        }
      }

      const userTrip = await UserTrip.findOne({
        where: {
          UserId: user.id,
          TripId: trip.id
        }
      })

      if (!userTrip) {
        throw {
          name: "UserTripNotFound"
        }
      }

      await UserTrip.destroy({
        where: {
          UserId: user.id,
          TripId: trip.id
        }
      })

      res.status(200).json({
        message: `You have deleted ${user.username} from trip ${trip.name}`
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}
module.exports = TripController;