function headersToObject(string) {
	var lines = string.split("\n");
	var headers = {};
	for (var i = 0; i < lines.length; i++) {
		var value = lines[i];
		var iOf = value.indexOf(": ");
		if (iOf !== -1) {
			headers[value.slice(0, iOf)] = value.slice(iOf + 2);
		}
	}
	return headers;
}
export default headersToObject;
