import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/tittle.jpg";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../dependencies/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import Slider from "../components/Slider";

function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("cini-auth")) {
      navigate("/dash");
    }
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/");
  });

  useEffect(() => {
    if (!localStorage.getItem("cini-auth")) {
      navigate("/");
    }
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center bg-slate-600"
            >
              <FaPlay />
              Play
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;

  .hero {
    position: relative;

    .background-image {
      filter: brightness(60%);

      @media (max-width: 768px) {
        height: 50vh;
      }

      @media (max-width: 480px) {
        height: 40vh;
      }
    }

    img {
      height: 100vh;
      width: 100vw;

      @media (max-width: 768px) {
        height: 50vh;
      }

      @media (max-width: 480px) {
        height: 40vh;
      }
    }

    .container {
      position: absolute;
      bottom: 5rem;

      @media (max-width: 768px) {
        bottom: 3rem;
      }

      @media (max-width: 480px) {
        bottom: 2rem;
      }

      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;

          @media (max-width: 768px) {
            margin-left: 2rem;
          }

          @media (max-width: 480px) {
            margin-left: 1rem;
          }
        }
      }

      .buttons {
        margin: 5rem;
        gap: 2rem;
        display: flex;

        @media (max-width: 768px) {
          margin: 2rem;
          gap: 1rem;
        }

        @media (max-width: 480px) {
          margin: 1rem;
          gap: 0.5rem;
        }

        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;

          @media (max-width: 768px) {
            font-size: 1.2rem;
            padding-left: 1.5rem;
            padding-right: 1.9rem;
          }

          @media (max-width: 480px) {
            font-size: 1rem;
            padding-left: 1rem;
            padding-right: 1.4rem;
          }

          &:hover {
            opacity: 0.8;
          }

          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;

            svg {
              font-size: 1.8rem;

              @media (max-width: 768px) {
                font-size: 1.6rem;
              }

              @media (max-width: 480px) {
                font-size: 1.4rem;
              }
            }
          }
        }
      }
    }
  }
`;
export default Landing;