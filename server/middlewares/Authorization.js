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

const tripAuthorization = async (req, res, next) => {
  /* 
  pertama UserTrip berdasarkan TripId dan UserId yang diambil dari req.user.id
  lalu ketemu UserTrip nya dan cek rolenya di UserTrip itu
  Bila dia master/owner maka di ijinkan jika tidak maka forbidden access
  Ini untuk delete dan update/edit
  */
  try {
    const { id } = req.params;

    const trip = await Trip.findOne({
      where: {
        id: id,
      },
    });

    if (!trip) {
      throw { name: "TripNotFound" };
    }

    const userTrip = await UserTrip.findOne({
      where: {
        UserId: req.user.id,
        TripId: trip.id,
      },
    });

    if (!userTrip) {
      throw { name: "UserTripNotFound" };
    }

    if (userTrip.role === "owner") {
      next();
    } else {
      throw { name: "Forbiden to Access" };
    }
  } catch (err) {
    next(err);
  }
};
const expenseAuthorization = async (req, res, next) => {
  /* 
  if => 
  1. cari expense bersadarkan id yang ada di params
  2. ambil tripId dari hasil response expense
  3. cari UserTrip where (UserId = req.user.id) dan (UserTrip.TripId = expense.tripId)

  4. if !UserTrip maka throw error => Forbidden Access

  5. if UserTrip.role == "owner" maka next()
  ===
  6.else 

  cari Expense yang punya userId = req.user.id dan expense id ke yang di update/edit
  Bila ketemu si expense nya maka diijinkan untuk delete/edit

*/
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({
      where: {
        id: id,
      },
    });

    if (!expense) {
      throw { name: "ExpenseNotFound" };
    }

    const trip = await Trip.findOne({
      where: {
        id: expense.tripId,
      },
    });
    if (!trip) {
      throw { name: "TripNotFound" };
    }

    const userTrip = await UserTrip.findOne({
      where: {
        UserId: req.user.id,
        TripId: trip.id,
      },
    });

    if (!userTrip) {
      throw { name: "UserTripNotFound" };
    }

    if (userTrip.role === "owner") {
      next();
    } else if (userTrip.role !== "owner") {
      if (expense.userId === req.user.id) {
        next();
      }
    } else {
      throw { name: "Forbiden to Access" };
    }
  } catch (err) {
    next();
  }
};
const savingAuthorization = async (req, res, next) => {
  /* 
  if => 
  1. cari saving bersadarkan id yang ada di params
  2. ambil tripId dari hasil response saving
  3. cari UserTrip where (UserId = req.user.id) dan (UserTrip.TripId = saving.tripId)

  4. if !UserTrip maka throw error => Forbidden Access

  5. if UserTrip.role == "owner" maka next()
  ===
  6.else 

  cari saving yang punya userId = req.user.id dan saving id ke yang di update/edit
  Bila ketemu si saving nya maka diijinkan untuk delete/edit

*/
  try {
    const { id } = req.params;

    const saving = await Saving.findOne({
      where: {
        id: id,
      },
    });
    if (!saving) {
      throw { name: "SavingNotFound" };
    }

    const trip = await Trip.findOne({
      where: {
        id: saving.tripId,
      },
    });
    if (!trip) {
      throw { name: "TripNotFound" };
    }

    const userTrip = await UserTrip.findOne({
      where: {
        UserId: req.user.id,
        TripId: trip.id,
      },
    });

    if (!userTrip) {
      throw { name: "UserTripNotFound" };
    }

    if (userTrip.role === "owner") {
      next();
    } else if (userTrip.role !== "owner") {
      if (saving.userId === req.user.id) {
        next();
      }
    } else {
      throw { name: "Forbiden to Access" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  tripAuthorization,
  expenseAuthorization,
  savingAuthorization,
};
