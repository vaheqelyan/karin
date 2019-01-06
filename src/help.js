function dataBody(contentType, encode, raw) {
  if (!encode) {
    if (/^application\/json/.test(contentType)) {
      return JSON.parse(raw);
    }
  } else {
    let final = null;
    switch (encode) {
      case "json":
        final = JSON.parse(raw);
        break;

      case "text":
        final = raw.toString();
        break;

      case "raw":
        final = raw;
        break;
    }
    return final;
  }
}
export { dataBody };
