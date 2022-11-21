const express = require("express");

const routes = express.Router();

const {
  signUpUser,
  signInUser,
  validateUserSession,
  getDisplayNameFromUID,
} = require("./UserFunctions");

// Create a user, a session token & a refresh token
routes.post("/sign-up", async (request, response) => {
  // Process posted form/json data
  // Ideally perform validation on those properties before moving on.
  // Not in the scope of this guide though! ;)

  // new user details
  const { email, password, displayName } = request.body;

  // Hand data to a sign-up function
  const signUpResult = await signUpUser({
    email,
    password,
    displayName,
  });

  // Return error or token as response
  if (signUpResult.error || signUpResult.errorInfo) {
    console.log(
      `Stopping the signup process due to an error. ${
        signUpResult.error || signUpResult.errorInfo.message
      }`
    );
    return response.status(401).json(signUpResult);
  }

  // Sign in to get latest user claims (authorization).
  const signInResult = await signInUser({
    email,
    password,
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
  // Ideally perform validation on those properties before moving on.
  // Not in the scope of this guide though! ;)

  // Hand data to a sign-in function
  const signInResult = await signInUser({
    email,
    password,
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

  // Hand data to a validation function
  const validationResult = await validateUserSession({
    refreshToken,
    idToken,
  });

  // If an error message exists, return that.
  if (validationResult.error) {
    console.log(
      `Stopping the signup process due to an error. ${validationResult.error}`
    );
    return response.status(401).json(validationResult);
  }
  return response.status(200).json(validationResult);
});

// Return a user's display name from their UID
routes.get("/username/:uid", async (request, response) => {
  const { uid } = request.params;

  const displayName = await getDisplayNameFromUID(uid);

  if (displayName.error) {
    console.log(
      `Stopping the signup process due to an error. ${displayName.error}`
    );
    return response.status(401).json(displayName);
  }
  return response.status(200).json(displayName);
});

module.exports = routes;
