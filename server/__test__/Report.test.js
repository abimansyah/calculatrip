const request = require("supertest");
const app = require("../app");

const {
  Trip,
  User,
  UserTrip,
  Saving,
  Expense,
  ExpenseCategory,
  PaymentMethod,
} = require("../models/index");

const {
  createToken
} = require("../helpers/jwt");

let token = "";
let tokenUserTwo = "";
let wrongToken = "";

beforeAll(async () => {
  try {
    await User.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await Trip.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await UserTrip.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await Saving.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await Expense.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await ExpenseCategory.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await PaymentMethod.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });

    await User.create({
      username: "usernametest",
      email: "test@mail.com",
      password: "1234567",
      phoneNumber: "111111111",
      avatar: "abcder",
      birthDate: "01-01-2022",
    });
    await User.create({
      username: "usernametestdua",
      email: "test2@mail.com",
      password: "1234567",
      phoneNumber: "2222222222",
      avatar: "abcder",
      birthDate: "01-01-2022",
    });

    token = await createToken({
      id: 1,
      username: "usernametest",
      email: "test@mail.com",
    });
    tokenUserTwo = await createToken({
      id: 2,
      username: "usernametest",
      email: "test@mail.com",
    });
    wrongToken = await createToken({
      idsalah: 100,
      usernamesalah: "usernametest",
      emailsalah: "test@mail.com",
    });

    await Trip.create({
      name: "test trip one",
      startDate: "01-02-2021",
      endDate: "01-03-2021",
      homeCurrency: "USD",
      tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
      targetBudget: 10000,
    });
    await Trip.create({
      name: "test trip two",
      startDate: "01-02-2021",
      endDate: "01-03-2021",
      homeCurrency: "USD",
      tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
      targetBudget: 12000,
    });

    await Trip.create({
      name: "test trip two",
      startDate: "01-02-2021",
      endDate: "01-03-2021",
      homeCurrency: "USD",
      tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
      targetBudget: 12000,
    });

    await UserTrip.create({
      UserId: 1,
      TripId: 1,
      status: "accept",
      role: "owner",
    });

    await UserTrip.create({
      UserId: 1,
      TripId: 2,
      status: "accept",
      role: "owner",
    });

    await UserTrip.create({
      UserId: 2,
      TripId: 1,
      status: "accept",
      role: "companion",
    });

    await UserTrip.create({
      UserId: 2,
      TripId: 3,
      status: "accept",
      role: "owner",
    });

    await Saving.create({
      name: "saving trip one pertama",
      amount: 25000,
      tripId: 1,
      userId: 1,
      savingDate: "01-01-2022",
    });
    await Saving.create({
      name: "saving trip one kedua",
      amount: 10000,
      userId: 1,
      tripId: 1,
      savingDate: "01-02-2022",
    });

    await Saving.create({
      name: "saving trip two pertama",
      amount: 3000,
      userId: 2,
      tripId: 2,
      savingDate: "03-01-2022",
    });
    await Saving.create({
      name: "saving trip two kedua",
      amount: 5000,
      userId: 2,
      tripId: 2,
      savingDate: "03-02-2022",
    });

    await ExpenseCategory.create({
      name: "Cafe",
      icon: "Cafe",
    });
    await PaymentMethod.create({
      name: "Credit",
      icon: "Credit",
    });

    await Expense.create({
      name: "expense trip one",
      tripId: 1,
      amount: 5000,
      expenseCategoryId: 1,
      paymentMethodId: 1,
      userId: 1,
      location: "jakarta",
      description: "ini testing expense trip one",
      expenseDate: "02-01-2022",
    });

    await Expense.create({
      name: "expense trip two",
      tripId: 2,
      amount: 2000,
      expenseCategoryId: 1,
      paymentMethodId: 1,
      userId: 1,
      location: "bandung",
      description: "ini testing expense trip two",
      expenseDate: "02-01-2022",
    });
  } catch (err) {
    console.log(err);
  }
});

beforeEach(() => {
  jest.restoreAllMocks()
})

describe("GET /report/:tripId - get all report data", () => {
  test("GET /report/:tripId success (200) - get report data for user with access_token", (done) => {
    request(app)
      .get("/report/1")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        // console.log(result, "<<<<<<<<<<<<<<");
        expect(resp.status).toBe(200);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Your trip report has been created");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("GET /report/:tripId error (403) - should return error with status (403) when user is unauthorized", (done) => {
    request(app)
      .get("/report/100")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        // console.log(result);
        expect(resp.status).toBe(403);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Unauthorize - Forbiden to Access");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test("GET /report/:tripId (500) - should handle error with status (500)", async () => {
    jest.spyOn(Trip, 'findByPk').mockRejectedValue('Error')
    return request(app)
      .get("/report/1")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        // console.log(result,"<<<<<<<<<<<<<<<<<<<<<<<");
        expect(resp.status).toBe(500);
        expect(result).toHaveProperty("message", "Internal Server Error");
      })
      .catch((err) => {
        console.log(err);
      });
  });

});

