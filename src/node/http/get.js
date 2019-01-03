import * as http from "http";
import * as https from "https";
import dataBody from "../../help";

export default function get(url, params, parse) {
  var protocol = parse.protocol === "https:" ? https : http;

  return new Promise((resolve, reject) => {
    var options: http.RequestOptions = {
      hostname: parse.hostname,
      path: parse.path,
      headers: {
        ...params.headers,
      },
    };

    var req = protocol.get(options, res => {
      res.setEncoding("utf8");

      var raw = "";

      res.on("data", chunk => {
        raw += chunk;
      });

      res.on("end", () => {
        const contentType = res.headers["content-type"];
        resolve({
          message: res.statusMessage,
          status: res.statusCode,
          headers: res.headers,
          data: dataBody(contentType, params.encode, raw),
        });
      });
    });

    // Timeout
    if ("timeout" in params) {
      req.setTimeout(params.timeout, function() {
        req.abort();
      });
    }
    req.on("error", function(err: any) {
      if (err.code === "ECONNRESET") {
        reject(new TypeError("Timeout occurs"));
      }
      reject(err);
    });
    // End timeout
  });
}
