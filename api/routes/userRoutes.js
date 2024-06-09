const express = require("express");
const router = express.Router();
const {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
  checkAndGenerateUUID,
  publicGetLikedMovies,
  makePublic,
  makePrivate,
  createPlaylist,
  getPlaylists,
  getPlaylistByName,
  addMovieToPlaylistByName,
  removeMovieFromPlaylistByName,
  deletePlaylist,
} = require("../controllers/userController");

router.get("/liked/:uuid", getLikedMovies);
router.post("/add-movie-to-playlist", addMovieToPlaylistByName);
router.post("/remove-movie-from-playlist", removeMovieFromPlaylistByName);
router.get("/playlists/:email", getPlaylists);
router.post("/check-uuid", checkAndGenerateUUID);
router.post("/add", addToLikedMovies);
router.put("/remove", removeFromLikedMovies);
router.get("/public/liked/:uuid", publicGetLikedMovies);
router.post("/make-public", makePublic);
router.post("/make-private", makePrivate);
router.post("/create-playlist", createPlaylist);
router.get("/playlist/:name", getPlaylistByName);
router.post("/delete-playlist", deletePlaylist);

module.exports = router;
