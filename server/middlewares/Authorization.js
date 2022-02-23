const {
  Expense,
  Saving,
  Trip,
  UserTrip,
  User
} = require("../models/index");

const tripAuthorization = async (req, res, next) => {
  /* 
  pertama UserTrip berdasarkan TripId dan UserId yang diambil dari req.user.id
  lalu ketemu UserTrip nya dan cek rolenya di UserTrip itu
  Bila dia master/owner maka di ijinkan jika tidak maka forbidden access
  Ini untuk delete dan update/edit
  */
  try {
    const {
      id
    } = req.params;

    const trip = await Trip.findOne({
      where: {
        id: id,
      },
    });

    if (!trip) {
      throw {
        name: "TripNotFound"
      };
    }

    const userTrip = await UserTrip.findOne({
      where: {
        UserId: req.user.id,
        TripId: trip.id,
      },
    });

    if (!userTrip) {
      throw {
        name: "UserTripNotFound"
      };
    }

    if (userTrip.role === "owner") {
      next();
    } else {
      throw {
        name: "Unauthorize"
      };
    }
  } catch (err) {
    next(err);
  }
};
const expenseAuthorization = async (req, res, next) => {
  try {
    const {
      expenseId
    } = req.params;
    const expense = await Expense.findOne({
      where: {
        id: expenseId,
      },
    })
    if (!expense) {
      throw {
        name: 'ExpenseNotFound',
      }
    }
    const trip = await Trip.findOne({
      where: {
        id: expense.tripId,
      },
    })
    const userTrip = await UserTrip.findOne({
      where: {
        UserId: req.user.id,
        TripId: trip.id,
      },
    })

    if (userTrip.role === "owner") {
      next();
    } else if (userTrip.role !== "owner") {
      if (expense.userId === req.user.id) {
        next();
      }
    } else {
      throw {
        name: "Unauthorize"
      };
    }
  } catch (err) {
    next(err);
  }
};
const savingAuthorization = async (req, res, next) => {
  try {
    const {
      savingId
    } = req.params;
    const saving = await Saving.findOne({
      where: {
        id: savingId,
      },
    });
    if (!saving) {
      throw {
        name: "SavingNotFound"
      };
    }
    const trip = await Trip.findOne({
      where: {
        id: saving.tripId,
      },
    });

    const userTrip = await UserTrip.findOne({
      where: {
        UserId: req.user.id,
        TripId: trip.id,
      },
    });

    if (!userTrip) {
      throw {
        name: "Unauthorize"
      };
    }

    if (userTrip.role === "owner") {
      next();
    } else if (userTrip.role !== "owner") {
      if (saving.userId === req.user.id) {
        next();
      }
    }
  } catch (err) {
    next(err);
  }
};

const userAuthorization = async (req, res, next) => {
  try {
    const {
      id
    } = req.params
    const user = await User.findByPk(id);
    if (!user) {
      throw {
        name: "User not found"
      }
    }
    if (user.id !== req.user.id) {
      throw {
        name: 'Unauthorize'
      }
    }
    next()
  } catch (err) {
    next(err)
  }
}

const reportAuthorization = async (req, res, next) => {
  try {

    const userTrip = await UserTrip.findOne({
      where: {
        UserId: req.user.id,
        TripId: req.params.tripId
      }
    })

    if (!userTrip) {
      throw {
        name: 'Unauthorize'
      }
    }
    next()

  } catch (err) {
    next(err)
  }
}

module.exports = {
  tripAuthorization,
  expenseAuthorization,
  savingAuthorization,
  userAuthorization,
  reportAuthorization
};