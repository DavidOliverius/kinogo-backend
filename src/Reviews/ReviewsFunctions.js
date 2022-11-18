const { Review } = require("../database/schemas/ReviewsSchema");

// Model.find() with no conditions inside "find()" will return all documents of that Model
async function getAllReviews() {
  let allReviews = await Review.find();
  // allReviews.foreach()

  return JSON.stringify(allReviews);
}

// New Review instance needs to be specifically saved for it to be stored in the database.
async function createSpecificReview(reviewDetails) {
  let newReview = new Review({
    reviewTitle: reviewDetails.reviewTitle,
    reviewContent: reviewDetails.reviewContent,
    reviewAuthorID: reviewDetails.reviewAuthorID,
    reviewApiID: reviewDetails.reviewApiID,
    rating: reviewDetails.rating,
  });
  // extra logic on the newReview before saving
  // then save
  let creationResult = await newReview.save();
  return creationResult;
}

// Find all reviews with reviewAPI
async function getSpecificReviewID(reviewApiID) {
  let allReviews = await Review.find({ reviewApiID: reviewApiID });
  return JSON.stringify(allReviews);
}

// Find all reviews with reviewAuthorID
async function getSpecificReviewAuthorID(reviewAuthorID) {
  let allReviews = await Review.find
  ({ reviewAuthorID: reviewAuthorID });
  return JSON.stringify(allReviews);
}


module.exports = {
  getAllReviews,
  createSpecificReview,
  getSpecificReviewID,
  getSpecificReviewAuthorID,
};
