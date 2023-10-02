var app = require("./server");
var chai = require("chai");
var request = require("supertest");

var expect = chai.expect;
let id = "";

describe("Create group API tests", function () {
  it("Should return Status Code 200 for creating a new group", async () => {
    let result = await request(app)
      .post("/api/group/create")
      .send({
        name: "Test Group",
        users: [
          {
            name: "Test User 1",
            email: "test1@test.com",
          },
          {
            name: "Test User2",
            email: "test2@test.com",
          },
        ],
      });
    id = result.body.id;
    expect(result.statusCode).to.be.equal(200);
    expect(result.body.message).to.be.equal("Group Created");
  });

  it("Should return Status Code 500 for missing important fields ", async () => {
    let result = await request(app)
      .post("/api/group/create")
      .send({
        users: [
          {
            name: "Test User 1",
            email: "test1@test.com",
          },
          {
            name: "Test User2",
            email: "test2@test.com",
          },
        ],
      });

    expect(result.statusCode).to.be.equal(500);
    expect(result.body).to.be.equal("Server Error");
  });
});

describe("Update group API tests", function () {
  it("Should return Status Code 200 for updating a group", async () => {
    let result = await request(app)
      .post("/api/group/update")
      .send({
        id: id,
        name: "Test Groups",
        users: [
          {
            name: "Test User 1",
            email: "test1@test.com",
          },
          {
            name: "Test User2",
            email: "test2@test.com",
          },
        ],
      });

    expect(result.statusCode).to.be.equal(200);
    expect(result.body).to.be.equal("Group Modified");
  });

  it("Should return Status Code 500 for error while updating a group", async () => {
    let result = await request(app)
      .post("/api/group/update")
      .send({
        name: "Test Group",
        users: [
          {
            name: "Test User 1",
            email: "test1@test.com",
          },
          {
            name: "Test User2",
            email: "test2@test.com",
          },
        ],
      });

    expect(result.statusCode).to.be.equal(500);
    expect(result.body).to.be.equal(
      "Cannot Modify the Group. Please try again with correct details."
    );
  });
  it("Should return Status Code 400 for server error", async () => {
    let result = await request(app)
      .post("/api/group/update")
      .send({
        id: "",
        name: "Test Group",
        users: [
          {
            name: "Test User 1",
            email: "test1@test.com",
          },
          {
            name: "Test User2",
            email: "test2@test.com",
          },
        ],
      });

    expect(result.statusCode).to.be.equal(400);
  });
});

describe("Add Message API tests", function () {
  it("Should return Status Code 200 for adding a message", async () => {
    let result = await request(app)
      .post("/api/group/addMessage")
      .send({
        messageData: {
          id: id,
          message: {
            sender: {
              name: "Test User 1",
              email: "test1@test.com",
            },
            content: "Hi I am Test User 1",
          },
        },
      });

    expect(result.statusCode).to.be.equal(200);
    expect(result.body).to.be.equal("Message Added");
  });

  it("Should return Status Code 500 for not adding a message", async () => {
    let result = await request(app)
      .post("/api/group/addMessage")
      .send({
        messageData: {
          message: {
            sender: {
              name: "Test User 1",
              email: "test1@test.com",
            },
            content: "Hi I am Test User 1",
          },
        },
      });

    expect(result.statusCode).to.be.equal(500);
    expect(result.body).to.be.equal(
      "Cannot Add the Group. Please try again later."
    );
  });

  it("Should return Status Code 400 for server error", async () => {
    let result = await request(app)
      .post("/api/group/addMessage")
      .send({
        messageData: {
          id: "",
          message: {
            sender: {
              name: "Test User 1",
              email: "test1@test.com",
            },
            content: "Hi I am Test User 1",
          },
        },
      });

    expect(result.statusCode).to.be.equal(400);
  });
});

describe("Delete group API tests", function () {
  it("Should return Status Code 200 for deleting a group", async () => {
    let result = await request(app).post("/api/group/delete").send({
      id: id,
    });

    expect(result.statusCode).to.be.equal(200);
    expect(result.body).to.be.equal("Group Deleted");
  });

  it("Should return Status Code 500 for error while deleting a group", async () => {
    let result = await request(app).post("/api/group/delete").send({
      id: "651aaae84e92ff0326d3c923",
    });

    expect(result.statusCode).to.be.equal(500);
    expect(result.body).to.be.equal(
      "Cannot Delete the Group. Please try again with correct details."
    );
  });
  it("Should return Status Code 400 for server error", async () => {
    let result = await request(app).post("/api/group/delete").send({
      id: "",
    });

    expect(result.statusCode).to.be.equal(400);
  });
});
