import { makeUrl, getForceOptions } from "../template/help";
import { parse } from "url";
import nodeGet from "./http/get";

export default function get(param = {}, ...interpolations) {
  const paramType = param.constructor;
  if (paramType === Object) {
    return function(chunks, ...interpolations) {
      let settings = {
        headers: {
          ...param.headers,
        },
        encode: "",
        ...param,
      };
      let str: string = makeUrl(chunks, interpolations);

      var normalizeUrl = getForceOptions(str, b => {
        if (b === "raw") {
          settings.encode = "raw";
        }
        if (b === "json") {
          settings.encode = "json";
        }
      });

      if (param.origin) {
        normalizeUrl = `${param.origin}${str}`;
      }

      const parseUrl = parse(normalizeUrl);
      return nodeGet(normalizeUrl, settings, parseUrl);
    };
  } else if (paramType === Array) {
    let settings = {
      headers: {},
      encode: "",
    };
    let chunks: string[] = param;
    let str: string = makeUrl(chunks, interpolations);

    const normalizeUrl = getForceOptions(str, b => {
      if (b === "raw") {
        settings.encode = "raw";
      }
      if (b === "json") {
        settings.encode = "json";
      }
    });

    const parseUrl = parse(normalizeUrl);
    return nodeGet(normalizeUrl, settings, parseUrl);
  } else {
    return new Error("The argument must be Object or an template tag");
  }
}
