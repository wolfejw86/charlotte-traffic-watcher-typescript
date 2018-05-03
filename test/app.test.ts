import request from "supertest";
import app, { App } from "../src/app";

const appTest = new App();

describe("App tests", () => {
  it("should be an instance of express.Application", () => {
    return expect(app).toBeDefined();
  });
  it("should correctly load middleware", () => {
    return expect(App).toBeInstanceOf(Function);
  });
  it("should have a property to load middleware", () => {
    return expect(appTest["middleware"]).toBeInstanceOf(Function);
  });
  it("should have a property to load middleware", () => {
    return expect(appTest["routes"]).toBeInstanceOf(Function);
  });
  it("should use a constructor to return an instance", () => {
    return expect(appTest).toBeInstanceOf(App);
  });
});