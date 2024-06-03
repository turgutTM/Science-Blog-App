import mongoose from "mongoose";

const scientistSchema = new mongoose.Schema({
  name: String,
  field: String,
  nationality: String,
  biography: String,
  imageURL: String,
  isRecommended: Boolean,
  ratings: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number }],
  averageRating: { type: Number, default: 0 },
});

scientistSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
  } else {
    const sum = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    this.averageRating = sum / this.ratings.length;
  }
  return this.averageRating;
};

const Scientist = mongoose.model("Scientist", scientistSchema);

export default Scientist;
