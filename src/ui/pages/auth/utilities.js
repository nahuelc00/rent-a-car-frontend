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

function getAccessToken() {
  const { cookie } = document;
  const partsOfCookie = cookie.split(';');
  let accessToken;

  for (let index = 0; index < partsOfCookie.length; index += 1) {
    const partOfCookie = partsOfCookie[index];
    const existAccessToken = partOfCookie.includes('access_token');

    if (existAccessToken) {
      const accessTokenInCookie = partOfCookie.split('=')[1];
      accessToken = accessTokenInCookie;
      break;
    } else {
      accessToken = undefined;
    }
  }

  return accessToken;
}

export {
  validateEmail, validatePassword, capitalizeFirstLetterAndRestInUpperCase, getAccessToken,
};
