import nodeGet from "./http/get";
import { parse } from "url";

var url = require("url");

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

export default function get(chunks, ...interpolations) {
	const isBounded = this && this !== global; // plz do not talk me off too much

	var str = "";

	var settings = {};

	for (var i = 0; i < chunks.length; i++) {
		var key = chunks[i];
		var value = interpolations[i];

		if (value !== undefined) {
			if (typeof value === "object") {
				if (i === 0 && chunks[i + 1].indexOf(isBounded ? ";" : ";http") !== -1) {
					settings = { ...value };
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

	var encode = getEncode(str);

	var normalizeUrl = clearUrl(str, encode.indexOf);

	if (isBounded) {
		if (this.origin) {
			normalizeUrl = `${this.origin}${normalizeUrl}`;
		}
		settings = Object.assign(this, settings);
	}

	const parseUrl = parse(normalizeUrl);

	return nodeGet(normalizeUrl, settings, parseUrl, encode);
}
