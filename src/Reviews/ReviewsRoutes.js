const express = require('express');
const routes = express.Router();

const { getAllReviews, createSpecificReview, getSpecificReviewID } = require('./ReviewsFunctions');

// Get all reviews
routes.get('/', async (request, response) => {
  let reviewsResult = await getAllReviews();

  response.json(reviewsResult);
});

// Create a new review
routes.post('/', async (request, response) => {
  let creationResult = await createSpecificReview({
    reviewTitle: request.body.reviewTitle,
    reviewContent: request.body.reviewContent,
    reviewAuthorID: request.body.reviewAuthorID,
    reviewApiID: request.body.reviewApiID,
    rating: request.body.rating,
  });

  response.json(creationResult);
});

// Find all reviews with for specific Title
routes.get('/:reviewApiID', async (request, response) => {
  let specificReview = await getSpecificReviewID(request.params.reviewApiID);
  response.json(specificReview);
});

module.exports = routes;
