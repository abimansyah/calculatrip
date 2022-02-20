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
      username: "usernametesttwo",
      email: "testtwo@mail.com",
    });
    wrongToken = await createToken({
      idsalah: 100,
      usernamesalah: "usernametestwrong",
      emailsalah: "testwrong@mail.com",
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

describe("POST /trips - create new trip", () => {
  test("POST /trips success status (201) - should return success with status (201)", (done) => {
    request(app)
      .post("/trips")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung",
        startDate: "02-02-2021",
        endDate: "02-03-2021",
        homeCurrency: "IDR",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 20000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(201);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "Trip jalan jalan ke bandung has been created!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /trips success status (201) - should return success with status (201)", (done) => {
    request(app)
      .post("/trips")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung",
        startDate: "02-02-2021",
        endDate: "02-03-2021",
        homeCurrency: "IDR",
        targetBudget: 20000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(201);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "Trip jalan jalan ke bandung has been created!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /trips error status (400) - should return error when trip name is null", (done) => {
    request(app)
      .post("/trips")
      .set("access_token", token)
      .send({
        startDate: "02-02-2021",
        endDate: "02-03-2021",
        homeCurrency: "IDR",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 20000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Trip name is required");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /trips error status (400) - should return error when end date is null", (done) => {
    request(app)
      .post("/trips")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung",
        startDate: "02-02-2021",
        homeCurrency: "IDR",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 20000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "End Date is required");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /trips error status (400) - should return error when start date is null", (done) => {
    request(app)
      .post("/trips")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung",
        endDate: "02-03-2021",
        homeCurrency: "IDR",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 20000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Start Date is required");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /trips error status (400) - should return error when date format is invalid", (done) => {
    request(app)
      .post("/trips")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung",
        startDate: "300-02-2021",
        endDate: "300-03-2021",
        homeCurrency: "IDR",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 20000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Invalid date format");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /trips error status (400) - should return error when end date ended before start date", (done) => {
    request(app)
      .post("/trips")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung",
        startDate: "02-02-2021",
        endDate: "01-03-2021",
        homeCurrency: "IDR",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 20000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "End Date cannot end before Start Date"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /trips error status (400) - should return error when home currency is null", (done) => {
    request(app)
      .post("/trips")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung",
        startDate: "02-02-2021",
        endDate: "02-03-2021",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 20000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Home Currency is required");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /trips error status (401) - should return error with status (401) when access_token is invalid", (done) => {
    request(app)
      .post("/trips")
      .set("access_token", wrongToken)
      .send({
        name: "jalan jalan ke bandung",
        startDate: "02-02-2021",
        endDate: "02-03-2021",
        homeCurrency: "IDR",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 20000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(401);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Forbiden to Access");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe("GET /trips - get all trips", () => {

  test("GET /trips success (200) - get all trips for user with access_token", (done) => {
    request(app)
      .get("/trips")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        // console.log(result,"<<<<<<<<<<<<<<<<<<<");
        expect(resp.status).toBe(200);
        expect(result).toEqual(expect.any(Array));
        expect(result[0]).toHaveProperty("id", expect.any(Number));
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("GET /trips error (401) - should return error with status (401) when access_token is invalid", (done) => {
    request(app)
      .get("/trips")
      .set("access_token", wrongToken)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(401);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Forbiden to Access");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("GET /trips error (500) - should handle error with status (500)", async () => {

    jest.spyOn(UserTrip, 'findAll').mockRejectedValue('Error')

    return request(app)
      .get("/trips")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        // console.log(result, "<<<<<<<<<<<<<<<<<<<<<<<");
        expect(resp.status).toBe(500);
        expect(result).toHaveProperty("message", "Internal Server Error");
      })
      .catch((err) => {
        console.log(err);
      });
  });

});

describe("GET /trips/:id - get trips by id", () => {
  test("GET /trips/:id success (200) - get trip by id for user with access_token", (done) => {
    request(app)
      .get("/trips/1")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(200);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("id", expect.any(Number));
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("GET /trips error (401) - should return error with status (401) when access_token is invalid", (done) => {
    request(app)
      .get("/trips/1")
      .set("access_token", wrongToken)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(401);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Forbiden to Access");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("GET /trips error (404) - should return error with status (404) when trip is not found", (done) => {
    request(app)
      .get("/trips/400")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(404);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Trip not found");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

});

describe("PUT /trips/:id - edit trip", () => {
  test("PUT /trips/:id success status (200) - should return success with status (200)", (done) => {
    request(app)
      .put("/trips/1")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung edited",
        startDate: "02-02-2021",
        endDate: "02-03-2021",
        homeCurrency: "USD",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 50000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(201);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "Trip jalan jalan ke bandung edited has been updated!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("PUT /trips/:id error status (400) - should return error when trip name is null", (done) => {
    request(app)
      .put("/trips/1")
      .set("access_token", token)
      .send({
        name: null,
        startDate: "02-02-2021",
        endDate: "02-03-2021",
        homeCurrency: "USD",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 50000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Trip name is required");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("PUT /trips/:id error status (400) - should return error when start date is null", (done) => {
    request(app)
      .put("/trips/1")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung edited",
        startDate: null,
        endDate: "02-03-2021",
        homeCurrency: "USD",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 50000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Start Date is required");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("PUT /trips/:id error status (400) - should return error when end date is null", (done) => {
    request(app)
      .put("/trips/1")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung edited",
        startDate: "02-03-2021",
        endDate: null,
        homeCurrency: "USD",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 50000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "End Date is required");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("PUT /trips/:id error status (400) - should return error when end date is ended before start date", (done) => {
    request(app)
      .put("/trips/1")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung edited",
        startDate: "02-03-2021",
        endDate: "01-03-2021",
        homeCurrency: "USD",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 50000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "End Date cannot end before Start Date"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("PUT /trips/:id success status (400) - should return error when home currency is null", (done) => {
    request(app)
      .put("/trips/1")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung edited",
        startDate: "01-03-2021",
        endDate: "02-03-2021",
        homeCurrency: null,
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 50000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Home Currency is required");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("PUT /trips/:id error status (404) - should return error when trip not found", (done) => {
    request(app)
      .put("/trips/400")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung edited",
        startDate: "01-03-2021",
        endDate: "02-03-2021",
        homeCurrency: "IDR",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 50000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(404);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Trip not found");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("PUT /trips/:id error status (401) - should return error when user is unauthorized", (done) => {
    request(app)
      .put("/trips/1")
      .set("access_token", wrongToken)
      .send({
        name: "jalan jalan ke bandung edited by user Two",
        startDate: "01-03-2021",
        endDate: "02-03-2021",
        homeCurrency: "IDR",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 50000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(401);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Forbiden to Access");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("PUT /trips/:id error status (403) - should return error when user is unauthorized", (done) => {
    request(app)
      .put("/trips/2")
      .set("access_token", token)
      .send({
        name: "jalan jalan ke bandung edited by user Two",
        startDate: "01-03-2021",
        endDate: "02-03-2021",
        homeCurrency: "IDR",
        tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        targetBudget: 50000,
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(403);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "Unauthorize - Forbiden to Access"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe("DELETE /trips/:id - delete trip", () => {
  test("DELETE /trips/:id success status (200) - should return success with status (200)", (done) => {
    request(app)
      .delete("/trips/1")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(200);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "Trip jalan jalan ke bandung edited has been deleted!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("DELETE /trips/:id error status (401) - should return error when user is unauthorized", (done) => {
    request(app)
      .delete("/trips/1")
      .set("access_token", wrongToken)
      .then((resp) => {
        const result = resp.body;
        // console.log(result);
        expect(resp.status).toBe(401);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Forbiden to Access");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("DELETE /trips/:id error status (403) - should return error when user is tried to delete another user trip", (done) => {
    request(app)
      .delete("/trips/2")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(403);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "Unauthorize - Forbiden to Access"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("DELETE /trips/:id error status (404) - should return error when trip is not found", (done) => {
    request(app)
      .delete("/trips/5")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        // console.log(result);
        expect(resp.status).toBe(404);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Trip not found");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("DELETE /trips/:id error status (404) - should return error when trip is not found", (done) => {
    request(app)
      .delete("/trips/500")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(404);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Trip not found");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("GET /trips error (500) - should handle error with status (500)", async () => {
    jest.spyOn(Trip, 'destroy').mockRejectedValue('Error')
    return request(app)
      .delete("/trips/2")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(500);
        expect(result).toHaveProperty("message", "Internal Server Error");
      })
      .catch((err) => {
        console.log(err);
      });
  });

});

describe("POST /trips/:id - create invitation to another user", () => {
  test("POST /trips/:id success status (201) - should return success with status (201) when invitation sent", (done) => {
    request(app)
      .post("/trips/2")
      .set("access_token", token)
      .send({
        input:"usernametestdua"
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(201);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "Invitation sent to usernametestdua"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /trips/:id success status (201) - should return success with status (201) when invitation sent with email", (done) => {
    request(app)
      .post("/trips/2")
      .set("access_token", token)
      .send({
        input:"test2@mail.com"
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(201);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "Invitation sent to usernametestdua"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /trips/:id error status (404) - should return error with status (404) when user not found", (done) => {
    request(app)
      .post("/trips/2")
      .set("access_token", token)
      .send({
        input:"usernotfound"
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(404);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "User not found"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe("PATCH /trips/:userTripId - create invitation to another user", () => {
  test("PATCH /trips/:userTripId success status (200) - should return success with status (200) when invitation accepted or declined", (done) => {
    request(app)
      .patch("/trips/2")
      .set("access_token", token)
      .send({
        status:"accept"
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(200);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "You accept the invitation"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("PATCH /trips/:userTripId error status (404) - should return error with status (404) when invitation to non existent user trip", (done) => {
    request(app)
      .patch("/trips/100")
      .set("access_token", token)
      .send({
        status:"accept"
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(404);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "User Trip not found"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
