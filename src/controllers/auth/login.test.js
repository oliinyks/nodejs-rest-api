const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../../app");
const { DB_HOST } = require("../../../config");

// unit-тест
const user = { email: "asas@ukr.net", password: "asasas" };

describe("test login controller", async () => {
  beforeAll(async () => await mongoose.connect(DB_HOST));
  afterAll(async () => await mongoose.connection.close());

  test("login should return statusCode 200", async () => {
    const response = await request(app).post("/api/users/login").send(user);
    expect(response.statusCode).toBe(200);
  });

  test("login should return token", async () => {
    const response = await request(app).post("/api/users/login").send(user);
    const data = response.body.data.user;
    expect(data.token).toBeTruthy();
  });

  test("login should return a user object", async () => {
    const response = await request(app).post("/api/users/login").send(user);
    const data = response.body.data.user;
    expect(typeof data).toBe("object");
  });

  test("login should return the subscription string", async () => {
    const response = await request(app).post("/api/users/login").send(user);
    const data = response.body.data.user;
    expect(typeof data.subscription).toBe("string");
  });

  test("login should return the email string", async () => {
    const response = await request(app).post("/api/users/login").send(user);
    const data = response.body.data.user;
    expect(typeof data.email).toBe("string");
  });
});

// інтеграційний тест
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
