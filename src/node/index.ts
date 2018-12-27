import nodeGet from "./get";
import { parse } from "url";

function extractUrl(url, start) {
	return url.slice(start.symbolIndex + 1, url.length);
}
function extractProtocol(url, getSymbolIndex) {
	var makeUrl = url.slice(getSymbolIndex, url.length);

	var https = makeUrl.slice(0, 5);
	var http = makeUrl.slice(0, 4);
	if (https === "https") {
		return "https";
	} else if (http === "http") {
		return "http";
	} else {
		throw "Htpp or https";
	}
}
function extractAction(url) {
	var symbol = url.indexOf("#");
	var action = url.slice(0, symbol);

	var path = url.slice(symbol + 1, url.length);
	if (action === "get") {
		return { type: "get", symbolIndex: symbol };
	}
	if (action === "get?json" || action === "get?buf") {
		return {
			type: action.slice(0, 3),
			encode: action.slice(4, 8),
			symbolIndex: symbol
		};
	}
	throw "Can not find";
}

function ajax(chunks, ...interpolations) {
	var str = "";
	var postSettings = {};
	var getSettings = {};
	var settings = {};
	for (var i = 0; i < chunks.length; i++) {
		var key = chunks[i];
		var value = interpolations[i];

		if (value !== undefined) {
			if (typeof value === "object") {
				if (key === "get" || (key === "post" && chunks[i + 1][0] === "#")) {
					settings = { ...interpolations[i] };

					str += key;
					continue;
				}

				if (key[key.length - 1] === "?") {
					var generate = Object.keys(value)
						.map(function(prop) {
							return [prop, value[prop]].map(encodeURIComponent).join("=");
						})
						.join("&");
					str += `${key}${generate}`;
				} else {
					var generate = Object.keys(value)
						.map(function(prop) {
							return [prop, value[prop]].map(encodeURIComponent).join("/");
						})
						.join("/");
					str += `${key}${generate}`;
				}

				// end
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
	var action = extractAction(str);
	var url = extractUrl(str, action);

	if (this && this !== global && Object.keys(this).length > 0) {
		settings = {
			...this,
			...settings
		};
		url = `${this.origin}${url}`;
	}

	var parseUrl = parse(url);
	if (action.type === "get") {
		return nodeGet(url, settings, parseUrl, action.encode);
	}
}

export default ajax;
