import request from "supertest";
import app, { App } from "../src/app";

const appTest = new App();

describe("API Tests", () => {
  describe("GET /api", () => {
    it("should return 200 OK", () => {
      return request(app).get("/api")
        .expect(200);
    });
    it("should return JSON data", () => {
      return request(app).get("/api")
        .expect(Object);
    });
  });

  describe("GET /api/current", () => {
    it("should return an object", () => {
      return request(app).get("/api/current")
        .expect(Object);
    });
    it("should return 200 OK", () => {
      return request(app).get("/api/current")
        .expect(200);
    });
  });
});


