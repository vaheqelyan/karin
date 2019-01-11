import { makeUrl, parseHeaders } from "../template/help";
import fetch from "node-fetch";

export default async function get(chunks, ...interpolations) {
  const url = makeUrl(chunks, interpolations);
  const { headers, pureUrl } = parseHeaders(url);

  const startFetch = await fetch(pureUrl, {
    method: "GET",
    headers: headers,
  });
  let data = {
    data: null,
    statusText: startFetch.statusText,
    status: startFetch.status,
    url: startFetch.url,
    ok: startFetch.ok,
    headers: startFetch.headers,
    redirected: startFetch.redirected,
  };
  if (/^application\/json/.test(startFetch.headers.get("content-type"))) {
    data.data = await startFetch.json();
  }
  return await data;
}
