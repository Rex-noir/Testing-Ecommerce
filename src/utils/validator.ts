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

export function validateProduct(
  title: string,
  price: string,
  description: string,
  images: string[],
): { result: boolean; message: string } {
  if (title.length === 0) {
    return { result: false, message: "Please enter the title" };
  } else if (price.length === 0) {
    return { result: false, message: "Please enter the price" };
  } else if (price.charAt(0) === "$") {
    return {
      result: false,
      message: "Please remove the dollar sign at the price",
    };
  } else if (description.length < 10) {
    return {
      result: false,
      message: "Description must be longer than 10 characters",
    };
  } else if (checkURL(images).result === false) {
    return { result: false, message: checkURL(images).message };
  }
  return { result: true, message: "Success" };
}

function checkURL(images: string[]): { result: boolean; message: string } {
  for (let i = 0; i < images.length; i++) {
    const imageURL = images[i];
    if (!/^(https?:\/\/)[^\s]+$/.test(imageURL)) {
      // Simpler regex for basic validation
      return {
        result: false,
        message: `Image  ${i + 1} is not a valid URL.`,
      };
    }
  }
  return { result: true, message: "All image URLs are valid." };
}
