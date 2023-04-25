import { ActionType, div, mult, numberReducer, sub, sum } from "./tasks";
import React from "react";

test("sum of 2 number", () => {
  const a: number = 10;
  const b: number = 7;
  const c: number = -11;
  const d: number = -15;
  const value: number = sum(a, b);
  const value1: number = sum(c, d);
  const value3: number = sum(d, b);
  expect(value).toBe(17);
  expect(value1).toBe(-26);
  expect(value3).toBe(-8);
});

test("substract 2 number", () => {
  const a: number = 10;
  const b: number = 7;
  const c: number = -11;
  const d: number = -15;

  const value: number = sub(a, b);
  const value1: number = sub(c, d);
  const value3: number = sub(d, b);
  expect(value).toBe(3);
  expect(value1).toBe(4);
  expect(value3).toBe(-22);
});

test("multiply 2 number", () => {
  const a: number = 10;
  const b: number = 7;
  const c: number = -11;
  const d: number = -15;
  const f: number = 5.5;
  const value: number = mult(a, b);
  const value1: number = mult(c, d);
  const value3: number = mult(d, b);
  const value4: number = mult(f, a);
  expect(value).toBe(70);
  expect(value1).toBe(165);
  expect(value3).toBe(-105);
  expect(value4).toBe(55);
});

test("divide 2 number", () => {
  const a: number = 10;
  const b: number = 4;
  const c: number = -11;
  const d: number = -15;
  const f: number = 5.5;
  const g: number = -20;
  const k: number = -4;
  const value: number = div(a, b);
  const value1: number = div(c, f);
  const value3: number = div(d, a);
  const value4: number = div(g, k);
  expect(value).toBe(2.5);
  expect(value1).toBe(-2);
  expect(value3).toBe(-1.5);
  expect(value4).toBe(5);
});

test("sum with numberReducer", () => {
  const salary: number = 1000;
  const action: ActionType = {
    type: "SUM",
    num: 200,
  };

  const result = numberReducer(salary, action);
  expect(result).toBe(1200);
});
