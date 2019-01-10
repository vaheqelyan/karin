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

Template literals are very useful. A more advanced form of template literals are tagged templates. Karin works in all major browsers (Chrome, Firefox, IE, Edge, Safari, and Opera). Modern browsers and JavaScript engines support tag templates. It is also compatible with Node.js.**Package uses node-fetch for node.js and whatwg-fetch for client javascript**

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

The response data - By default, if the response data type is Application/JSON, the response will be parsed into JSON

```js
import { get } from "karin";

get`https://api.github.com/repos/vaheqelyan/karin`
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

### Samples

```js
const user = "vahe";
const count = 123;
const filter = true;

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

## Make a post request

The post data - If the data is an object, it will be stringified

The response data - By default, if the response data type is application/json, the response will be parsed into JSON

**Note** that the data to be sent is the last item.

```js
import { post } from "karin";

const user = {
  username: "vaheqelyan",
  password: "XXXX"
};

post`http://localhost:3000/register ${user}`
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

## Options and Parameters

`--json` `--blob` `--arrbuf` `--text`

```js
get`<URL> --text`;
// •> ▶︎ Promise {<pending>}
```

`--content-json` ― application/json

`--content-x` - application/x-www-form-urlencoded

**WIP...**

Set Request Header

```js
post({ headers: { XXX: "xxx" } })`<URL> ${{}}`;
```

Set URL origin

```js
const github = get({ origin: "https://api.github.com" });
github`/users/vaheqelyan`;
// •> ▶︎ Promise {<pending>}
```

## Instance

```js
import { karin } from "karin";

const domain = karin.create({
  origin: "...",
  headers: {
    /**/
  }
});

domain.post``;
domain.get``;
```
