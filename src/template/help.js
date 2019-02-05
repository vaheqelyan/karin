function makeUrl(chunks, interpolations, pastLast = false) {
  var str = "";
  let lastIndex = 0;
  if (pastLast) {
    lastIndex = interpolations.length - 1;
  }

  for (var i = 0; i < chunks.length; i++) {
    const key = chunks[i];
    let value = interpolations[i];

    if (pastLast && i === lastIndex) {
      str += key;
      continue;
    }

    if (value !== undefined) {
      if (typeof value === "object") {
        if (key[key.length - 1] === "?") {
          var generate = generateFromObject(value, "=", "&");
          str += `${key}${generate}`;
        } else {
          if (key[key.length - 1] !== "\n") {
            var generateParams = generateFromObject(value, "/", "/");
            str += `${key}${generateParams}`;
          }
        }
        continue;
      }

      value += "";
    } else {
      str += key;
      continue;
    }

    value += "";
    str += `${key}${value}`;
  }
  return str;
}

function generateFromObject(obj, join1, join2) {
  return Object.keys(obj)
    .map(function(prop) {
      return [prop, obj[prop]].map(encodeURIComponent).join(join1);
    })
    .join(join2);
}

function parseHeaders(url) {
  const getIndex = url.indexOf("\n");
  let headers = {};
  let pureUrl = url;
  if (getIndex !== -1) {
    pureUrl = url.slice(0, getIndex);
    url
      .slice(getIndex)
      .trim()
      .split("\n")
      .forEach(value => {
        const getSymbol = value.indexOf(":");
        var key = value.slice(0, getSymbol).trim();
        var val = value.slice(getSymbol + 1, value.length).trim();

        headers[key] = val;
      });
  }
  return { headers, pureUrl };
}

async function handleResponse(response) {
  if (/^application\/json/.test(response.headers.get("content-type"))) {
    const data = await response.json();
    return { response, data };
  }

  return response;
}

export { generateFromObject, makeUrl, parseHeaders, handleResponse };
