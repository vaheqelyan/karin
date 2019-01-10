import { makeUrl, processUrl } from "../template/help";

export default function get(param, ...keys) {
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

    let str = makeUrl(chunks, interpolations);
    let { normalizeUrl } = processUrl(str, options);

    const startFetch = await fetch(normalizeUrl, options);
    let data = {
      data: null,
      statusText: startFetch.statusText,
      status: startFetch.status,
      url: startFetch.url,
      ok: startFetch.ok,
      headers: startFetch.headers,
      redirected: startFetch.redirected,
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
