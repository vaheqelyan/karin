# Karin

<p>
  <a href="https://travis-ci.org/vaheqelyan/karin"><img src="https://travis-ci.org/vaheqelyan/karin.svg?branch=master"/></a>
  <a href="https://www.npmjs.com/package/karin"><img  src="https://img.shields.io/npm/v/karin.svg"/></a>
<a href="#">
	<img src="https://img.shields.io/badge/node->=4.9.1-brightgreen.svg"/>
</a>
<a href="https://bundlephobia.com/result?p=karin@latest"><img src="https://img.shields.io/bundlephobia/minzip/karin.svg?style=flat-square"/></a>
</p>

<img src="https://res.cloudinary.com/dmtrk3yns/image/upload/q_auto/v1546696886/carbon_4_w0jdqr.png"/>

## About

Template literals are very useful. A more advanced form of template literals are tagged templates. Karin works in all major browsers (Chrome, Firefox, IE, Edge, Safari, and Opera). Modern browsers and JavaScript engines support tag templates. It is also compatible with Node.js, despite the fact that Karin is mainly for the client side javascript

## Installataion

**via NPM**

```code
npm i karin
```

**via CDN (unpkg)**

```code
https://unpkg.com/karin@latest/build/browser/index.umd.js
```

UMD library exposed as Karin

```js
const { get, post } = Karin;
```

Import paths

```js
import { get, post, karin } from "karin/build/node";
import { get, post, karin } from "karin/build/browser/index.umd.js";
```

## Make a get request

The response data - By default, if the response data type is Application/JSON, the response will be parsed into JSON ( You can set the option `--raw` to unset the processing )

```js
import { get } from "karin";

get`https://api.github.com/repos/vaheqelyan/karin`.then(res => console.log(res)).catch(err => console.error(err));
```

### Pattern Samples

```js
const user = "vahe",
  count = 123,
  filter = true;
get`http://domain.com/user${user}`;
// http://domain.com/user/vahe
get`http://domain.com/user${user}filter${filter}count${count}`;
// http://domain.com/user/vahe/filter/true/count/123
get`http://domain.com/path${{
  user,
  filter,
  count
}}`;
// http://domain.com/path/user/vaheqelyan/filter/true/count/123

const sub = "api.";
get`http://${sub}domain/${{ foo: "bar" }}`;
// Also works http://api.domain.com/foo/bar

get`htpp://domain.com/search/?${{ text: "a", lr: 10262 }}`;
// http://domain.com/search/?text=your%20query&lr=10262
```

### Response Schema

This is the response schema

```json
{
  "data": {},

  "status": 200,

  "statusText": "OK",

  "headers": {}
}
```

## Make a post request

The post data - If the data is an object, it will be stringified

The response data - By default, if the response data type is Application/JSON, the response will be parsed into JSON ( You can set the option `--raw` to unset the processing )

**Note** that the data to be sent is the last item.

```js
import { post } from "karin";

const user = {
  username: "vaheqelyan",
  password: "XXXX"
};

post`http://localhost:3000/register ${user}`.then(res => console.log(res)).catch(err => console.log(err));
```

## Options and Parameters

`--json` Sets the content type to application/json

```js
post`http://localhost:3000/register ${JSON.stringify(data)} --json`;
```

`--raw` Means that the response will not be processed. Works for both get and post requests.

```js
post`http://localhost:3000/path --raw`;
```

Set the parameters for both get and post requests.

- origin - The URL origin
- headers - Set header in header object
- timeout - Set timeout

```js
const github = get({ origin: "http://api.github.com", timeout: 1000 /**/ });
github`/repos/${user}/${repo}`;
```
