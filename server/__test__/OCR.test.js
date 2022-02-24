const request = require("supertest");
const app = require("../app");
const instanceMulter = require("../middlewares/multer");
const axios = require("axios");
const instanceAxios = require("../apis/axios");

const {
  User
} = require("../models/index");

const {
  createToken
} = require("../helpers/jwt");

let token = "";
let wrongToken = "";

beforeAll(async () => {
  try {
    await User.destroy({
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
      birthDate: "01-01-2022",
    });
    await User.create({
      username: "usernametestdua",
      email: "test2@mail.com",
      password: "1234567",
      phoneNumber: "2134567890",
      avatar: "abcder",
      birthDate: "01-01-2022",
    });
    await User.create({
      username: "usernametesttiga",
      email: "test3@mail.com",
      password: "1234567",
      phoneNumber: "3214567890",
      avatar: "abcder",
      birthDate: "01-01-2022",
    });
    token = await createToken({
      id: 1,
      username: "usernametest",
      email: "test@mail.com",
    });
    wrongToken = await createToken({
      idsalah: 100,
      usernamesalah: "usernametest",
      emailsalah: "test@mail.com",
    });
  } catch (err) {
    console.log(err);
  }
});

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("POST /ocr - post image file to ocr", () => {
  test("POST /ocr success status (200) - should return success with status (200) when image file successfuly sent to ocr", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: {
        ParsedResults: [{
          ParsedText: "testingggg",
        }, ],
      }
    });
    jest.spyOn(instanceAxios, "post").mockResolvedValue({
      data: {
        url: "fakeurl"
      }
    });
    return request(app)
      .post("/ocr")
      .set("access_token", token)
      .attach("imageFile", "./__test__/Capture.JPG")
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(200);
        expect(result).toEqual(expect.any(Object));
      })
      .catch((err) => {
        console.log(err);
      });
  });


  test("POST /ocr error status (401) - should return error with status (401) when token is invalid", async () => {
    return request(app)
      .post("/ocr")
      .set("access_token", wrongToken)
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(401);
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("message", "Forbiden to Access");
        // done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test("POST /ocr error status (500) - should return success with error (500) when image file failed sent to ocr", async () => {
    jest.spyOn(axios, "get").mockRejectedValue("error");
    jest.spyOn(instanceAxios, "post").mockResolvedValue({
      data: {
        url: "fakeurl"
      }
    });
    return request(app)
      .post("/ocr")
      .set("access_token", token)
      .attach("imageFile", "./__test__/Capture.JPG")
      .then((resp) => {
        const result = resp.body;
        expect(resp.status).toBe(500);
        expect(result).toEqual(expect.any(Object));
      })
      .catch((err) => {
        console.log(err);
      });
  });

});