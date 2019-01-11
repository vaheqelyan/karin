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

function generateFromObject(obj, join1, join2) {
  return Object.keys(obj)
    .map(function(prop) {
      return [prop, obj[prop]].map(encodeURIComponent).join(join1);
    })
    .join(join2);
}

function parseHeaders(res) {
  let headers = {};
  res.split("\n").forEach(value => {
    var getIndex = value.indexOf(":");
    if (getIndex !== -1) {
      const key = value.slice(0, getIndex);
      const val = value.slice(getIndex + 1, value.length);
      headers[key] = val.trimLeft();
    }
  });
  return headers;
}

export { generateFromObject, makeUrl, parseHeaders };
