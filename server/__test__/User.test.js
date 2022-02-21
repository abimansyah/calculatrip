const request = require('supertest');
const app = require("../app")

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
} = require('../helpers/jwt')

let token = ""
let wrongToken = ""

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

        const user = await User.create({
            username: "usernametest",
            email: "test@mail.com",
            password: "1234567",
            phoneNumber: "1234567890",
            avatar: "abcder",
            birthDate: "01-01-2022"
        })
        await User.create({
            username: "usernametestdua",
            email: "test2@mail.com",
            password: "1234567",
            phoneNumber: "2134567890",
            avatar: "abcder",
            birthDate: "01-01-2022"
        })
        await User.create({
            username: "usernametesttiga",
            email: "test3@mail.com",
            password: "1234567",
            phoneNumber: "3214567890",
            avatar: "abcder",
            birthDate: "01-01-2022"
        })

        token = await createToken({
            id: 1,
            username: "usernametest",
            email: "test@mail.com"
        })
        wrongToken = await createToken({
            idsalah: 100,
            usernamesalah: "usernametest",
            emailsalah: "test@mail.com"
        })

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
            status: "pending",
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
        console.log(err)
    }

})


beforeEach(() => {
    jest.restoreAllMocks()
})


describe('POST /users/register - create new user', () => {
    test('POST /users/register success status (201) - should return id username new user', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey",
                email: "lb_inter@yahoo.com",
                password: "1234567",
                phoneNumber: "123456789",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(201)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("id", expect.any(Number));
                expect(result).toHaveProperty("email", "lb_inter@yahoo.com");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if email is null', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey",
                password: "1234567",
                phoneNumber: "123456789",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", 'Email is required');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if not email format', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey",
                password: "12345676789",
                email: "dsdsdsdsdsds",
                phoneNumber: "123456",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Invalid email format");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if email not unique', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey",
                password: "1234567",
                email: "lb_inter@yahoo.com",
                phoneNumber: "1234567890",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Email must be unique");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if username not unique', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey",
                password: "1234567",
                email: "lb_inter2@yahoo.com",
                phoneNumber: "1234567890",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Username  must be unique");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if username can not contain symbols', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey@-",
                password: "1234567",
                email: "lb_inter2@yahoo.com",
                phoneNumber: "1234567890",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "username can not contain symbols");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if username less than 6 characters', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodh",
                password: "1234567",
                email: "lb_inter2@yahoo.com",
                phoneNumber: "1234567890",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Username must have more than 6 characters");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if username is null', (done) => {
        request(app)
            .post('/users/register')
            .send({
                password: "1234567",
                email: "lb_inter2@yahoo.com",
                phoneNumber: "1234567890",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Username is required");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if password is null', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey",
                email: "lb_inter2@yahoo.com",
                phoneNumber: "1234567890",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Password is required");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if password less than 7 characters', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey",
                password: "121",
                email: "lb_inter2@yahoo.com",
                phoneNumber: "1234568908",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Password length min 7");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if invalid date format', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey",
                password: "121989898",
                email: "lb_inter2@yahoo.com",
                phoneNumber: "1234567890",
                avatar: "abcder",
                birthDate: "25-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Invalid date format");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if birth date is null', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey",
                password: "121989898",
                email: "lb_inter2@yahoo.com",
                phoneNumber: "1234567890",
                avatar: "abcder",
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Birth Date is required");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if Phone Number has already been taken', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey12",
                password: "121989898",
                email: "lb_inter2@yahoo.com",
                phoneNumber: "1234567890",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Phone Number has already been taken");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if Phone Number is null', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey12",
                password: "121989898",
                email: "lb_inter2@yahoo.com",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Phone Number is required");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /pub/register 400 Failed register - should return error if Phone Number not contain 8-13 digits', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey12",
                password: "121989898",
                email: "lb_inter2@yahoo.com",
                phoneNumber: "12345",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Phone Number should contain 8-13 digits");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})

describe('POST /users/Login - User login', () => {
    test('POST /users/login success status (201) -  should return access_token login with email', (done) => {
        request(app)
            .post('/users/login')
            .send({
                loginInput: "test@mail.com",
                password: "1234567",
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("access_token", expect.any(String));
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /users/login success status (201) -  should return access_token login with username', (done) => {
        request(app)
            .post('/users/login')
            .send({
                loginInput: "usernametest",
                password: "1234567",
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("access_token", expect.any(String));
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /users/login error status (400) -  should return when login or username is null', (done) => {
        request(app)
            .post('/users/login')
            .send({
                password: "1234567",
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Email or Username is required");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /users/login error status (400) -  should return when password is null', (done) => {
        request(app)
            .post('/users/login')
            .send({
                loginInput: "test@mail.com",
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Password is required");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /users/login error status (400) -  should return when password is wrong', (done) => {
        request(app)
            .post('/users/login')
            .send({
                loginInput: "test@mail.com",
                password: "123"
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(401)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Invalid email/username/password");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /users/login error status (400) -  should return when email or username is wrong', (done) => {
        request(app)
            .post('/users/login')
            .send({
                loginInput: "wrongemail@yahoo.com",
                password: "1234567"
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(401)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Invalid email/username/password");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})

describe('GET /users - Get data user from database', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })
    test('GET /users success(200) - get all user from database with correct access token', (done) => {
        request(app)
            .get("/users")
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Array))
                expect(result[0]).toHaveProperty("id", expect.any(Number));
                expect(result[0]).toHaveProperty("email", expect.any(String));
                expect(result[0]).toHaveProperty("username", expect.any(String));
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /users Error status (401) - should return error with incorrect access token', (done) => {
        request(app)
            .get("/users")
            .set('access_token', wrongToken)
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

    test('GET /users Error status (401) - should return error without access token', (done) => {
        request(app)
            .get("/users")
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

    test('GET /users Error status (401) - should return error with access token is number', (done) => {
        request(app)
            .get("/users")
            .set('access_token', 12331)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(401)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", 'Invalid Token');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /users Error status (500), Should handle error when hit get User', async () => {
        jest.spyOn(User, 'findAll').mockRejectedValue('Error')
        jest.spyOn(User, 'findByPk').mockResolvedValue({
            id: 1,
            username: "usernametest",
            email: "test@mail.com"
        })

        return request(app)
            .get('/users')
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

describe('GET /users/profile - Get profile user from database', () => {
    test('GET /users success(200) - get all user from database with correct access token', (done) => {
        request(app)
            .get("/users/profile")
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("id", expect.any(Number));
                expect(result).toHaveProperty("email", expect.any(String));
                expect(result).toHaveProperty("username", expect.any(String));
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
    test('GET /users/profile Error status (401) - should return error with incorrect access token', (done) => {
        request(app)
            .get("/users/profile")
            .set('access_token', wrongToken)
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

    test('GET /users/profile Error status (401) - should return error without access token', (done) => {
        request(app)
            .get("/users/profile")
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

    test('GET /users/profile Error status (401) - should return error with access token is number', (done) => {
        request(app)
            .get("/users/profile")
            .set('access_token', 12331)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(401)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", 'Invalid Token');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /users Error status (500), Should handle error when hit get User profile', async () => {
        jest.spyOn(User, 'findOne').mockRejectedValue('Error')
        jest.spyOn(User, 'findByPk').mockResolvedValue({
            id: 1,
            username: "usernametest",
            email: "test@mail.com"
        })

        return request(app)
            .get('/users/profile')
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

describe('GET /users/profile/:input - Get profile user from database', () => {
    test('GET /users/profile/:input  success(200) - get user profile from database by email with correct access token', (done) => {
        request(app)
            .get("/users/profile/test@mail.com")
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("id", expect.any(Number));
                expect(result).toHaveProperty("email", expect.any(String));
                expect(result).toHaveProperty("username", expect.any(String));
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /users/profile/:input  success(200) - get user profile from database by username with correct access token', (done) => {
        request(app)
            .get("/users/profile/usernametest")
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("id", expect.any(Number));
                expect(result).toHaveProperty("email", expect.any(String));
                expect(result).toHaveProperty("username", expect.any(String));
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /users/profile/:input  error status (404) - get user profile from database by wrong username or email with correct access token', (done) => {
        request(app)
            .get("/users/profile/wrong")
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(404)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "User not found");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /users/profile Error status (401) - should return error with incorrect access token', (done) => {
        request(app)
            .get("/users/profile/lb_inter@yahoo.com")
            .set('access_token', wrongToken)
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

    test('GET /users/profile Error status (401) - should return error without access token', (done) => {
        request(app)
            .get("/users/profile/lb_inter@yahoo.com")
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

    test('GET /users/profile Error status (401) - should return error with access token is number', (done) => {
        request(app)
            .get("/users/profile/lb_inter@yahoo.com")
            .set('access_token', 12331)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(401)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", 'Invalid Token');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})

describe('PUT /users/:id - Edit profile user', () => {
    test('PUT /users/:id success status (200) - success edit profile user by id', (done) => {
        request(app)
            .put('/users/1')
            .set("access_token", token)
            .send({
                username: "rodheyKenaTest",
                email: "lb_inter2@yahoo.com",
                password: "1234567",
                phoneNumber: "12345644",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(201)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Your profile has been updated!");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('PUT /users/:id success status (404) - should return error edit profile user by wrong id', (done) => {
        request(app)
            .put('/users/100')
            .set("access_token", token)
            .send({
                username: "rodheyKenaTest",
                email: "lb_inter2@yahoo.com",
                password: "1234567",
                phoneNumber: "12345644",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(404)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "User not found");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('PUT /users/:id success status (401) - should return error with wrong access token edit profile user by id', (done) => {
        request(app)
            .put('/users/1')
            .set("access_token", wrongToken)
            .send({
                username: "rodheyKenaTest2x",
                email: "lb_inter12@yahoo.com",
                password: "123456712",
                phoneNumber: "1234564412",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(401)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Forbiden to Access");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('PUT /users/:id success status (401) - should return error without access token edit profile user by id', (done) => {
        request(app)
            .put('/users/1')
            .send({
                username: "rodheyKenaTest2x",
                email: "lb_inter12@yahoo.com",
                password: "123456712",
                phoneNumber: "1234564412",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(401)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Forbiden to Access");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('PUT /users/:id success status (401) - should return error with access token is number edit profile user by id', (done) => {
        request(app)
            .put('/users/1')
            .set("access_token", 1234)
            .send({
                username: "rodheyKenaTest2x",
                email: "lb_inter12@yahoo.com",
                password: "123456712",
                phoneNumber: "1234564412",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(401)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Invalid Token");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('PUT /users/:id success status (400) - should return error when username not unique edit profile user by id', (done) => {
        request(app)
            .put('/users/1')
            .set("access_token", token)
            .send({
                username: "usernametestdua",
                email: "lb_inte1212@yahoo.com",
                password: "123456712",
                phoneNumber: "1234564412",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Username  must be unique");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('PUT /users/:id success status (400) - should return error when username contain symbol edit profile user by id', (done) => {
        request(app)
            .put('/users/1')
            .set("access_token", token)
            .send({
                username: "rodhey@#",
                email: "lb_inte1212@yahoo.com",
                password: "123456712",
                phoneNumber: "1234564412",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "username can not contain symbols");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('PUT /users/:id success status (400) - should return error when username less than 6 characther edit profile user by id', (done) => {
        request(app)
            .put('/users/1')
            .set("access_token", token)
            .send({
                username: "rod",
                email: "lb_inte1212@yahoo.com",
                password: "123456712",
                phoneNumber: "1234564412",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Username must have more than 6 characters");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('PUT /users/:id success status (400) - should return error when email not unique edit profile user by id', (done) => {
        request(app)
            .put('/users/1')
            .set("access_token", token)
            .send({
                username: "rodheykenatestlagi",
                email: "test2@mail.com",
                password: "123456712",
                phoneNumber: "1234564412",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Email must be unique");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('PUT /users/:id success status (400) - should return error when email not unique edit profile user by id', (done) => {
        request(app)
            .put('/users/1')
            .set("access_token", token)
            .send({
                username: "rodheykenatestlagi",
                email: "lbinteryahoocom",
                password: "123456712",
                phoneNumber: "1234564412",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Invalid email format");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('PUT /users/:id success status (400) - should return error password less than 7 characther edit profile user by id', (done) => {
        request(app)
            .put('/users/1')
            .set("access_token", token)
            .send({
                username: "rodheykenatestlagi",
                email: "lbinter@yahoo.com",
                password: "12",
                phoneNumber: "1234564412",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", "Password length min 7");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('PUT /users/:id success status (400) - should return error unauthorize edit profile user not owner user', (done) => {
        request(app)
            .put('/users/2')
            .set("access_token", token)
            .send({
                username: "rodheykenatestlagi",
                email: "lbinter@yahoo.com",
                password: "12",
                phoneNumber: "1234564412",
                avatar: "abcder",
                birthDate: "01-01-2022"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(403)
                expect(result).toEqual(expect.any(Object))
                expect(result).toHaveProperty("message", 'Unauthorize - Forbiden to Access');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})

describe('GET /users/invitation - Get all user invitation', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })
    test('GET /users/invitation success(200) - get all user invitation', (done) => {
        request(app)
            .get("/users/invitation")
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Array))
                expect(result[0]).toHaveProperty("id", expect.any(Number));
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
    test('GET /users Error status (500), Should handle error when hit get invitation', async () => {
        jest.spyOn(UserTrip, 'findAll').mockRejectedValue('Error')
        return request(app)
            .get('/users/invitation')
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