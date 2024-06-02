// @vitest-environment jsdom

import { expect, test } from "vitest";
import CookieManager from "./cookie";

test("Set cookie correctly", () => {
  CookieManager.set("love", "ruthi", 1);
  console.log(document.cookie);
  expect(document.cookie.length === 1);
});

test("get Cookie value", () => {
  CookieManager.set("love", "ruthi", 1);
  const cookie = CookieManager.get("love");
  console.log(cookie)
  expect(CookieManager.get("love")).toBe("ruthi");
});
