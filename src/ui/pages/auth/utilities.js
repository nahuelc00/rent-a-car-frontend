import validator from 'validator';

function validatePassword(password) {
  const isPasswordSecure = validator.isStrongPassword(password);
  return isPasswordSecure;
}

function validateEmail(email) {
  const isEmail = validator.isEmail(email);
  return isEmail;
}

function capitalizeFirstLetterAndRestInUpperCase(string) {
  const firstLetterCapitalized = string.charAt(0).toUpperCase();
  const restOfWordInLowerCase = string.slice(1).toLowerCase();
  const completeWord = firstLetterCapitalized + restOfWordInLowerCase;
  return completeWord;
}

export { validateEmail, validatePassword, capitalizeFirstLetterAndRestInUpperCase };
