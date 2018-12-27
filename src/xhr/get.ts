
export default function get(url, params, parse, encode) {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);

		xhr.onload = function() {
			if (this.status == 200) {
				resolve(this.response);
			} else {
				var error:any = new Error(this.statusText);
				error.code = this.status;
				reject(error);
			}
		};

		xhr.onerror = function() {
			reject(new Error("Network Error"));
		};

		if ("timeout" in params) {
			xhr.timeout = params.timeout;
			xhr.ontimeout = reject;
		}

		xhr.send();
	});
}

