var app = require("./server");
var chai = require("chai");
var request = require("supertest");

var expect = chai.expect;

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTcwNGFkYjBjODE0MGRiOTAxMzZiMyIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjk2MTQwMjc4LCJleHAiOjE2OTg3MzIyNzh9.ESglpIqfb10V8pIz8su001unZGfyxOn_71IfCZgJlR4";

describe("Add User API tests", function () {
  it("Should return Status Code 200 for creating a new user", async () => {
    let result = await request(app)
      .post("/api/auth/addUser")
      .auth(token, { type: "bearer" })
      .send({
        email: "test@test.com",
        password: "test",
        name: "Test Mocha",
        isAdmin: true,
      });

    expect(result.statusCode).to.be.equal(200);
    expect(result.body).to.be.equal("User Registered");
  });

  it("Should return Status Code 403 if user already exist", async () => {
    let result = await request(app)
      .post("/api/auth/addUser")
      .auth(token, { type: "bearer" })
      .send({
        email: "test@test.com",
        password: "test",
        name: "Test Mocha",
        isAdmin: true,
      });

    expect(result.statusCode).to.be.equal(403);
    expect(result.body).to.be.equal(
      "test@test.com is already associated with an account"
    );
  });
  it("Should return Status Code 403 if admin token is missing", async () => {
    let result = await request(app).post("/api/auth/addUser").send({
      email: "test@test.com",
      password: "test",
      name: "Test Mocha",
      isAdmin: true,
    });

    expect(result.statusCode).to.be.equal(403);
    expect(result.body).to.be.equal("Only Admin can create a user");
  });
  it("Should return Status Code 403 If mandatory fields are missing", async () => {
    let result = await request(app)
      .post("/api/auth/addUser")
      .auth(token, { type: "bearer" })
      .send({
        password: "",
        name: "",
        isAdmin: false,
      });

    expect(result.statusCode).to.be.equal(500);
    expect(result.body).to.be.equal("Server Error Error: Bad Body Request");
  });
});

describe("Login API tests", function () {
  it("Should return Status Code 200 for successful Login", async () => {
    let result = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "test",
    });

    expect(result.statusCode).to.be.equal(200);
    expect(result.body.token).to.be.ok;
  });
  it("Should return Status Code 403 for Invalid Password", async () => {
    let result = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "test123",
    });

    expect(result.statusCode).to.be.equal(403);
    expect(result.body).to.be.equal("Invalid Password");
  });
  it("Should return Status Code 404 for User does not exist", async () => {
    let result = await request(app).post("/api/auth/login").send({
      email: "test123@test.com",
      password: "test",
    });

    expect(result.statusCode).to.be.equal(404);
    expect(result.body).to.be.equal("User does not exist!");
  });
});

describe("Update User API tests", function () {
  it("Should return Status Code 200 for successful Update", async () => {
    let result = await request(app)
      .post("/api/auth/updateUser")
      .auth(token, { type: "bearer" })
      .send({
        email: "test@test.com",
        password: "test",
        name: "Test Mochaa",
        isAdmin: true,
      });

    expect(result.statusCode).to.be.equal(200);
    expect(result.body).to.be.equal("Modified");
  });

  it("Should return Status Code 500 for unsuccessful Update", async () => {
    let result = await request(app)
      .post("/api/auth/updateUser")
      .auth(token, { type: "bearer" })
      .send({
        password: "test",
        name: "Test Mochaa",
        isAdmin: true,
      });

    expect(result.statusCode).to.be.equal(500);
    expect(result.body).to.be.equal(
      "Cannot Modify the User. Please try again with correct details."
    );
  });

  it("Should return Status Code 403 for missing Admin token", async () => {
    let result = await request(app).post("/api/auth/updateUser").send({
      password: "test",
      name: "Test Mochaa",
      isAdmin: true,
    });

    expect(result.statusCode).to.be.equal(403);
    expect(result.body).to.be.equal("Only Admin can update a user");
  });
});

describe("List Users API tests", function () {
  it("Should return Status Code 200 for successful user lists", async () => {
    let result = await request(app).get("/api/auth/listUsers");

    expect(result.statusCode).to.be.equal(200);
    expect(result.body).to.be.a("array");
  });
});

describe("getCurrentUser API tests", function () {
  it("Should return Status Code 200 for successful user lists", async () => {
    let result = await request(app)
      .get("/api/auth/getCurrentUser")
      .auth(token, { type: "bearer" });

    expect(result.statusCode).to.be.equal(200);
    expect(result.body).to.be.a("object");
  });

  it("Should return Status Code 401 for unsuccessful user lists", async () => {
    let result = await request(app).get("/api/auth/getCurrentUser");

    expect(result.statusCode).to.be.equal(401);
    expect(result.body).to.be.equal("jwt must be provided");
  });
});

describe("deleteUser API tests", function () {
  it("Should return Status Code 403 for missing Admin token", async () => {
    let result = await request(app).post("/api/auth/deleteUser").send({
      email: "test@test.com",
    });

    expect(result.statusCode).to.be.equal(403);
    expect(result.body).to.be.equal("Only Admin can delete a user");
  });

  it("Should return Status Code 500 for unsuccessful deleting", async () => {
    let result = await request(app)
      .post("/api/auth/deleteUser")
      .auth(token, { type: "bearer" })
      .send({});

    expect(result.statusCode).to.be.equal(500);
    expect(result.body).to.be.equal(
      "Cannot Delete the User. Please try again with correct details."
    );
  });
  it("Should return Status Code 200 for successful deleting", async () => {
    let result = await request(app)
      .post("/api/auth/deleteUser")
      .auth(token, { type: "bearer" })
      .send({
        email: "test@test.com",
      });

    expect(result.statusCode).to.be.equal(200);
    expect(result.body).to.be.equal("User Deleted");
  });
});
