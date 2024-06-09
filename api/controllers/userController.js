const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");

module.exports.createPlaylist = async (req, res) => {
  try {
    const { email, name } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, playlists: [] });
    }
    const playlist = {
      name,
      uuid: uuidv4(),
      likedMovies: [],
      public: false,
    };
    user.playlists.push(playlist);
    await user.save();

    return res.json({ msg: "success", playlist });
  } catch (error) {
    console.error("Error creating playlist:", error);
    return res.status(500).json({ msg: "Error creating playlist." });
  }
};

module.exports.addMovieToPlaylistByName = async (req, res) => {
  try {
    const { email, playlistName, movieData } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const playlist = user.playlists.find((p) => p.name === playlistName);
      if (playlist) {
        const movieExists = playlist.likedMovies.some(
          ({ id }) => id === movieData.id
        );
        if (!movieExists) {
          playlist.likedMovies.push(movieData);
          await user.save();
          return res.json({ msg: "Movie added successfully to the playlist." });
        } else {
          return res.json({ msg: "Movie already exists in the playlist." });
        }
      } else {
        return res.status(404).json({ msg: "Playlist not found." });
      }
    } else {
      return res.status(404).json({ msg: "User not found." });
    }
  } catch (error) {
    console.error("Error adding movie to playlist:", error);
    return res.status(500).json({ msg: "Error adding movie to playlist." });
  }
};

module.exports.removeMovieFromPlaylistByName = async (req, res) => {
  try {
    const { email, playlistName, movieId } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
      const playlist = user.playlists.find((p) => p.name === playlistName);
      if (playlist) {
        const movieIndex = playlist.likedMovies.findIndex(
          ({ id }) => id === movieId
        );
        if (movieIndex !== -1) {
          playlist.likedMovies.splice(movieIndex, 1);
          await user.save();
          return res.json({
            msg: "Movie removed successfully from the playlist.",
          });
        } else {
          return res
            .status(404)
            .json({ msg: "Movie not found in the playlist." });
        }
      } else {
        return res.status(404).json({ msg: "Playlist not found." });
      }
    } else {
      return res.status(404).json({ msg: "User not found." });
    }
  } catch (error) {
    console.error("Error removing movie from playlist:", error);
    return res.status(500).json({ msg: "Error removing movie from playlist." });
  }
};



module.exports.getPlaylists = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ playlists: user.playlists });
    } else {
      return res.status(404).json({ msg: "User not found." });
    }
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return res.status(500).json({ msg: "Error fetching playlists." });
  }
};

module.exports.getPlaylistByName = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.findOne({ "playlists.name": name });
    if (user) {
      const playlist = user.playlists.find((p) => p.name === name);
      return res.json({ playlist });
    } else {
      return res.status(404).json({ msg: "Playlist not found." });
    }
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return res.status(500).json({ msg: "Error fetching playlist." });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({ "playlists.uuid": uuid });
    if (user) {
      const playlist = user.playlists.find((p) => p.uuid === uuid);
      if (playlist) {
        return res.json({ msg: "success", movies: playlist.likedMovies });
      } else {
        return res.json({ msg: "Playlist not found." });
      }
    } else {
      return res.json({ msg: "User not found." });
    }
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};

module.exports.publicGetLikedMovies = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({ "playlists.uuid": uuid });
    if (user) {
      const playlist = user.playlists.find((p) => p.uuid === uuid);
      if (playlist) {
        if (playlist.public) {
          return res.json({
            msg: "success",
            email: user.email,
            movies: playlist.likedMovies,
          });
        } else {
          return res.json({ msg: "Playlist is Private" });
        }
      } else {
        return res.json({ msg: "Playlist not found" });
      }
    } else {
      return res.json({ msg: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error fetching movies." });
  }
};

module.exports.deletePlaylist = async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const playlistIndex = user.playlists.findIndex((p) => p.name === name);
      if (playlistIndex !== -1) {
        user.playlists.splice(playlistIndex, 1);
        await user.save();
        return res.json({ msg: "success" });
      } else {
        return res.status(404).json({ msg: "Playlist not found." });
      }
    } else {
      return res.status(404).json({ msg: "User not found." });
    }
  } catch (error) {
    console.error("Error deleting playlist:", error);
    return res.status(500).json({ msg: "Error deleting playlist." });
  }
};


module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { uuid, data } = req.body;
    const user = await User.findOne({ "playlists.uuid": uuid });
    if (user) {
      const playlist = user.playlists.find((p) => p.uuid === uuid);
      const { likedMovies } = playlist;
      const movieExists = likedMovies.find(({ id }) => id === data.id);
      if (!movieExists) {
        playlist.likedMovies.push(data);
        await user.save();
        return res.json({ msg: "Movie added successfully." });
      } else {
        return res.json({ msg: "Movie already added." });
      }
    } else {
      return res.json({ msg: "Playlist not found." });
    }
  } catch (error) {
    return res.json({ msg: "Error adding movie." });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { uuid, movieId } = req.body;
    const user = await User.findOne({ "playlists.uuid": uuid });
    if (user) {
      const playlist = user.playlists.find((p) => p.uuid === uuid);
      const { likedMovies } = playlist;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
      if (movieIndex === -1) {
        return res.status(400).send({ msg: "Movie not found." });
      }
      likedMovies.splice(movieIndex, 1);
      await user.save();
      return res.json({ msg: "Movie removed successfully." });
    } else {
      return res.json({ msg: "Playlist not found." });
    }
  } catch (error) {
    return res.json({ msg: "Error removing movie." });
  }
};

module.exports.checkAndGenerateUUID = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      if (!user.uuid) {
        user.uuid = uuidv4();
        user.public = false;
        await user.save();
      }
      return res.json({ msg: "success", uuid: user.uuid });
    } else {
      return res.json({ msg: "User not found." });
    }
  } catch (error) {
    console.error("Error generating UUID:", error);
    return res.json({ msg: "Error generating UUID." });
  }
};

module.exports.makePublic = async (req, res) => {
  try {
    const { email, playlistName } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const playlist = user.playlists.find((p) => p.name === playlistName);
    if (!playlist) {
      return res.status(404).json({ msg: "Playlist not found." });
    }

    playlist.public = true;
    await user.save();

    return res.json({ msg: "success", uuid: playlist.uuid });
  } catch (error) {
    console.error("Error making playlist public:", error);
    return res.status(500).json({ msg: "Error making playlist public." });
  }
};

module.exports.makePrivate = async (req, res) => {
  try {
    const { email, uuid } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const playlist = user.playlists.find((p) => p.uuid === uuid);
    if (!playlist) {
      return res.status(404).json({ msg: "Playlist not found." });
    }

    playlist.public = false;
    await user.save();

    return res.json({ msg: "success", user });
  } catch (error) {
    console.error("Error making playlist private:", error);
    return res.status(500).json({ msg: "Error making playlist private." });
  }
};