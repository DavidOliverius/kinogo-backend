const mongoose = require('mongoose');

// Schema to structure the data
const ReviewSchema = new mongoose.Schema({
  reviewTitle: String,
  reviewContent: String,
  reviewAuthorID: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

ReviewSchema.methods.getAuthorName = async function getAuthorName() {
  /*
    let author = AuthorSchema.findById(this.postAuthorID)
    */
  console.log(
    `Use the auth system to search for a user, something like FirebaseAuth.findUser(postAuthorID) using the data value from ${this.postAuthorID}`
  );
};

// Class / model to help make instances of that schema
const Post = mongoose.model('Review', ReviewSchema);

module.exports = { Review };
