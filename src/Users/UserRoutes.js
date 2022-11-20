const express = require("express");

const routes = express.Router();

const {
  signUpUser,
  signInUser,
  validateUserSession,
} = require("./UserFunctions");

// Create a user, a session token & a refresh token
routes.post("/sign-up", async (request, response) => {
  // Process posted form/json data
  // Ideally perform validation on those properties before moving on.
  // Not in the scope of this guide though! ;)
  const { email, password, displayName } = request.body;
  const newUserDetails = {
    email,
    password,
    displayName,
  };
  // Hand data to a sign-up function
  const signUpResult = await signUpUser({
    email: newUserDetails.email,
    password: newUserDetails.password,
    displayName: newUserDetails.displayName,
  });

  // Return error or token as response
  if (signUpResult.error || signUpResult.errorInfo) {
    console.log(
      `Stopping the signup process due to an error. ${signUpResult.error || signUpResult.errorInfo.message}`
    );
    return response.status(401).json(signUpResult);
  }

  // Sign in to get latest user claims (authorization).
  const signInResult = await signInUser({
    email: newUserDetails.email,
    password: newUserDetails.password,
  });

  // If an error message exists, return that.
  if (signInResult.error) {
    console.log(
      `Stopping the signup process due to an error. ${signInResult.error}`
    );
    return response.status(401).json(signInResult);
  }
  return response.status(201).json(signInResult);
});

// Create a session token & refresh token
routes.post("/sign-in", async (request, response) => {
  // Process posted form/json data
  const { email, password } = request.body;

  const userDetails = {
    email,
    password,
  };
  // Ideally perform validation on those properties before moving on.
  // Not in the scope of this guide though! ;)

  // Hand data to a sign-in function
  const signInResult = await signInUser({
    email: userDetails.email,
    password: userDetails.password,
  });

  // If an error message exists, return that.
  if (signInResult.error) {
    console.log(
      `Stopping the signup process due to an error. ${signInResult.error}`
    );
    return response.status(401).json(signInResult);
  }
  return response.status(201).json(signInResult);
});

// Create a session token & refresh token
routes.post("/validate-session", async (request, response) => {
  // Process posted form/json data
  const { idToken, refreshToken } = request.body;

  const sessionDetails = {
    idToken,
    refreshToken,
  };

  // Hand data to a validation function
  const validationResult = await validateUserSession({
    refreshToken: sessionDetails.refreshToken,
    idToken: sessionDetails.idToken,
  });

  // If an error message exists, return that.
  if (validationResult.error) {
    console.log(
      `Stopping the signup process due to an error. ${validationResult.error}`
    );
    return response.status(401).json(validationResult);
  }
  return response.status(200).json(validationResult);

  // // Return error or token as response
  // response.json(validationResult);
});

module.exports = routes;
