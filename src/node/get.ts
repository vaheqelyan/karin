import * as http from "http";
import * as https from "https";

function dataBody(encode, contentType) {
	if (encode) {
		if (encode === "json") {
			return "json";
		} else if (encode === "buff") {
			return "buff";
		}
	}
	return "raw";
}

export default function get(url, params, parse, encode) {
	var protocol: any = parse.protocol === "https:" ? https : http;

	return new Promise((resolve, reject) => {
		var options: http.RequestOptions = {
			hostname: parse.hostname,
			path: parse.path,
			headers: {
				...params.headers
			}
		};
		var req = protocol.get(
			options,
			(res: http.IncomingMessage): void => {
				res.setEncoding("utf8");

				var raw = "";

				res.on("data", chunk => {
					raw += chunk;
				});

				res.on("end", () => {
					const contentType = res.headers["content-type"];
					// var content = dataBody(encode, contentType);
					var finalData = null;
					if (encode) {
						switch (encode) {
							case "json":
								finalData = JSON.parse(raw);
								break;
							case "buf":
								finalData = Buffer.from(raw, "utf8");
								break;
							case "string":
								finalData = raw.toString();
								break;
							case "raw":
								finalData = raw;
								break;
						}
					} else {
						finalData = raw
					}

					resolve({
						message: res.statusMessage,
						status: res.statusCode,
						headers: res.headers,
						data: finalData
					});
				});
			}
		);

		// Timeout
		if ("timeout" in params) {
			req.setTimeout(params.timeout, function() {
				req.abort();
			});
			req.on("error", function(err: any) {
				if (err.code === "ECONNRESET") {
					reject("Timeout occurs");
				}
				reject(err);
			});
		}
		// End timeout
	});
}
