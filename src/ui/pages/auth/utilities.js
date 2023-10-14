import validator from 'validator';

function validatePassword(password) {
  const isPasswordSecure = validator.isStrongPassword(password);
  return isPasswordSecure;
}

function validateEmail(email) {
  const isEmail = validator.isEmail(email);
  return isEmail;
}

export { validateEmail, validatePassword };
