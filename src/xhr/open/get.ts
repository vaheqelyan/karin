import headersToObjet from "./getHeaders";

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

export default function xhrGet(url, params, parse, encode) {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();

		xhr.open("GET", url, true);
		var entries = Object.entries(params.headers);
		if (entries.length > 0) {
			for (const [key, value] of Object.entries(params.headers)) {
				xhr.setRequestHeader(key, value as string);
			}
		}
		xhr.onload = function() {
			if (this.status == 200) {
				var headers = headersToObjet(xhr.getAllResponseHeaders());
				var contentType = headers["Content-Type"];
				resolve({
					headers: headers,
					message: this.statusText,
					status: this.status,
					data: dataBody(contentType, encode, this.response),
				});
				resolve(this.response);
			} else {
				var error = new Error(this.statusText);
				reject(error.message);
			}
		};

		xhr.onerror = function() {
			reject(new Error("Network Error"));
		};

		if ("timeout" in params) {
			xhr.timeout = params.timeout;
			xhr.ontimeout = () => {
				reject("Timeout occurs");
			};
		}

		xhr.send();
	});
}
