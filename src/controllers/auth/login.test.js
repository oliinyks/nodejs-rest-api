// unit-тест
const login = require("./login");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../../config");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("test login controller", () => {
  test("should return user and token properties", async () => {
    const user = {
      _id: "63b2ffaa9047df8ce94e2e76",
      email: "asas@ukr.net",
      password: "asasas",
      subscription: "starter",
    };
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

    const req = {
      headers: { authorization: `Bearer ${token}` },
      body: {
        _id: user._id,
        email: user.email,
        password: user.password,
        subscription: user.subscription,
      },
    };
    const res = mockResponse();

    jest.spyOn(User, "findOne").mockImplementationOnce(() => user);
    jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);
    jest
      .spyOn(User, "findByIdAndUpdate")
      .mockImplementation(() => user._id, { token });

	  await login(req, res);
	  console.log(res)

    //  const data = mRes.data.user;
    expect(res.status).toHaveBeenCalledWith(200);
    //  expect(data.token).toEqual(token);
    //  expect(typeof data).toBe("object");
    //  expect(typeof data.subscription).toBe("string");
    //  expect(typeof data.email).toBe("string");
  });
});

// інтеграційний тест
// const request = require("supertest");
// const mongoose = require("mongoose");
// const app = require("../../../app");
// const { DB_HOST } = require("../../../config");

// describe("test login controller", () => {
//   beforeAll(async () => await mongoose.connect(DB_HOST));
//   afterAll(async () => await mongoose.connection.close());

//   test("login route", async () => {
//     const response = await request(app).post("/api/users/login").send({
//       email: "asas@ukr.net",
//       password: "asasas",
//     });

//     const data = response.body.data.user;

//     expect(response.statusCode).toBe(200);
//     expect(data.token).toBeTruthy();
//     expect(typeof data).toBe("object");
//     expect(typeof data.subscription).toBe("string");
//     expect(typeof data.email).toBe("string");
//   });
// });
