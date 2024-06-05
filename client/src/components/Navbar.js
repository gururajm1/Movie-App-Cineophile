import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
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
    if (link === "/dash") {
      window.scrollTo(0, 0);
    }
  };

  const handleLogout = () => {
    signOut(firebaseAuth);
    localStorage.removeItem("cini-auth");
    navigate("/");
  };

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <h1 className="brand flex a-center j-center font-bold text-yellow-400">
            <span className="logo-text text-lg">CINEO PHILE</span>
          </h1>
          <ul className="links flex">
            <li className="home">
              <button onClick={() => handleNavigation("/dash")}>Home</button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/myplaylist")}>
                My-Playlist
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
          <div onClick={handleLogout} className="hover:text-red-500 text-md cursor-pointer">
            Logout
          </div>
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

    @media (max-width: 768px) {
      padding: 0 2rem;
      height: 5rem;
    }

    @media (max-width: 480px) {
      padding: 0 1rem;
      height: auto;
    }

    .left {
      gap: 2rem;
      flex: 1;

      .brand {
        .logo-text {
          display: block;

          @media (max-width: 480px) {
            display: none;
          }
        }

        img {
          height: 4rem;

          @media (max-width: 768px) {
            height: 3rem;
          }

          @media (max-width: 480px) {
            height: 2.5rem;
          }
        }
      }

      .links {
        list-style-type: none;
        gap: 2rem;
        display: flex;
        flex-wrap: wrap;

        @media (max-width: 480px) {
          justify-content: center;
        }

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

            @media (max-width: 768px) {
              font-size: 0.9rem;
            }

            @media (max-width: 480px) {
              font-size: 0.8rem;
            }
          }

          &.home {
            @media (max-width: 768px) {
              display: none;
            }
          }
        }
      }
    }

    .right {
      gap: 1rem;
      flex: 1;
      justify-content: flex-end;

      @media (max-width: 768px) {
        gap: 0.5rem;
      }

      @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

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

          @media (max-width: 768px) {
            font-size: 1rem;
          }

          @media (max-width: 480px) {
            font-size: 0.9rem;
          }
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
    background-color: black;
    border: 1px solid white;

    @media (max-width: 768px) {
      gap: 0.2rem;
      padding: 0.1rem;
      padding-left: 0.3rem;
    }

    @media (max-width: 480px) {
      width: 50%;
      margin-top: 1rem;
      padding: 0.1rem;
      padding-left: 0.2rem;
    }

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

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  svg {
    color: #f34242;
    font-size: 1.2rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;
