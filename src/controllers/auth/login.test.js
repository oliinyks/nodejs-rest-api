const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../../app");
const { DB_HOST } = require("../../../config");

describe("test login controller", () => {
  beforeAll(async () => await mongoose.connect(DB_HOST));
  afterAll(async() => await mongoose.connection.close());

	test("login route", async () => {
	  
    const response = await request(app).post("/api/users/login").send({
		 email: "asas@ukr.net",
		 password: "asasas",
	 });
	  
	  const data = response.body.data.user;

	  expect(response.statusCode).toBe(200);
	  expect(data.token).toBeTruthy();
	  expect(typeof data).toBe("object");
	  expect(typeof data.subscription).toBe("string");
	  expect(typeof data.email).toBe("string");
  });
});
