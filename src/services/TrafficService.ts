import * as http from "http";
import * as parser from "xml2json";

/**
 * @class TrafficService
 * @description hits the Charlotte Mecklenburg Police Department/GIS server
 * for up to the minute traffic data
 */

export class TrafficService {
  /**
   * @type {String} currentIncidentsRequest
   * @description basic soap envelope for public request to CMPD/GIS public api
   */
  private currentIncidentsRequest: String;
  constructor() {
    this.currentIncidentsRequest = `<?xml version="1.0" encoding="utf-8"?>
      <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
        <CMPDAccidents xmlns="http://maps.cmpd.org/" />
        </soap12:Body>
      </soap12:Envelope>`;
  }
  /**
   * @type {Function}
   * @param {String} xml soap envelope for xml request
   * @description takes in soap envelope to set the length of request and other request options
   * @returns {Object} an object with all the settings to make the XML call
   */
  private httpOptions = (xml: String): Object => ({
    hostname: "maps.cmpd.org",
    port: 80,
    path: "/datafeeds/gisservice.asmx",
    method: "POST",
    headers: {
      "Content-Type": "application/soap+xml; charset=utf-8",
      "Content-Length": xml.length
    }
  });
  /**
   * @function getCurrentIncidents
   * @description exposes the getCurrentIncidents functinality
   * of the traffic service
   * @returns {Promise} a promise to await contianing the current traffic
   * data for Charlotte-Mecklenburg
   */
  public getCurrentIncidents = (): Promise<Object> => {
    return new Promise((resolve, reject) => {
      const req = http.request(this.httpOptions(this.currentIncidentsRequest), (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding("utf8");
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          const json = parser.toJson(body);
          resolve(JSON.parse(json));
        });
      });

      req.on("error", (e) => {
        reject(e);
        console.log(`problem with request: ${e.message}`);
      });

      // write data to request body
      req.write(this.currentIncidentsRequest); // xml would have been set somewhere to a complete xml document in the form of a string
      req.end();
    });
  }
}

export default new TrafficService();