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
          var generate = generateFromObject(value, "/", "/");
          str += `${key}${generate}`;
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

function getForceOptions(url, cb) {
  return url.replace(/\s--([^\s]+)?/g, (a, b) => {
    cb(b);
    return "";
  });
}

function generateFromObject(obj, join1, join2) {
  return Object.keys(obj)
    .map(function(prop) {
      return [prop, obj[prop]].map(encodeURIComponent).join(join1);
    })
    .join(join2);
}
function clearUrl(url, encodeIndex) {
  if (url[0] === ";") {
    url = url.slice(1);
  }
  if (encodeIndex !== null) {
    url = url.slice(0, encodeIndex);
  }
  return url;
}

function getEncode(url) {
  var index = url.lastIndexOf(" as ");
  if (index !== -1) {
    return {
      encode: url.slice(index + 4, url.length),
      indexOf: index,
    };
  }

  return { encode: null, indexOf: null };
}

export { getEncode, clearUrl, generateFromObject, getForceOptions, makeUrl };
