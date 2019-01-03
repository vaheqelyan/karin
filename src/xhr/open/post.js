import headersToObjet from "./getHeaders";
import dataBody from "../../help";

export default function xhrPost(url, params, parse, postData) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

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
        message: xhr.statusText,
        status: xhr.status,
        headers: headers,
        data: dataBody(contentType, params.encode, xhr.response),
      });
    };

    xhr.onerror = function() {
      reject(new TypeError("Network request failed"));
    };

    if ("timeout" in params) {
      xhr.timeout = params.timeout;
      xhr.ontimeout = function() {
        reject(new TypeError("Network request failed"));
      };
    }

    xhr.send(postData);
  });
}
