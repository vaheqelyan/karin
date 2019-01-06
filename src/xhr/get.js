import { makeUrl, getForceOptions } from "../template/help";
import xhrGet from "./open/get";

export default function get(param, ...keys) {
  var callOrReturn = null;
  if (param.constructor === Object) {
    callOrReturn = true;
  } else {
    callOrReturn = false;
  }

  function t() {
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

    let normalizeUrl = getForceOptions(str, b => {
      if (b === "json") {
        options.encode = "json";
      }
      if (b === "raw") {
        options.encode = "raw";
      }
    });

    if (options.origin) {
      normalizeUrl = `${options.origin}${normalizeUrl}`;
    }
    return xhrGet(normalizeUrl, options);
  }
  if (callOrReturn) {
    return t;
  } else {
    return t();
  }
}
