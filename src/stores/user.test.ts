// @vitest-environment jsdom

import { beforeEach, describe, expect, test, vi } from "vitest";
import { authUser } from "../utils/auth";
import CookieManager from "../utils/cookie";
import { useUserInfo } from "./user";
import { createPinia } from "pinia";

describe("Load from cookie", () => {
  let store;

  beforeEach(async () => {
    const user = await authUser("john@mail.com", "changeme");
    CookieManager.set("userAuth", user.json.access_token, 20);
    const pinia = createPinia();
    store = useUserInfo(pinia);
  });

  test("Set cookie successfully", () => {
    expect(CookieManager.get("userAuth")).toBeDefined();
  });

  test("Load from cookie correctly", async () => {
    const user = useUserInfo();
    await user.loadUser();
    console.log(user.getUser().value);
    expect(user.loggedIn).toBe(true);
  });

  test("Clear user", async () => {
    const user = useUserInfo();
    await user.loadUser();
    user.clearUser();
    expect(user.loggedIn).toBe(false);
  });
});
