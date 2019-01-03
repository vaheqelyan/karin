import * as http from "http";
import * as https from "https";
import dataBody from "../../help";

export default function get(url, params, parse, postData) {
  var protocol = parse.protocol === "https:" ? https : http;
  return new Promise((resolve, reject) => {
    var post_data = postData;

    var post_options = {
      host: parse.hostname,
      port: parse.port,
      path: parse.pathname,
      method: "POST",
      headers: {
        "Content-Length": Buffer.byteLength(post_data),
        ...params.headers,
      },
    };

    var post_req = protocol.request(post_options, function(res) {
      res.setEncoding("utf8");
      var raw = "";
      res.on("data", function(chunk) {
        raw += chunk;
      });
      res.on("end", function() {
        const contentType = res.headers["content-type"];
        resolve({
          message: res.statusMessage,
          status: res.statusCode,
          headers: res.headers,
          data: dataBody(contentType, params.encode, raw),
        });
      });

      res.on("error", reject);
    });
    post_req.on("error", reject);

    post_req.write(post_data);
    post_req.end();
  });
}
