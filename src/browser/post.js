import { makeUrl, parseHeaders } from "../template/help";

export default async function post(chunks, ...interpolations) {
  const url = makeUrl(chunks, interpolations, true);
  const { headers, pureUrl } = parseHeaders(url);

  let postData = interpolations[interpolations.length - 1];
  if (typeof postData === "object") {
    postData = JSON.stringify(postData);
    headers["Content-Type"] = "application/json";
  }

  const startFetch = await fetch(pureUrl, {
    method: "POST",
    body: postData,
    headers: headers,
  });

  let data = {
    data: null,
    statusText: startFetch.statusText,
    status: startFetch.status,
    url: startFetch.url,
    ok: startFetch.ok,
    headers: startFetch.headers,
  };

  if (/^application\/json/.test(startFetch.headers.get("content-type"))) {
    data.data = await startFetch.json();
  }

  return await data;
}
