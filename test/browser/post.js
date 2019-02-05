/*eslint no-console: 0*/
import test from "ava";
import { post } from "../../build/browser/index.umd.js";

test("Creating a resource in jsonplaceholder. (Content-Type)", async t => {
  t.plan(2);

  try {
    const _post = {
      title: "foo",
      body: "bar",
      userId: Math.random(),
    };
    const { response, data } = await post`https://jsonplaceholder.typicode.com/posts
    Content-type: application/json
    ${JSON.stringify(_post)}`;
    t.is(response.status, 201);
    t.is(data.constructor, Object);
  } catch (err) {
    console.log(err);
  }
});

test("Creating a resource in jsonplaceholder.", async t => {
  t.plan(2);

  try {
    const {response, data } = await post`https://jsonplaceholder.typicode.com/posts ${{
      title: "foo",
      body: "bar",
      userId: Math.random(),
    }}`;
    t.is(response.status, 201);
    t.is(data.constructor, Object);
  } catch (err) {
    console.log(err);
  }
});

test("Creating a resource in jsonplaceholder with expression interpolations", async t => {
  t.plan(2);
  const sub = "jsonplaceholder";
  try {
    const { response, data } = await post`https://${sub}.${"typicode"}.com/${"posts"}/ ${{
      title: "foo",
      body: "bar",
      userId: Math.random(),
    }}`;
    t.is(response.status, 201);
    t.is(data.constructor, Object);
  } catch (err) {
    console.log(err);
  }
});

test("Creating a basic resource in jsonplaceholder", async t => {
  t.plan(2);
  try {
    const { response, data } = await post`https://jsonplaceholder.typicode.com/posts/ ${{
      title: "foo",
      body: "bar",
      userId: Math.random(),
    }}`;
    t.is(response.status, 201);
    t.is(data.constructor, Object);
  } catch (err) {
    console.log(err);
  }
});
