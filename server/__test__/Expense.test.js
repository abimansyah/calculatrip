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
  Images,
} = require("../models/index");

const { createToken } = require("../helpers/jwt");

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
    await Images.destroy({
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
      tripImageUrl:
        "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
      targetBudget: 10000,
    });
    await Trip.create({
      name: "test trip two",
      startDate: "01-02-2021",
      endDate: "01-03-2021",
      homeCurrency: "USD",
      tripImageUrl:
        "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
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
      userId: 1,
      tripId: 1,
      amount: 5000,
      expenseCategoryId: 1,
      paymentMethodId: 1,
      location: "jakarta",
      description: "ini testing expense trip one",
      expenseDate: "02-01-2022",
    });

    await Expense.create({
      name: "expense trip one",
      userId: 1,
      tripId: 1,
      amount: 10000,
      expenseCategoryId: 1,
      paymentMethodId: 1,
      location: "jakarta",
      description: "ini testing expense trip one",
      expenseDate: "02-01-2022",
    });

    await Expense.create({
      name: "expense trip two",
      userId: 1,
      tripId: 2,
      amount: 2000,
      expenseCategoryId: 1,
      paymentMethodId: 1,
      location: "bandung",
      description: "ini testing expense trip two",
      expenseDate: "02-01-2022",
    });

    await Expense.create({
      name: "expense trip two",
      userId: 2,
      tripId: 1,
      amount: 2000,
      expenseCategoryId: 1,
      paymentMethodId: 1,
      location: "bandung",
      description: "ini testing expense trip two",
      expenseDate: "02-01-2022",
    });

    await Images.create({
      expenseId: 2,
      imageUrl: "www.dummy.com",
    });
    await Images.create({
      expenseId: 2,
      imageUrl: "www.dummy.com",
    });
  } catch (err) {
    console.log(err);
  }
});

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("POST /expenses/:tripId - create new trip", () => {
  test("POST /expenses/:tripId success status (201) - should return success with status (201)", (done) => {
    request(app)
      .post("/expenses/1")
      .set("access_token", token)
      .send({
        name: "expense trip one",
        amount: 5000,
        expenseCategoryId: 1,
        paymentMethodId: 1,
        location: "jakarta",
        description: "ini testing expense trip one",
        expenseDate: "02-01-2022",
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(201);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Expense added!");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /expenses/:tripId error status (400) - should return error with status (400) when expense name is null", (done) => {
    request(app)
      .post("/expenses/1")
      .set("access_token", token)
      .send({
        amount: 5000,
        expenseCategoryId: 1,
        paymentMethodId: 1,
        location: "jakarta",
        description: "ini testing expense trip one",
        expenseDate: "02-01-2022",
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Expense name is required");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /expenses/:tripId error status (400) - should return error with status (400) when expense amount is null", (done) => {
    request(app)
      .post("/expenses/1")
      .set("access_token", token)
      .send({
        name: "expense trip one",
        expenseCategoryId: 1,
        paymentMethodId: 1,
        location: "jakarta",
        description: "ini testing expense trip one",
        expenseDate: "02-01-2022",
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Amount is required");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /expenses/:tripId error status (400) - should return error with status (400) when expense amount is 0 or below", (done) => {
    request(app)
      .post("/expenses/1")
      .set("access_token", token)
      .send({
        name: "expense trip one",
        amount: 0,
        expenseCategoryId: 1,
        paymentMethodId: 1,
        location: "jakarta",
        description: "ini testing expense trip one",
        expenseDate: "02-01-2022",
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Amount can't be 0 or below");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /expenses/:tripId error status (400) - should return error with status (400) when expense category is null", (done) => {
    request(app)
      .post("/expenses/1")
      .set("access_token", token)
      .send({
        name: "expense trip one",
        amount: 10000,
        paymentMethodId: 1,
        location: "jakarta",
        description: "ini testing expense trip one",
        expenseDate: "02-01-2022",
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Choose expenses category!");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /expenses/:tripId error status (400) - should return error with status (400) when expense payment method is null", (done) => {
    request(app)
      .post("/expenses/1")
      .set("access_token", token)
      .send({
        name: "expense trip one",
        amount: 10000,
        expenseCategoryId: 1,
        location: "jakarta",
        description: "ini testing expense trip one",
        expenseDate: "02-01-2022",
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty(
          "message",
          "Choose expenses payment method!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /expenses/:tripId error status (400) - should return error with status (400) when expense date is null", (done) => {
    request(app)
      .post("/expenses/1")
      .set("access_token", token)
      .send({
        name: "expense trip one",
        amount: 10000,
        expenseCategoryId: 1,
        paymentMethodId: 1,
        location: "jakarta",
        description: "ini testing expense trip one",
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Expense Date is required");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /expenses/:tripId error status (400) - should return error with status (400) when expense date input is in wrong format", (done) => {
    request(app)
      .post("/expenses/1")
      .set("access_token", token)
      .send({
        name: "expense trip one",
        amount: 10000,
        expenseCategoryId: 1,
        paymentMethodId: 1,
        location: "jakarta",
        description: "ini testing expense trip one",
        expenseDate: "30-01-2022",
      })
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(400);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Invalid input date");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("POST /expenses/:tripId error status (404) - should return error with status (404) when trip not found", (done) => {
    request(app)
      .post("/expenses/300")
      .set("access_token", token)
      .send({
        name: "expense trip one",
        amount: 10000,
        expenseCategoryId: 1,
        paymentMethodId: 1,
        location: "jakarta",
        description: "ini testing expense trip one",
        expenseDate: "01-01-2022",
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
  test("POST /expenses/:tripId error status (401) - should return error with status (401) when token is invalid", (done) => {
    request(app)
      .post("/expenses/1")
      .set("access_token", wrongToken)
      .send({
        name: "expense trip one",
        amount: 10000,
        expenseCategoryId: 1,
        paymentMethodId: 1,
        location: "jakarta",
        description: "ini testing expense trip one",
        expenseDate: "01-01-2022",
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

describe("GET /expenses/trip/:tripId - get all expenses inside a trip", () => {
  test("GET /expenses/trip/:tripId success status (200) - should return all expenses inside a trip", (done) => {
    request(app)
      .get("/expenses/trip/1")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(200);
        expect(result).toEqual(expect.any(Array));
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("GET /expenses/trip/:tripId error status (404) - should return erro with status (404) when trip is not found", (done) => {
    request(app)
      .get("/expenses/trip/4")
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
    jest.spyOn(Expense, "findAll").mockRejectedValue("Error");
    return request(app)
      .get("/expenses/trip/1")
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

describe("GET /expenses/:expenseId - get one expense inside a trip", () => {
  test("GET /expenses/:expenseId success status (200) - should return all expenses inside a trip", (done) => {
    request(app)
      .get("/expenses/1")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(200);
        expect(result).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("GET /expenses/:expenseId error status (404) - should return error with status (404) when trip is not found", (done) => {
    request(app)
      .get("/expenses/6")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(404);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Expense not found");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("GET /trips error (500) - should handle error with status (500)", async () => {
    jest.spyOn(Expense, "findAll").mockRejectedValue("Error");
    return request(app)
      .get("/expenses/1")
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

describe("DELETE /expenses/:expenseId - delete one expense from a trip", () => {
  test("DELETE /expenses/:expenseId success status (200) - should delete one expense from a trip", (done) => {
    request(app)
      .delete("/expenses/1")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(200);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Expense has been deleted!");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("DELETE /expenses/:expenseId error status (404) - should return error with status (404) when expense is not found", (done) => {
    request(app)
      .delete("/expenses/6")
      .set("access_token", token)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(404);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Expense not found");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("DELETE /expenses/:expenseId error status (401) - should return error with status (401) when token is invalid", (done) => {
    request(app)
      .delete("/expenses/1")
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
  test("GET /expenses error (500) - should handle error with status (500)", async () => {
    jest.spyOn(Expense, "destroy").mockRejectedValue("Error");
    return request(app)
      .delete("/expenses/2")
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

describe("DELETE /expenses/:expenseId/image - delete image from expense", () => {
  test("DELETE /expenses/:expenseId/image - should delete one image from expense", (done) => {
    request(app)
      .delete("/expenses/2/image/1")
      .set("access_token", tokenUserTwo)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(200);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Image has been removed");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("DELETE /expenses/:expenseId/image - should return error with status (404) when image is not exist", (done) => {
    request(app)
      .delete("/expenses/2/image/600")
      .set("access_token", tokenUserTwo)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(404);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Image not found");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  test("DELETE /expenses/:expenseId/image - should return error with status (404) when expense is not exist", (done) => {
    request(app)
      .delete("/expenses/400/image/1")
      .set("access_token", tokenUserTwo)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(404);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Expense not found");
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
