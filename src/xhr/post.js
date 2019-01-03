import { makeUrl, getForceOptions } from "../template/help";
import xhrPost from "./open/post";

export default function post(param = {}, ...interpolations) {
  const paramType = param.constructor;
  if (paramType === Object) {
    return function template(chunks, ...interpolations) {
      let settings = {
        headers: {
          ...param.headers,
        },
        encode: "",
        ...param,
      };
      let str = makeUrl(chunks, interpolations, true);

      let postData = interpolations[interpolations.length - 1];

      if (typeof postData === "object") {
        postData = JSON.stringify(postData);
        settings.headers["Content-Type"] = "application/json";
      }

      var normalizeUrl = getForceOptions(str, b => {
        if (b === "raw") {
          settings.encode = "raw";
        }
        if (b === "content-x") {
          settings.headers["Content-Type"] = "x";
        }
      });
      if (param.origin) {
        normalizeUrl = `${param.origin}${normalizeUrl}`;
      }

      const parseUrl = new URL(normalizeUrl);
      return xhrPost(normalizeUrl, settings, parseUrl, postData);
    };
  } else if (paramType === Array) {
    let settings = {
      headers: {},
      encode: "",
    };
    let chunks = param;
    let str = makeUrl(chunks, interpolations, true);

    let postData = interpolations[interpolations.length - 1];

    const normalizeUrl = getForceOptions(str, b => {
      if (b === "raw") {
        settings.encode = "raw";
      }
    });

    if (typeof postData === "object") {
      postData = JSON.stringify(postData);
      settings.headers["Content-Type"] = "application/json";
    }

    const parseUrl = new URL(normalizeUrl);
    return xhrPost(normalizeUrl, settings, parseUrl, postData);
  } else {
    return new Error("The argument must be Object or an template tag");
  }
}
