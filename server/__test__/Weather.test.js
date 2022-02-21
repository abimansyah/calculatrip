const request = require('supertest');
const app = require("../app")

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

describe('POST /weather/coordinate - Get weather by coordinate', () => {
    test('POST /weather/coordinate succes status (200) - Get weather by coordinate with correct access token', (done) => {
        request(app)
            .post("/weather/coordinate")
            .set('access_token', token)
            .send({
                lon: "-122.08",
                lat: "37.39"
            })
            .then(resp => {
                const result = resp.body
                // console.log(result)
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Object));
                expect(result.coord).toHaveProperty("lon", -122.08);
                expect(result.coord).toHaveProperty("lat", 37.39);
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /weather/coordinate Error status (400) - Get weather by coordinate with wrong latitude and longitude', (done) => {
        request(app)
            .post("/weather/coordinate")
            .set('access_token', token)
            .send({
                lat: "37.39"
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", 'Longitude is required');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /weather/coordinate Error status (400) - Get weather by coordinate with wrong latitude and longitude', (done) => {
        request(app)
            .post("/weather/coordinate")
            .set('access_token', token)
            .send({
                lon: "37.39"
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", 'Latitude is required');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})

describe('POST /weather/city - Get weather by city', () => {
    test('POST /weather/city succes status (200) - Get weather by city with correct access token', (done) => {
        request(app)
            .post("/weather/city")
            .set('access_token', token)
            .send({
                city: "jakarta",
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(200)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("name", "Jakarta");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /weather/city Error status (400) - Get weather by city with city not found', (done) => {
        request(app)
            .post("/weather/city")
            .set('access_token', token)
            .send({
                city: "yiyiuyiy"
            })
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(404)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", 'City not found');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('POST /weather/city Error status (400) - Get weather by city with not include city', (done) => {
        request(app)
            .post("/weather/city")
            .set('access_token', token)
            .send({})
            .then(resp => {
                const result = resp.body
                expect(resp.status).toBe(400)
                expect(result).toEqual(expect.any(Object));
                expect(result).toHaveProperty("message", 'City is required');
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })


})