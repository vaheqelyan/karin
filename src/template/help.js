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
          var generateParams = generateFromObject(value, "/", "/");
          str += `${key}${generateParams}`;
        }
        continue;
      }

      value += "";
    } else {
      str += key;
      continue;
    }

    value += "";

    if (/[a-z]/.test(key[key.length - 1])) {
      str += `${key}/${value}`;
    } else {
      str += `${key}${value}`;
    }
  }
  return str;
}

function processUrl(url, options) {
  if (options.origin) {
    url = `${options.origin}${url}`;
  }

  var urlRegex = /(https?:\/\/[^ ]*)/;
  var urlSplitted = url.split(urlRegex).filter(value => value);

  var params = urlSplitted[1];
  if (params) {
    params
      .split(" ")
      .filter(value => value)
      .forEach(value => {
        if (value === "--json") {
          options.encode = "json";
        }

        if (value === "--text") {
          options.encode = "text";
        }

        if (value === "--blob") {
          options.encode = "blob";
        }

        if (value === "--content-json") {
          options.headers["Content-Type"] = "application/json";
        }

        if (value === "--arrbuf") {
          options.encode = "arrayBuffer";
        }
      });
  }

  return {
    normalizeUrl: urlSplitted[0],
  };
}

function generateFromObject(obj, join1, join2) {
  return Object.keys(obj)
    .map(function(prop) {
      return [prop, obj[prop]].map(encodeURIComponent).join(join1);
    })
    .join(join2);
}

export { generateFromObject, processUrl, makeUrl };
