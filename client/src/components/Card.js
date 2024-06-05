import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleOutline, IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import {
  RiThumbUpLine,
  RiThumbUpFill,
  RiThumbDownLine,
  RiThumbDownFill,
} from "react-icons/ri";
import { BiCheck, BiCheckCircle } from "react-icons/bi";
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
  const [likedIcon, setLikedIcon] = useState(false);
  const [dislikedIcon, setDislikedIcon] = useState(false);
  const [playIcon, setPlayIcon] = useState(false);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } 
    });
  }, []);

  useEffect(() => {
    setShowDeleteIcon(location.pathname === "/myplaylist");
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
    if (location.pathname === "/myplaylist") {
      handleRemoveFromLiked();
    } else {
      if (!liked) {
        addToList();
      }
    }
  };

  const handlePlayClick = () => {
    setPlayIcon(true);
    setTimeout(() => {
      navigate("/player");
    }, 300); 
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={handlePlayClick}
      />

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="card"
              onClick={handlePlayClick}
            />
            <video
              src={video}
              autoPlay={true}
              loop
              muted
              onClick={handlePlayClick}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={handlePlayClick}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                {playIcon ? (
                  <IoPlayCircleSharp title="Play" onClick={handlePlayClick} />
                ) : (
                  <IoPlayCircleOutline title="Play" onClick={handlePlayClick} />
                )}
                {likedIcon ? (
                  <RiThumbUpFill
                    title="Like"
                    onClick={() => setLikedIcon(false)}
                  />
                ) : (
                  <RiThumbUpLine
                    title="Like"
                    onClick={() => setLikedIcon(true)}
                  />
                )}
                {dislikedIcon ? (
                  <RiThumbDownFill
                    title="Dislike"
                    onClick={() => setDislikedIcon(false)}
                  />
                ) : (
                  <RiThumbDownLine
                    title="Dislike"
                    onClick={() => setDislikedIcon(true)}
                  />
                )}
                {liked ? (
                  showDeleteIcon ? (
                    <AiOutlineDelete
                      title="Remove from List"
                      onClick={handleRemoveFromLiked}
                      style={{ color: "red" }}
                    />
                  ) : (
                    <BiCheckCircle
                      title="Added to List"
                      style={{ color: "green" }}
                    />
                  )
                ) : (
                  location.pathname !== "/myplaylist" && (
                    <AiOutlinePlus
                      title="Add to My Playlist"
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
  transition: all 0.8s ease-in-out;

  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    z-index: 10;
    box-shadow: 0 0 10px 1px #0a0a0a;
    transition: box-shadow 0.8s ease-in-out;
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
    transition: all 0.8s ease-in-out;

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
        transition: all 0.8s ease-in-out;
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
        transition: color 0.8s ease-in-out;
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
