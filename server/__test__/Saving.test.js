const request = require('supertest');
const app = require("../app")

const {
    User,
    Trip,
    UserTrip,
    Saving,
    Expense,
    ExpenseCategory,
    PaymentMethod
} = require("../models/index")

const {
    createToken
} = require('../helpers/jwt')

let token = ""
let wrongToken = ""
let tokenUserTwo = "";

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
            startDate: "1/2/2021",
            endDate: "1/3/2021",
            homeCurrency: "USD",
            tripImageUrl: "https://images.unsplash.com/photo-1645096568201-1d92fd231335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
            targetBudget: 10000,
        });
        await Trip.create({
            name: "test trip two",
            startDate: "1/2/2021",
            endDate: "1/3/2021",
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
            UserId: 2,
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

        await Saving.create({
            name: "saving trip one pertama",
            amount: 25000,
            tripId: 1,
            userId: 1,
            savingDate: "01-01-2022"
        });
        await Saving.create({
            name: "saving trip one kedua",
            amount: 10000,
            userId: 2,
            tripId: 1,
            savingDate: "01-02-2022"
        });

        await Saving.create({
            name: "saving trip two pertama",
            amount: 3000,
            userId: 2,
            tripId: 2,
            savingDate: "03-01-2022"
        });
        await Saving.create({
            name: "saving trip two kedua",
            amount: 5000,
            userId: 1,
            tripId: 2,
            savingDate: "03-02-2022"
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
            expenseDate: "02-01-2022"
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
            expenseDate: "02-01-2022"
        });
    } catch (err) {
        console.log(err);
    }
});

describe('POST /savings/:tripsId - create new saving', () => {
    test('POST /savings/:tripsId success status (201) - should return new saving ', (done) => {
        request(app)
            .post('/savings/1')
            .set('access_token', token)
            .send({
                name: "test saving",
                amount: 10000,
                savingDate: "01-01-2022",
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(201)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", 'Happy saving!');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /savings/:tripsId Error status (400) - should return error when name is null ', (done) => {
        request(app)
            .post('/savings/1')
            .set('access_token', token)
            .send({
                amount: 10000,
                savingDate: "01-01-2022",
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Name is required");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /savings/:tripsId Error status (400) - should return error when amount is null ', (done) => {
        request(app)
            .post('/savings/1')
            .set('access_token', token)
            .send({
                name: "test saving",
                savingDate: "01-01-2022",
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Amount is required");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /savings/:tripsId Error status (400) - should return error when amount be 0 or below ', (done) => {
        request(app)
            .post('/savings/1')
            .set('access_token', token)
            .send({
                name: "test saving",
                amount: 0,
                savingDate: "01-01-2022",
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Amount can't be 0 or below");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /savings/:tripsId Error status (400) - should return error when Saving Date is null ', (done) => {
        request(app)
            .post('/savings/1')
            .set('access_token', token)
            .send({
                name: "test saving",
                amount: 100000,
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Saving Date is required");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /savings/:tripsId Error status (400) - should return error when Saving Date format invalid', (done) => {
        request(app)
            .post('/savings/1')
            .set('access_token', token)
            .send({
                name: "test saving",
                amount: 100000,
                savingDate: "22-01-2022",
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Invalid input date");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /savings/:tripsId Error status (400) - should return error when access token is wrong', (done) => {
        request(app)
            .post('/savings/1')
            .set('access_token', wrongToken)
            .send({
                name: "test saving",
                amount: 100000,
                savingDate: "02-01-2022",
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(401)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", 'Forbiden to Access');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /savings/:tripsId Error status (400) - should return error when id trip is not exist', (done) => {
        request(app)
            .post('/savings/111')
            .set('access_token', token)
            .send({
                name: "test saving",
                amount: 100000,
                savingDate: "02-01-2022",
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(404)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Trip not found");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})

describe('GET /savings/trip/:tripsId - Get all savings inside a trip', () => {
    test('GET /savings/trip/:tripsId Success status (200) - should return list of saving', (done) => {
        request(app)
            .get('/savings/trip/1')
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Array))
                expect(result[0]).toEqual(expect.any(Object));
                expect(result[0]).toHaveProperty("id", expect.any(Number));
                expect(result[0]).toHaveProperty("name", expect.any(String));
                expect(result[0]).toHaveProperty("amount", expect.any(Number));
                expect(result[0]).toHaveProperty("User", expect.any(Object));
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /savings/trip/:tripsId Error status (404) - should return error when trip id not found', (done) => {
        request(app)
            .get('/savings/trip/100')
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(404)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Trip not found");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /savings/trip/:tripsId Error status (403) - should return error when trip id not owner user', (done) => {
        request(app)
            .get('/savings/trip/2')
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(403)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Unauthorize - Forbiden to Access");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /savings/trip/:tripsId Error status (404) - should return error when Access token is wrong', (done) => {
        request(app)
            .get('/savings/trip/1')
            .set('access_token', wrongToken)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(401)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", 'Forbiden to Access');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

})

describe('GET /savings/:savingId - Get savings inside a trip by Id', () => {
    test('GET /savings/:savingId Success status (200) - should return saving', (done) => {
        request(app)
            .get('/savings/1')
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("id", expect.any(Number));
                expect(result).toHaveProperty("name", expect.any(String));
                expect(result).toHaveProperty("amount", expect.any(Number));
                expect(result).toHaveProperty("User", expect.any(Object));
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /savings/:savingId Error status (403) - should return error when id saving not owner user', (done) => {
        request(app)
            .get('/savings/3')
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(403)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", 'Unauthorize - Forbiden to Access');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /savings/:savingId Error status (403) - should return error when id saving not exist', (done) => {
        request(app)
            .get('/savings/333')
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(404)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", "Saving not found");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /savings/:savingId Error status (403) - should return error when token is wrong', (done) => {
        request(app)
            .get('/savings/1')
            .set('access_token', wrongToken)
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(401)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", "Forbiden to Access");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})

describe('DELETE /savings/:savingId - Delete one saving from a trip by Id', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })

    test('DELETE /savings/:savingId Success status (200) - should return saving deleted', (done) => {
        request(app)
            .delete('/savings/1')
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", "Saving has been deleted!");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('DELETE /savings/:savingId Error status (403) - should return error when saving not owner user', (done) => {
        request(app)
            .delete('/savings/3')
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(403)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", 'Unauthorize - Forbiden to Access');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('DELETE /savings/:savingId Error status (403) - should return error when saving usertrip as companion', (done) => {
        request(app)
            .delete('/savings/2')
            .set('access_token', tokenUserTwo)
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", 'Saving has been deleted!');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('DELETE /savings/:savingId Error status (404) - should return error when id saving not exist', (done) => {
        request(app)
            .delete('/savings/333')
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(404)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", "Saving not found");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('DELETE /savings/:savingId Error status (401) - should return error when token is wrong', (done) => {
        request(app)
            .delete('/savings/1')
            .set('access_token', wrongToken)
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(401)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", "Forbiden to Access");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('Should handle error when hit delete', async () => {
        jest.spyOn(Saving, 'destroy').mockRejectedValue('Error')
        return request(app)
            .delete('/savings/5')
            .set('access_token', token)
            .then((resp) => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(500)
                expect(result).toHaveProperty("message", 'Internal Server Error')
            })
            .catch((err) => {
                console.log(err)
            })
    })
})