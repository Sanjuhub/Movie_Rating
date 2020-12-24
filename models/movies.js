const mongoose = require("mongoose");
const { Schema } = mongoose;

const moviesSchema = new Schema({
  movie_name: {
    type: String,
    required: true,
  },
  ratings: [
    {
      user: { type: String, required: true },
      user_rating: { type: Number, required: true },
      user_comment: { type: String },
    },
  ],
});

mongoose.model("movies", moviesSchema);
