import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiCheck } from "react-icons/bi";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../dependencies/firebaseConfig";
import { useDispatch } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import { removeMovieFromLiked } from "../store";
import video from "../assets/trailer.mp4";

export default React.memo(function Card({ index, movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else navigate("/login");
    });
  }, []);

  useEffect(() => {
    setShowDeleteIcon(location.pathname === "/mylist");
  }, [location.pathname]);

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
      setLiked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/remove", {
        email,
        data: movieData,
      });
      setLiked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromLiked = () => {
    dispatch(removeMovieFromLiked({ movieId: movieData.id, email }));
    setLiked(false);
  };

  const handleIconClick = () => {
    if (location.pathname === "/mylist") {
      handleRemoveFromLiked();
    } else {
      if (!liked) {
        addToList();
      }
    }
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={() => navigate("/player")}
      />

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="card"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              autoPlay={true}
              loop
              muted
              onClick={() => navigate("/player")}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {liked ? (
                  showDeleteIcon ? (
                    <AiOutlineDelete
                      title="Remove from List"
                      onClick={handleRemoveFromLiked}
                      style={{ color: "red" }}
                    />
                  ) : (
                    <BiCheck title="Added to List" style={{ color: "green" }} />
                  )
                ) : (
                  location.pathname !== "/mylist" && (
                    <AiOutlinePlus
                      title="Add to my list"
                      onClick={handleIconClick}
                    />
                  )
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre, i) => (
                  <li key={i}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: auto;
  cursor: pointer;
  position: relative;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    z-index: 10;
    box-shadow: 0 0 10px 1px #0a0a0a;
    transition: box-shadow 0.3s ease;
  }

  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: all 0.3s ease;

    .image-video-container {
      position: relative;
      height: 140px;

      img,
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
        border-radius: 10px;
        box-shadow: 0 0 10px 1px #0a0a0a;
      }
    }

    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }

    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: color 0.3s ease;
        &:hover {
          color: #b8b8b8;
        }
      }
    }

    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
