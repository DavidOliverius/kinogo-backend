const express = require("express");
const routes = express.Router();

const {
  getAllReviews,
  createSpecificReview,
  getSpecificReviewID,
  getSpecificReviewAuthorID,
  updateSpecificReview,
  deleteSpecificReview,
} = require("./ReviewsFunctions");

// Get all reviews
routes.get("/", async (request, response) => {
  let reviewsResult = await getAllReviews();
  response.json(reviewsResult);
});

// Create a new review
routes.post("/", async (request, response) => {
  let creationResult = await createSpecificReview({
    reviewContent: request.body.reviewContent,
    reviewAuthorID: request.body.reviewAuthorID,
    reviewApiID: request.body.reviewApiID,
    rating: request.body.rating,
  });
  response.json(creationResult);
});

// Update a review
routes.put("/:reviewID", async (request, response) => {
  let updateResult = await updateSpecificReview(request.params.reviewID, {
    reviewContent: request.body.reviewContent,
    rating: request.body.rating,
  });
  response.json(updateResult);
});

// Delete a review
routes.delete("/:reviewID", async (request, response) => {
  let deleteResult = await deleteSpecificReview(request.params.reviewID);
  response.json(deleteResult);
});

// Find all reviews for specific Title
routes.get("/titles/:reviewApiID", async (request, response) => {
  let specificReview = await getSpecificReviewID(request.params.reviewApiID);
  response.json(specificReview);
});

// Find all reviews by specific user
routes.get("/authors/:reviewAuthorID", async (request, response) => {
  let specificReview = await getSpecificReviewAuthorID(
    request.params.reviewAuthorID
  );
  response.json(specificReview);
});

module.exports = routes;
