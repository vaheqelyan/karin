import { makeUrl, processUrl } from "../template/help";
import fetch from "node-fetch";

export default function post(param, ...keys) {
  var callOrReturn = param.constructor === Object;

  async function t() {
    var chunks = callOrReturn ? arguments[0] : param;
    var interpolations = callOrReturn ? [].slice.call(arguments, 1) : keys;

    var settings = callOrReturn ? param : { headers: {}, encode: "" };

    var options = {
      headers: {
        ...settings.headers,
      },
      encode: "",
      ...settings,
    };

    let str = makeUrl(chunks, interpolations, true);

    let postData = interpolations[interpolations.length - 1];

    if (typeof postData === "object") {
      if (!options.headers["Content-Type"]) {
        postData = JSON.stringify(postData);
        options.headers["Content-Type"] = "application/json";
      }
    }

    let { normalizeUrl } = processUrl(str, options);

    const startFetch = await fetch(normalizeUrl, {
      method: "POST",
      body: postData,
      ...options,
    });

    let data = {
      data: null,
      statusText: startFetch.statusText,
      status: startFetch.status,
      url: startFetch.url,
      ok: startFetch.ok,
      headers: startFetch.headers,
    };

    const { encode } = options;

    if (!encode) {
      if (/^application\/json/.test(startFetch.headers.get("content-type"))) {
        data.data = await startFetch.json();
      }
    } else {
      data.data = await startFetch[encode]();
    }

    return await data;
  }
  if (callOrReturn) {
    return t;
  } else {
    return t();
  }
}
