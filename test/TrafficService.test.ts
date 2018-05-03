import { TrafficService } from "../src/services/TrafficService";

const trafficService = new TrafficService();
trafficService;
describe("Traffic Service tests", () => {
  it("should have a constructor", () => {
    expect(TrafficService.prototype.constructor).toBeDefined();
  });
  it("should have a constructor that returns an instance", () => {
    expect(trafficService).toBeInstanceOf(TrafficService);
  });
  it("should have an httpOptions private method", () => {
    expect(trafficService["httpOptions"]).toBeInstanceOf(Function);
  });
  it("should have httpOptions return a valid xml request", () => {
    expect(trafficService["httpOptions"]("TEST")).toEqual({
      hostname: "maps.cmpd.org",
      port: 80,
      path: "/datafeeds/gisservice.asmx",
      method: "POST",
      headers: {
        "Content-Type": "application/soap+xml; charset=utf-8",
        "Content-Length": 4
      }
    });
  });
  describe("getCurrentIncidents method", () => {
    it("should return an error on improper xml call", async () => {
      const incorrectTrafficService = new TrafficService();
      incorrectTrafficService["currentIncidentsRequest"] = "INCORRECT XML";
      return expect(await incorrectTrafficService.getCurrentIncidents())
        .toEqual({"soap:Envelope": {"soap:Body": {"soap:Fault": {"soap:Code": {"soap:Value": "soap:Receiver"}, "soap:Detail": {}, "soap:Reason": {"soap:Text": {"$t": "Server was unable to process request. ---> Data at the root level is invalid. Line 1, position 1.", "xml:lang": "en"}}}}, "xmlns:soap": "http://www.w3.org/2003/05/soap-envelope", "xmlns:xsd": "http://www.w3.org/2001/XMLSchema", "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"}});
    });
  });
});