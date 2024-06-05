import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../dependencies/firebaseConfig";
import Card from "../components/Card";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getUsersLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";

export default function Playlist() {
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [shareLink, setShareLink] = useState("");
  const [isCopied, setIsCopied] = useState(false); 

  useEffect(() => {
    if (!localStorage.getItem("cini-auth")) {
      navigate("/");
    }
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
    }
  }, [email, dispatch]);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }, []);

  const handleShare = () => {
    if (email) {
      const link = `${window.location.origin}/shared-playlist/${email}`;
      setShareLink(link);
      navigator.clipboard
        .writeText(link) 
        .then(() => {
          setIsCopied(true); 
          setTimeout(() => setIsCopied(false), 1400); 
        })
        .catch((error) => console.error("Could not copy text: ", error));
    }
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        {movies && movies.length > 0 ? <h1>My Playlist</h1> : ""}
        {movies && movies.length > 0 ? (
          <>
            <button
              onClick={handleShare}
              className="w-7 px-10 bg-slate-50 text-black flex justify-center rounded-2xl"
            >
              Share Public
            </button>
            {isCopied && (
              <p className="text-green-500 flex justify-center font-bold">
                Link copied to clipboard!
              </p>
            )}
          </>
        ) : (
          ""
        )}
        <div className="grid flex">
          {movies && movies.length > 0 ? (
            movies.map((movie, index) => (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            ))
          ) : (
            <h2 className="text-red-500 text-xl bold flex ml-[650px]">
              Your Playlist is Empty
            </h2>
          )}
        </div>
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
    .share-link {
      margin-top: 1rem;
      p {
        margin: 0;
      }
      a {
        color: blue;
        text-decoration: underline;
      }
    }
  }

  .empty-list-message {
    margin: 20px;
    color: red;
  }
`;
