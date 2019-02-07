import test from "ava";
import { get } from "../../build/node/index.js";

test("Get JSON without interpolating expressions", async t => {
  t.plan(2);
  const {
    response,
    data,
  } = await get`https://jsonplaceholder.typicode.com/todos/1`;
  t.is(response.status, 200);
  t.is(data.constructor, Object);
});

test("Get JSON with interpolating expressions (numeric value)", async t => {
  t.plan(2);

  const todoId = 1;

  const {
    response,
    data,
  } = await get`https://jsonplaceholder.typicode.com/todos/${todoId}`;
  t.is(response.status, 200);
  t.is(data.constructor, Object);
});

test("Get JSON with an interpolation expression (object value, List of URL request parameters)", async t => {
  t.plan(2);

  const settings = {
    postId: 3,
  };

  const {
    response,
    data,
  } = await get`http://jsonplaceholder.typicode.com/comments?${settings}`;
  t.is(response.status, 200);
  t.is(data.constructor, Array);
});

test("Get JSON with an interpolation expression (object value, List of URL request parameters) #2", async t => {
  t.plan(2);

  const settings = {
    postId: 3,
  };
  const path = "albums";
  const {
    response,
    data,
  } = await get`http://jsonplaceholder.typicode.com/${path}?${settings}`;
  t.is(response.status, 200);
  t.is(data.constructor, Array);
});

test("Get JSON with interpolation expression (numeric value, string value)", async t => {
  t.plan(2);

  const settings = {
    email: "Jayne_Kuhic@sydney.com",
  };
  const path = "albums";
  const id = 3;
  const {
    response,
    data,
  } = await get`https://jsonplaceholder.typicode.com/${path}/${id}/comments?${settings}`;
  t.is(response.status, 200);
  t.is(data.constructor, Array);
});
