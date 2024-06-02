import { describe, expect, test } from "vitest";
import { authUser, createUser, updateUser, userWithSession } from "./auth";

describe("Test auth", () => {
  test("With default username", async () => {
    const call = await authUser("john@mail.com", "changeme");
    console.log(call.json);
    expect(call.response.status).toBe(201);
  });
  test("With wrong username", async () => {
    const call = await authUser("johncuck@gm", "ss33");
    expect(call.response.status).toBeInstanceOf(Error);
  });
});

describe("Test userWithSession", async () => {
  test("With access_token", async () => {
    const data = await userWithSession(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcxNzA4MTQ1NCwiZXhwIjoxNzE4ODA5NDU0fQ.orXbiJyBHvUoSHrLZsmkBychdgDRdTFvF7bGNeLIKw8",
    );
    console.log(data.json);
    expect(data.response.status).toBe(200);
  });
});

describe("Create user", () => {
  test("Create a user", async () => {
    const response = await createUser({
      name: "Lala",
      email: "king@gmail.com",
      password: "00000000",
      avatar: "https://api.dicebear.com/8.x/lorelei/svg",
    });
    console.log(response.json);
    expect(response.response.status).toBeDefined();
  });
});

describe("Update user", () => {
  test("Update works", async () => {
    const response = await updateUser(50, {
      name: "Savage" + " " + "Hunter",
    });
    console.log(await response.json);
    expect(response.response).toBeDefined();
  });
});
