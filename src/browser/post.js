import { makeUrl } from "../template/help";

export default async function post(chunks, ...interpolations) {
  let { url, headers } = makeUrl(chunks, interpolations, true);

  let postData = interpolations[interpolations.length - 1];

  if (typeof postData === "object") {
    if (!headers["Content-Type"]) {
      postData = JSON.stringify(postData);
      headers["Content-Type"] = "application/json";
    }
  }

  const startFetch = await fetch(url, {
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
