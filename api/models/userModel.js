const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },
  playlists: [
    {
      name: String,
      uuid: {
        type: String,
        default: uuidv4,
      },
      likedMovies: Array,
      public: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
