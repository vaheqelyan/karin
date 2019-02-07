
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

Template literals are very useful. A more advanced form of template literals are tagged templates. Karin works in all major browsers (Chrome, Firefox, IE, Edge, Safari, and Opera). Modern browsers and JavaScript engines support tag templates. It is also compatible with Node.js.
**The package uses the Fetch API, make sure you have a polyfill to support older browsers**. Recommend to use [github/fetch](https://github.com/github/fetch)

e.g.
```jsx
import React from "react";
import { get } from "karin";

export default class Index extends React.Component {
  static async getInitialProps() {
    const { data, response } = await get`https://api.github.com/repos/zeit/next.js`;
    return { stars: data.stargazers_count };
  }

  render() {
    return (
      <div>
        <p> {this.props.stars} ⭐️</p>
      </div>
    );
  }
}
```

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
import { get, post } from "karin/build/node";
import { get, post } from "karin/build/browser/index.umd.js";
```

## Make a get request

The response data - By default, if the response data type is Application/JSON, the response will be parsed into JSON

```js
import { get } from "karin";

get`https://api.github.com/repos/vaheqelyan/karin`
  .then(result => console.log(result))
  .catch(err => console.error(err));
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
  .then(result => console.log(result))
  .catch(err => console.log(err));
```

## Add Header in HTTP Request

```js
post`https://example.com/api.createMsg?${{apiKey: config.apiKey}}
Content-Type: application/json
Accept: application/json
XXX: xxx

${{
  title: 'Test Message',
  body: 'This is a test of the messaging system.'
}}`
```
Thanks to [Ken Bellows](https://dev.to/kenbellows/comment/83m6) for the idea.

See Version [0.11.1](https://github.com/vaheqelyan/karin/tree/v0.11.1) for old syntax