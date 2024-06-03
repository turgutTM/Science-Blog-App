import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  favoriteScientists: [{ type: Schema.Types.ObjectId, ref: "Scientist" }],
});

export default mongoose.model("User", UserSchema);
