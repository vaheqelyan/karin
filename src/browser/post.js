import { makeUrl, parseHeaders, handleResponse } from "../template/help";

export default async function post(chunks, ...interpolations) {
  const url = makeUrl(chunks, interpolations, true);
  const { headers, pureUrl } = parseHeaders(url);

  let postData = interpolations[interpolations.length - 1];
  if (typeof postData === "object") {
    postData = JSON.stringify(postData);
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(pureUrl, {
    method: "POST",
    body: postData,
    headers: headers,
  });

  return await handleResponse(response);
}
