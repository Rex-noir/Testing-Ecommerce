import { describe, expect, test } from "vitest";
import {
  validateFMail,
  validateFPassword,
  validateFUsername,
} from "./validator";

describe("Validate email correctly", () => {
  test("Pass valid email address", () => {
    expect(validateFMail("johndoe@gmail.com").result).toBe(true);
    expect(validateFMail("johndoe@gmail.com").message).toBe("Valid");
  });
  test("Fail invalid email address", () => {
    expect(validateFMail("jujuju").message).toBe("Invalid email!");
  });
  test("Fail empty email address", () => {
    expect(validateFMail("").message).toBe("Please enter your email address.");
  });
});

describe("Validate Password", () => {
  test("Pass valid password", () => {
    expect(validateFPassword("12345678").message).toBe("Valid");
  });
  test("Fail empty password", () => {
    expect(validateFPassword("").message).toBe("Please enter your password");
  });
  test("Fail password less than 8 characters", () => {
    expect(validateFPassword("123456").message).toBe(
      "Password must not be less than 8 characters!",
    );
  });
});

describe("Validate username", () => {
  test("Works", () => {
    expect(validateFUsername("Laura Hill").result).toBe(true);
  });
  test("Works with no space", () => {
    expect(validateFUsername("LauraHill").result).toBe(false);
  });
});
