import test from "ava";
import { get, karin } from "../../build/node/index.js";

test("Get JSON without interpolating expressions", async t => {
  t.plan(2);
  const data = await get`https://jsonplaceholder.typicode.com/todos/1`;
  t.is(data.status, 200);
  t.is(data.data.constructor, Object);
});

test("Get JSON with interpolating expressions (numeric value)", async t => {
  t.plan(2);

  const todoId = 1;

  const data = await get`https://jsonplaceholder.typicode.com/todos/${todoId}`;
  t.is(data.status, 200);
  t.is(data.data.constructor, Object);
});

test("Get JSON with an interpolation expression, without a slash after the query", async t => {
  t.plan(2);

  const todoId = 1;

  const data = await get`https://jsonplaceholder.typicode.com/todos${todoId}`;
  t.is(data.status, 200);
  t.is(data.data.constructor, Object);
});

test("Get JSON with an interpolation expression (object value, List of URL request parameters)", async t => {
  t.plan(2);

  const settings = {
    postId: 3,
  };

  const data = await get`http://jsonplaceholder.typicode.com/comments?${settings}`;
  t.is(data.status, 200);
  t.is(data.data.constructor, Array);
});

test("Get JSON with an interpolation expression (object value, List of URL request parameters) #2", async t => {
  t.plan(2);

  const settings = {
    postId: 3,
  };
  const path = "albums";
  const data = await get`http://jsonplaceholder.typicode.com/${path}?${settings}`;
  t.is(data.status, 200);
  t.is(data.data.constructor, Array);
});

test("Get JSON with interpolation expression (numeric value, string value)", async t => {
  t.plan(2);

  const settings = {
    email: "Jayne_Kuhic@sydney.com",
  };
  const path = "albums";
  const id = 3;
  const data = await get`https://jsonplaceholder.typicode.com/${path}/${id}/comments?${settings}`;
  t.is(data.status, 200);
  t.is(data.data.constructor, Array);
});

test("Get JSON with interpolation expressions (object value, with a setted origin parameter)", async t => {
  t.plan(2);

  const settings = {
    email: "Jayne_Kuhic@sydney.com",
  };

  const jsonPlaceholder = get({
    origin: "https://jsonPlaceholder.typicode.com",
  });
  const data = await jsonPlaceholder`/${{
    albums: 3,
  }}/comments?${settings}`;
  t.is(data.status, 200);
  t.is(data.data.constructor, Array);
});

test("Get JSON with interpolation expressions (object value, from an instance)", async t => {
  t.plan(2);

  const settings = {
    email: "Jayne_Kuhic@sydney.com",
  };

  const jsonPlaceholder = karin.create({
    origin: "https://jsonPlaceholder.typicode.com",
  });
  const data = await jsonPlaceholder.get`/${{
    albums: 3,
  }}/comments?${settings}`;
  t.is(data.status, 200);
  t.is(data.data.constructor, Array);
});

test("Get JSON with interpolation expressions (object value, from an instance) (--raw)", async t => {
  t.plan(2);

  const settings = {
    email: "Jayne_Kuhic@sydney.com",
  };

  const jsonPlaceholder = karin.create({
    origin: "https://jsonPlaceholder.typicode.com",
  });
  const data = await jsonPlaceholder.get`/${{
    albums: 3,
  }}/comments?${settings} --raw`;
  t.is(data.status, 200);
  t.is(data.data.constructor, String);
});
