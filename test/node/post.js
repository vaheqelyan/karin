/*eslint no-console: 0*/
import test from "ava";
import { post, karin } from "../../build/browser/index.umd.js";

test("Creating a resource in jsonplaceholder with the json option", async t => {
  t.plan(2);

  const jsonPlaceholder = post({
    origin: "https://jsonplaceholder.typicode.com",
  });

  try {
    const data = await jsonPlaceholder`/posts ${JSON.stringify({
      title: "foo",
      body: "bar",
      userId: Math.random(),
    })} --json`;
    t.is(data.status, 201);
    t.is(data.data.constructor, Object);
  } catch (err) {
    console.log(err);
  }
});

test("Creating a resource in jsonplaceholder and getting a raw response with the origin parameter set", async t => {
  t.plan(2);

  const jsonPlaceholder = post({
    origin: "https://jsonplaceholder.typicode.com",
  });

  try {
    const data = await jsonPlaceholder`/posts ${{
      title: "foo",
      body: "bar",
      userId: Math.random(),
    }} --text`;
    t.is(data.status, 201);
    t.is(data.data.constructor, String);
  } catch (err) {
    console.log(err);
  }
});

test("Post from an instance", async t => {
  t.plan(2);

  const jsonPlaceholder = karin.create({
    origin: "https://jsonplaceholder.typicode.com",
  });

  try {
    const data = await jsonPlaceholder.post`/posts ${{
      title: "foo",
      body: "bar",
      userId: Math.random(),
    }}`;
    t.is(data.status, 201);
    t.is(data.data.constructor, Object);
  } catch (err) {
    console.log(err);
  }
});

test("Creating a resource in jsonplaceholder and getting a raw response", async t => {
  t.plan(2);

  try {
    const data = await post`https://jsonplaceholder.typicode.com/posts ${{
      title: "foo",
      body: "bar",
      userId: Math.random(),
    }} --text`;
    t.is(data.status, 201);
    t.is(data.data.constructor, String);
  } catch (err) {
    console.log(err);
  }
});

test("Creating a resource in jsonplaceholder.", async t => {
  t.plan(2);

  try {
    const data = await post`https://jsonplaceholder.typicode.com/posts ${{
      title: "foo",
      body: "bar",
      userId: Math.random(),
    }}`;
    t.is(data.status, 201);
    t.is(data.data.constructor, Object);
  } catch (err) {
    console.log(err);
  }
});

test("Creating a resource in jsonplaceholder with expression interpolations", async t => {
  t.plan(2);
  const sub = "jsonplaceholder";
  try {
    const data = await post`https://${sub}.${"typicode"}.com/${"posts"}/ ${{
      title: "foo",
      body: "bar",
      userId: Math.random(),
    }}`;
    t.is(data.status, 201);
    t.is(data.data.constructor, Object);
  } catch (err) {
    console.log(err);
  }
});

test("Creating a basic resource in jsonplaceholder", async t => {
  t.plan(2);
  try {
    const data = await post`https://jsonplaceholder.typicode.com/posts/ ${{
      title: "foo",
      body: "bar",
      userId: Math.random(),
    }}`;
    t.is(data.status, 201);
    t.is(data.data.constructor, Object);
  } catch (err) {
    console.log(err);
  }
});
