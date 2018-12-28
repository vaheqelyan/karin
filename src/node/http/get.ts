import * as http from "http";
import * as https from "https";

function dataBody(contentType, encode, raw) {
	if (encode.encode === null) {
		if (/^application\/json/.test(contentType)) {
			return JSON.parse(raw);
		}
	} else {
		let final = null;
		switch (encode.encode) {
			case "json":
				final = JSON.parse(raw);
				break;

			case "raw":
				final = raw;
				break;
		}
		return final;
	}
}

export default function get(url, params, parse, encode) {
	var protocol: any = parse.protocol === "https:" ? https : http;

	return new Promise((resolve, reject) => {
		var options: http.RequestOptions = {
			hostname: parse.hostname,
			path: parse.path,
			headers: {
				...params.headers,
			},
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
					resolve({
						message: res.statusMessage,
						status: res.statusCode,
						headers: res.headers,
						data: dataBody(contentType, encode, raw),
					});
				});
			},
		);

		// Timeout
		if ("timeout" in params) {
			req.setTimeout(params.timeout, function() {
				req.abort();
			});
		}
		req.on("error", function(err: any) {
			if (err.code === "ECONNRESET") {
				reject("Timeout occurs");
			}
			reject(err);
		});
		// End timeout
	});
}
