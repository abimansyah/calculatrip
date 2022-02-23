const request = require('supertest');
const app = require("../app")
const axios = require('axios');

const {
    User
} = require("../models/index")

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
        })

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
    } catch (err) {
        console.log(err)
    }

})


beforeEach(() => {
    jest.restoreAllMocks()
})

describe('GET /exchangerate - Get Symbols money from 3rd party currency', () => {
    test('GET /exchangerate succes status (200) - get all user from database with correct access token', (done) => {
        request(app)
            .get("/exchangerate")
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Array));
                expect(result[0]).toHaveProperty("description", expect.any(String));
                expect(result[0]).toHaveProperty("code", expect.any(String));
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /exchangerate Error status (500), Should handle error when hit get exchangerate', async () => {
        jest.spyOn(axios, 'get').mockRejectedValue('Error')
        return request(app)
            .get('/exchangerate')
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

describe('POST /exchangerate - Convert money with symbols money ', () => {
    test('POST /exchangerate succes status (200) - Convert money with symbols money', (done) => {
        request(app)
            .post("/exchangerate")
            .set('access_token', token)
            .send({
                from: "USD",
                to: "IDR",
                amount: 100
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("rate", expect.any(Number));
                expect(result).toHaveProperty("result", expect.any(Number));
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /exchangerate error status (400) - Convert money with symbols money without from symbol', (done) => {
        request(app)
            .post("/exchangerate")
            .set('access_token', token)
            .send({
                to: "IDR",
                amount: 100
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", "From currency is required");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /exchangerate error status (400) - Convert money with symbols money without to symbol', (done) => {
        request(app)
            .post("/exchangerate")
            .set('access_token', token)
            .send({
                from: "IDR",
                amount: 100
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", "To currency is required");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /exchangerate error status (400) - Convert money with symbols money without amount', (done) => {
        request(app)
            .post("/exchangerate")
            .set('access_token', token)
            .send({
                from: "IDR",
                to: "USD"
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", "Amount currency is required");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})

describe('GET /exchangerate/:base - Get latest rate Convert money with symbols money ', () => {
    test('GET /exchangerate/:base succes status (200) - Get latest rate Convert money with symbols money ', (done) => {
        request(app)
            .get("/exchangerate/IDR")
            .set('access_token', token)
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("base", expect.any(String));
                expect(result).toHaveProperty("rates", expect.any(Object));
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('GET /exchangerate/:base Error status (500), Should handle error when hit get exchangerate', async () => {
        jest.spyOn(axios, 'get').mockRejectedValue('Error')
        return request(app)
            .get('/exchangerate//IDR')
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