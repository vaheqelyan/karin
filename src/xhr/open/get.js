import headersToObjet from "./getHeaders";
import dataBody from "../../help";

export default function xhrGet(url, params, parse) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    var entries = Object.entries(params.headers);
    if (entries.length > 0) {
      for (const [key, value] of Object.entries(params.headers)) {
        xhr.setRequestHeader(key, value);
      }
    }
    xhr.onload = function() {
      var headers = headersToObjet(xhr.getAllResponseHeaders().toLowerCase());
      var contentType = headers["content-type"];
      resolve({
        headers: headers,
        message: this.statusText,
        status: this.status,
        data: dataBody(contentType, params.encode, this.response),
      });
    };

    xhr.onerror = function(err) {
      reject(new TypeError("Network request failed"));
    };

    if ("timeout" in params) {
      xhr.timeout = params.timeout;
      xhr.ontimeout = () => {
        reject(new TypeError("Network request failed"));
      };
    }

    xhr.send();
  });
}
