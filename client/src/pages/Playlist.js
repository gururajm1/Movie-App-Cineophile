import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../dependencies/firebaseConfig";
import Navbar from "../components/Navbar";
import { getUsersLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Input } from "@mui/material";

export default function Playlist() {
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [shareLink, setShareLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [publicc, setPublicc] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("cini-auth")) {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (email) {
      dispatch(getUsersLikedMovies(email));
      fetchUserPlaylists(email);
    }
  }, [email, dispatch]);

  const fetchUserPlaylists = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/playlists/${email}`
      );
      if (response.data) {
        setPlaylists(response.data.playlists);
      }
    } catch (error) {
      console.error("Error fetching playlists: ", error);
    }
  };

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }, []);

  const handlePublic = async () => {
    if (email) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/make-public",
          { email }
        );
        if (response.data.user) {
          setPublicc(true);
          const link = `${window.location.origin}/shared-playlist/${response.data.user.uuid}`;
          setShareLink(link);
          navigator.clipboard
            .writeText(link)
            .then(() => {
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 1400);
            })
            .catch((error) => console.error("Could not copy text: ", error));
        }
      } catch (error) {
        console.error("Error making playlist public: ", error);
      }
    }
  };

  const handlePrivate = async () => {
    if (email) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/make-private",
          { email }
        );
        if (response.data.user) {
          setPublicc(false);
          setShareLink("");
        }
      } catch (error) {
        console.error("Error making playlist private: ", error);
      }
    }
  };

  const handleCreatePlaylist = async () => {
    if (email && playlistName) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/create-playlist",
          { email, name: playlistName }
        );
        if (response.data.msg === "success") {
          fetchUserPlaylists(email);
          setPlaylistName("");
        }
      } catch (error) {
        console.error("Error creating playlist: ", error);
      }
    }
  };

  const handleDeletePlaylist = async (e, name) => {
    e.stopPropagation(); 
    if (email && name) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/delete-playlist",
          { email, name }
        );
        if (response.data.msg === "success") {
          fetchUserPlaylists(email);
          setDeleteMessage(`Playlist '${name}' deleted successfully.`);
          setTimeout(() => setDeleteMessage(""), 2000);
        }
      } catch (error) {
        console.error("Error deleting playlist: ", error);
      }
    }
  };

  const handlePlaylistClick = (name) => {
    navigate(`/myplaylist/${name}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar isScrolled={isScrolled} />
      <div className="flex flex-col items-center mt-44">
        <div className="create-playlist flex flex-col items-center space-y-4">
          <input
            type="text"
            className="text-white w-[520px] bg-black rounded-lg px-4 py-2 border border-white"
            placeholder="New Playlist Name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <button
            onClick={handleCreatePlaylist}
            className="w-60 rounded-3xl text-white font-semibold bg-green-600 hover:bg-green-800 px-4 py-1"
          >
            Create Playlist
          </button>
          {deleteMessage && (
            <div className="text-green-500 mt-2">{deleteMessage}</div>
          )}
        </div>
        <div className=" mt-12 flex mb-4">
          {playlists.length > 0 ? (
            <h2>My Playlists</h2>
          ) : (
            <h2 className="text-red-500 text-lg font-bold">
              No Playlists Available
            </h2>
          )}
        </div>
        <div
          className={`playlists grid grid-cols-3 gap-4 ml-20 ${
            playlists.length <= 15 ? "max-h-[600px] overflow-y-hidden" : ""
          }`}
        >
          {playlists.length > 0
            ? playlists.map((playlist) => (
                <div
                  className="playlist-card text-white bg-gray-900 rounded-lg p-4 cursor-pointer w-96 flex justify-between items-center"
                  key={playlist.uuid}
                  onClick={() => handlePlaylistClick(playlist.name)}
                >
                  <h3>{playlist.name}</h3>
                  <div
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePlaylist(e, playlist.name);
                    }}
                  >
                    Delete
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}