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

export { getEncode, clearUrl };
