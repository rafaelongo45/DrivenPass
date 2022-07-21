import app from "../index.js";
import supertest from "supertest";
import prisma from "../config/database.js";

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Users" CASCADE`;
})

describe("signup suite", () => {
  it("given a username and password it should return 201", async () => {
    const body = {
      email: "user@user.com",
      password: "senhasenha"
    }

    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;

    expect(status).toEqual(201);
  });

  it("given an already registered email, when trying to create a user with the same email it should return 409", async () => {
    const body = {
      email: "user@user.com",
      password: "senhasenha"
    }

    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;

    expect(status).toEqual(409);
  })
});

describe("signin suite", () => {
  it("given an unregistered account, return 404", async() => {
      const body = {
        email: "user2@user.com",
        password: "senhasenha"
      };
  
      const result = await supertest(app).post("/sign-in").send(body);
      const status = result.status;
  
      expect(status).toEqual(404);
  });

  it("given a registered account, if email and password are correct, return 200", async () => {
    const body = {
      email: "user@user.com",
      password: "senhasenha"
    }

    const result = await supertest(app).post("/sign-in").send(body);
    const status = result.status;
  
    expect(status).toEqual(200);
  });

  it("given a registered account, if password is not correct, return 403", async () => {
    const body = {
      email: "user@user.com",
      password: "senhasenha23"
    }

    const result = await supertest(app).post("/sign-in").send(body);
    const status = result.status;
  
    expect(status).toEqual(403);
  });
})

//TODO: Fluxo de criação e procura de credenciais
describe("credentials suite", () => {
  it("given a credential with no token, return status 403", async () => {
    const body = {
      "title": "Googlezada",
      "username": "eumesmo",
      "url": "https://google.com.br",
      "password": "senhasecreta"
    };

    const token = '';

    const result = await supertest(app).post('/create/credential').send(body).set("Authorization", `Bearer ${token}`); 
    const status = result.status;

    expect(status).toEqual(403);
  })

  it("given a credential with an invalid token, return status 404", async () => {
    const body = {
      "title": "Googlezada",
      "username": "eumesmo",
      "url": "https://google.com.br",
      "password": "senhasecreta"
    };

    const token = 'a'

    const result = await supertest(app).post('/create/credential').send(body).set("Authorization", `Bearer ${token}`); 
    const status = result.status;

    expect(status).toEqual(404);
  })

  it("given a valid credential with a valid token, return status 201", async () => {
    const body = {
      "title": "Googlezada",
      "username": "eumesmo",
      "url": "https://google.com.br",
      "password": "senhasecreta"
    };
    const tokenResult = await supertest(app).post("/sign-in").send(body);
    const token = tokenResult.body.token

    const result = await supertest(app).post('/create/credential').send(body).set("Authorization", `Bearer ${token}`); 
    const status = result.status;

    expect(status).toEqual(404);
  })
})