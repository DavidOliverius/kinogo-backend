const { Review } = require("../database/schemas/ReviewsSchema");

// Fina all reviews
async function getAllReviews() {
  let allReviews = await Review.find();
  return JSON.stringify(allReviews);
}

// Create new review
async function createSpecificReview(reviewDetails) {
  let newReview = new Review({
    reviewTitle: reviewDetails.reviewTitle,
    reviewContent: reviewDetails.reviewContent,
    reviewAuthorID: reviewDetails.reviewAuthorID,
    reviewApiID: reviewDetails.reviewApiID,
    rating: reviewDetails.rating,
  });
  let creationResult = await newReview.save();
  return creationResult;
}

// Update review
async function updateSpecificReview(reviewID, reviewDetails) {
  let updateResult = await Review.updateOne(
    { _id: reviewID },
    {
      $set: {
        reviewTitle: reviewDetails.reviewTitle,
        reviewContent: reviewDetails.reviewContent,
        reviewAuthorID: reviewDetails.reviewAuthorID,
        reviewApiID: reviewDetails.reviewApiID,
        rating: reviewDetails.rating,
      },
    }
  );
  return updateResult;
}

// Find all reviews with reviewAPI
async function getSpecificReviewID(reviewApiID) {
  let allReviews = await Review.find({ reviewApiID: reviewApiID });
  return JSON.stringify(allReviews);
}

// Find all reviews with reviewAuthorID
async function getSpecificReviewAuthorID(reviewAuthorID) {
  let allReviews = await Review.find({ reviewAuthorID: reviewAuthorID });
  return JSON.stringify(allReviews);
}

module.exports = {
  getAllReviews,
  createSpecificReview,
  getSpecificReviewID,
  getSpecificReviewAuthorID,
};
