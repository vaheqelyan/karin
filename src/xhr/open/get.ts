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
