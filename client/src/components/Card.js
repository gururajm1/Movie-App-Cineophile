import React, { useState, useEffect, useRef } from "react";
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
import { BiCheckCircle } from "react-icons/bi";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../dependencies/firebaseConfig";
import { useDispatch } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import { removeMovieFromLiked } from "../store";
import video from "../assets/trailer.mp4";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

const Card = React.memo(
  ({ index, movieData, isLiked = false, onMovieDelete }) => {
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentUserEmail, setCurrentUserEmail] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const open = Boolean(anchorEl);

    useEffect(() => {
      onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
          setEmail(currentUser.email);
          setCurrentUserEmail(currentUser.email);
        }
      });
    }, []);

    useEffect(() => {
      setShowDeleteIcon(location.pathname.startsWith("/myplaylist"));
    }, [location.pathname]);

    useEffect(() => {
      if (currentUserEmail) {
        fetchPlaylists();
      }
    }, [currentUserEmail]);

    useEffect(() => {
      const closeDropdown = () => {
        if (dropdownOpen) {
          handleCloseMenu();
        }
      };

      const handleScroll = () => {
        closeDropdown();
      };

      document.body.addEventListener("click", closeDropdown);
      window.addEventListener("scroll", handleScroll);

      return () => {
        document.body.removeEventListener("click", closeDropdown);
        window.removeEventListener("scroll", handleScroll);
      };
    }, [dropdownOpen]);


    const fetchPlaylists = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/playlists/${currentUserEmail}`
        );
        if (response.data) {
          setPlaylists(response.data.playlists);
        }
      } catch (error) {
        console.error("Error fetching playlists: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    const addToList = async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/user//add-movie-to-playlist",
          {
            email,
            data: movieData,
          }
        );
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

    const handleRemoveFromLiked = async () => {
      try {
        const pathSegments = location.pathname.split("/");
        const playlistName = decodeURIComponent(pathSegments[2]);
        await axios.post(
          "http://localhost:5000/api/user/remove-movie-from-playlist",
          {
            email: currentUserEmail,
            playlistName,
            movieId: movieData.id,
          }
        );
        setLiked(false);
        if (onMovieDelete) {
          onMovieDelete(movieData.id);
        }
      } catch (error) {
        console.error("Error removing movie from playlist: ", error);
      }
    };

    const handleIconClick = () => {
      if (location.pathname.startsWith("/myplaylist")) {
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

    const handleAddToPlaylist = async (playlistName) => {
      setSelectedPlaylist(playlistName);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/add-movie-to-playlist",
          {
            email: currentUserEmail,
            playlistName,
            movieData,
          }
        );
        if (response.data.msg === "Movie already exists in the playlist.") {
          alert("Movie already exists in the playlist.");
        } else {
          alert("Movie added to Playlist");
        }

        handleCloseMenu();
      } catch (error) {
        console.error("Error adding movie to playlist: ", error);
      }
    };

    const handleOpenMenu = (event) => {
      if (playlists.length === 0) {
        alert("No Playlist Found. Please Go to My Playlist to create one.");
        return;
      }
      setAnchorEl(event.currentTarget);
      setDropdownOpen(true);
    };

    const handleCloseMenu = () => {
      console.log("Closing dropdown");
      setAnchorEl(null);
      setIsHovered(false);
      setDropdownOpen(false);
    };


    const handleMouseLeave = () => {
      if (!dropdownOpen) {
        handleCloseMenu();
      }
    };

    const handleDropdownClick = (event) => {
      event.stopPropagation();
    };

    return (
      <Container
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
          alt="card"
          onClick={handlePlayClick}
        />

        {isHovered && (
          <div
            className="hover"
            ref={dropdownRef}
            onClick={handleDropdownClick}
          >
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
                    <IoPlayCircleOutline
                      title="Play"
                      onClick={handlePlayClick}
                    />
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
                  {showDeleteIcon ? (
                    <AiOutlineDelete
                      title="Remove from List"
                      onClick={handleRemoveFromLiked}
                      style={{ color: "red" }}
                    />
                  ) : liked ? (
                    <BiCheckCircle
                      title="Added to List"
                      style={{ color: "green" }}
                    />
                  ) : (
                    <div>
                      {selectedPlaylist === null ? (
                        <AiOutlinePlus
                          onClick={handleOpenMenu}
                          onMouseEnter={() => setIsHovered(true)}
                          title="Add to Playlist"
                          color="white"
                        />
                      ) : (
                        <BiCheckCircle
                          title="Added to Playlist"
                          style={{ color: "green" }}
                        />
                      )}
                    </div>
                  )}
                  <div className="relative">
                    {open && (
                      <div
                        className="absolute left-[-17px] mt-6 w-56 origin-top-right bg-gray-800 rounded-md shadow-lg z-[999px]"
                        onClick={handleDropdownClick}
                      >
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          {isLoading ? (
                            <MenuItem disabled>Loading...</MenuItem>
                          ) : (
                            playlists.map((playlist) => (
                              <MenuItem
                                key={playlist._id}
                                onClick={() =>
                                  handleAddToPlaylist(playlist.name)
                                }
                                style={{ color: "white" }}
                              >
                                {playlist.name}
                              </MenuItem>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
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
  }
);

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
    z-index: 9999;
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

export default Card;
