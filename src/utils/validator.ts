export function validateEmail(email: string) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

export function validateFMail(email: string): {
  result: boolean;
  message: string;
} {
  let result = false;
  let message = "";

  if (email === "" || email.length === 0) {
    result = false;
    message = "Please enter your email address.";
    return { result, message };
  } else if (email && validateEmail(email) === false) {
    result = false;
    message = "Invalid email!";
    return { result, message };
  } else {
    result = true;
    message = "Valid";
  }
  return { result: result, message: message };
}

export function validateFPassword(password: string): {
  result: boolean;
  message: string;
} {
  let result = false;
  let message = "";

  if (password === "" || password.length === 0) {
    result = false;
    message = "Please enter your password";
    return { result, message };
  } else if (password && password?.length < 8) {
    result = false;
    message = "Password must not be less than 8 characters!";
    return { result, message };
  } else {
    result = true;
    message = "Valid";
  }
  return { result, message };
}

export function validateFUsername(username: string): {
  result: boolean;
  message: string;
} {
  let result = false;
  let message = "";

  let names = username.trim().split(" ");

  if (names.length < 2) {
    result = false;
    message = "Please enter both your first and last name";
  } else if (names[0].length === 0 || names[0] === "") {
    result = false;
    message = "Please enter your first name!";
  } else if (names[1].length === 0 || names[1] === "") {
    result = false;
    message = "Please enter your last name!";
  } else {
    result = true;
    message = "Valid";
  }
  return { result: result, message: message };
}

