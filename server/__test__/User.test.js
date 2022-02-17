const request = require('supertest');
const app = require("../app")

const {
    User
} = require("../models/index")

beforeAll(async () => {
    User.destroy({
        where: {},
        truncate: true,
        restartIdentity: true,
        cascade: true,
    })
})

describe('POST /users/register - create new user', () => {
    test('POST /users/register success(201)', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "rodhey",
                email: "lb_inter@yahoo.com",
                password: "1234567",
                phoneNumber: "123456",
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
                phoneNumber: "123456",
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
                password: "1234567",
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
                phoneNumber: "123456",
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
                phoneNumber: "123456",
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
                phoneNumber: "123456",
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
                phoneNumber: "123456",
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
                phoneNumber: "123456",
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
                phoneNumber: "123456",
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
                phoneNumber: "123456",
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
})

describe('POST /users/Login - User login', () => {
    test('POST /users/login success(201) -  should return access_token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                loginInput: "lb_inter@yahoo.com",
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
                loginInput: "lb_inter@yahoo.com",
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

    test('POST /users/login error status (400) -  should return when username or email or password is wrong', (done) => {
        request(app)
            .post('/users/login')
            .send({
                loginInput: "lb_inter@yahoo.com",
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
})