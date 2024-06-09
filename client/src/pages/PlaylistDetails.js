import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { firebaseAuth } from "../dependencies/firebaseConfig";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import Card from "../components/Card";
import axios from "axios";

export default function PlaylistDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(undefined);
  const [publicc, setPublicc] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [playlist, setPlaylist] = useState(null);

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
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/playlist/${name}`
        );
        if (response.data) {
          setPlaylist(response.data.playlist);
        }
      } catch (error) {
        console.error("Error fetching playlist: ", error);
      }
    };

    fetchPlaylist();
  }, [name]);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }, []);

  const handleMovieDelete = (movieId) => {
    if (playlist) {
      const updatedLikedMovies = playlist.likedMovies.filter(
        (movie) => movie.id !== movieId
      );
      setPlaylist((prevPlaylist) => ({
        ...prevPlaylist,
        likedMovies: updatedLikedMovies,
      }));
    }
  };

  const handlePublic = async () => {
    if (email && playlist) {
      const { name } = playlist;
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/make-public",
          { email, playlistName: name }
        );
        if (response.data.msg === "success") {
          setPublicc(true);
          const { uuid } = response.data;
          const link = `${window.location.origin}/shared-playlist/${uuid}`;
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
    if (email && playlist) {
      const { uuid } = playlist;
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/make-private",
          { email, uuid }
        );
        if (response.data.msg === "success") {
          setPublicc(false);
          setShareLink("");
        }
      } catch (error) {
        console.error("Error making playlist private: ", error);
      }
    }
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        {playlist ? (
          <>
            <h1>{playlist.name} Playlist</h1>
            {playlist && playlist.likedMovies.length > 0 ? (
              <>
                {publicc ? (
                  <button
                    onClick={handlePrivate}
                    className="mx-[620px] px-12 bg-slate-50 text-black flex justify-center rounded-2xl font-bold"
                  >
                    Make it Private
                  </button>
                ) : (
                  <button
                    onClick={handlePublic}
                    className="mx-[620px] px-12 bg-slate-50 text-black flex justify-center rounded-2xl font-bold"
                  >
                    Share Public
                  </button>
                )}
                {isCopied && (
                  <p className="text-green-500 flex justify-center font-bold">
                    Link copied to clipboard!
                  </p>
                )}
              </>
            ) : (
              ""
            )}
            <div className="mt-6 grid flex">
              {playlist.likedMovies.length > 0 ? (
                playlist.likedMovies.map((movie, index) => (
                  <Card
                    movieData={movie}
                    index={index}
                    key={movie.id}
                    isLiked={true}
                    onMovieDelete={handleMovieDelete}
                  />
                ))
              ) : (
                <h2 className="text-red-500 text-xl bold flex ml-[650px]">
                  Your Playlist is Empty
                </h2>
              )}
            </div>
          </>
        ) : (
          <h2>Playlist Not Found</h2>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
