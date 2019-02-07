import { makeUrl, parseHeaders, handleResponse } from "../template/help";
import fetch from "node-fetch";

export default async function get(chunks, ...interpolations) {
  const url = makeUrl(chunks, interpolations);
  const { headers, pureUrl } = parseHeaders(url);

  const response = await fetch(pureUrl, {
    method: "GET",
    headers: headers,
  });

  return await handleResponse(response);
}
