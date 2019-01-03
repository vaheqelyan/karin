import { makeUrl, getForceOptions } from "../template/help";
import { parse } from "url";
import nodePost from "./http/post";

export default function post(param = {}, ...interpolations) {
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
      let str: string = makeUrl(chunks, interpolations, true);

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
      // console.log(`URL -> ${normalizeUrl}`)
      // console.log(normalizeUrl)
      const parseUrl = parse(normalizeUrl);

      var postData = interpolations[interpolations.length - 1];
      if (typeof postData === "object") {
        postData = JSON.stringify(postData);
        settings.headers["Content-Type"] = "application/json";
      }

      return nodePost(normalizeUrl, settings, parseUrl, postData);
    };
  } else if (paramType === Array) {
    var settings = {
      headers: {},
      encode: "",
    };
    let chunks: string[] = param;
    let str: string = makeUrl(chunks, interpolations, true);

    const normalizeUrl = getForceOptions(str, b => {
      if (b === "raw") {
        settings.encode = "raw";
      }
    });
    // console.log(normalizeUrl)
    const parseUrl = parse(normalizeUrl);

    var postData = interpolations[interpolations.length - 1];
    if (typeof postData === "object") {
      postData = JSON.stringify(postData);
      settings.headers["Content-Type"] = "application/json";
    }

    return nodePost(normalizeUrl, settings, parseUrl, postData);
  } else {
    return new Error("The argument must be Object or an template tag");
  }
}
