import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { firebaseAuth } from "../dependencies/firebaseConfig";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { searchMovies, fetchMovies } from "../store/index";

export default function Navbar({ isScrolled }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    if (query) {
      dispatch(searchMovies(query));
      window.scrollTo(0, 650);
    } else {
      dispatch(fetchMovies({ type: "all" }));
      window.scrollTo(0, 0);
    }
  };

  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <h1 className="brand flex a-center j-center font-bold text-orange-400">
            CINI MOVIES
          </h1>
          <ul className="links flex">
            <li>
              <button onClick={() => handleNavigation("/dash")}>Home</button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/allmovies")}>
                All-Movies
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/myplaylist")}>
                My-Playist
              </button>
            </li>
          </ul>
        </div>
        <div className="right flex a-center">
          <div className="search">
            <button>
              <FaSearch />
            </button>
            <input type="text" placeholder="Search" onChange={handleSearch} />
          </div>
          <button
            onClick={() => signOut(firebaseAuth)}
            className="text-red-500 font-semibold text-lg underline decoration-gray-500"
          >
            Logout
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          button {
            background: transparent;
            border: none;
            cursor: pointer;
            color: white;
            font-size: 1rem;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
    }
  }

  .search {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    padding: 0.2rem;
    padding-left: 0.5rem;
    background-color: black; /* Set background color */
    border: 1px solid white; /* Set border color */
    button {
      background-color: transparent;
      border: none;
      &:focus {
        outline: none;
      }
      svg {
        color: white;
        font-size: 1.2rem;
      }
    }
    input {
      background-color: transparent;
      border: none;
      color: white;
      &:focus {
        outline: none;
      }
    }
  }
`;
