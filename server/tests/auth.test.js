import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

import app from "../app.js";
import User from "../models/UserModel.js";

let testDatabase;

const newUser = {
  fullName: "Test Student",
  email: "student@enaa.ma",
  password: "password123",
  confirmPassword: "password123",
};

before(async () => {
  testDatabase = await MongoMemoryServer.create();
  await mongoose.connect(testDatabase.getUri());

  process.env.JWT_SECRET = "secret-used-only-for-tests";
  process.env.JWT_EXPIRES_IN = "1h";
});

after(async () => {
  await mongoose.disconnect();

  if (testDatabase) {
    await testDatabase.stop();
  }
});

test("registration rejects an invalid email", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({ ...newUser, email: "student@example.com" });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
});

test("registration rejects passwords that do not match", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({ ...newUser, confirmPassword: "different123" });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
});

test("registration does not allow a user to choose the admin role", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({ ...newUser, role: "admin" });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
});

test("register, login, get current user, and logout", async () => {

  const registration = await request(app)
    .post("/api/auth/register")
    .send(newUser);

  assert.equal(registration.status, 201);
  assert.equal(registration.body.success, true);
  assert.equal(registration.body.data.user.email, newUser.email);
  assert.equal(registration.body.data.user.role, "student");
  assert.ok(registration.body.data.token);
  assert.equal(registration.body.data.user.password, undefined);

  const savedUser = await User.findOne({ email: newUser.email }).select(
    "+password",
  );

  assert.notEqual(savedUser.password, newUser.password);

  const duplicate = await request(app).post("/api/auth/register").send(newUser);

  assert.equal(duplicate.status, 409);

  const wrongPassword = await request(app)
    .post("/api/auth/login")
    .send({ email: newUser.email, password: "wrongpassword" });

  assert.equal(wrongPassword.status, 401);

  const login = await request(app)
    .post("/api/auth/login")
    .send({ email: newUser.email, password: newUser.password });

  assert.equal(login.status, 200);
  assert.equal(login.body.success, true);
  assert.ok(login.body.data.token);

  const token = login.body.data.token;

  const withoutToken = await request(app).get("/api/auth/me");
  assert.equal(withoutToken.status, 401);

  const me = await request(app)
    .get("/api/auth/me")
    .set("Authorization", `Bearer ${token}`);

  assert.equal(me.status, 200);
  assert.equal(me.body.data.email, newUser.email);
  assert.equal(me.body.data.password, undefined);

  const logout = await request(app)
    .post("/api/auth/logout")
    .set("Authorization", `Bearer ${token}`);

  assert.equal(logout.status, 200);
  assert.equal(logout.body.success, true);
});
