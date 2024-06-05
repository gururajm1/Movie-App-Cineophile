import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function SharedPlaylist() {
  const { email } = useParams();
  const [movies, setMovies] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchSharedMovies = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
        if (data.movies) {
          setMovies(data.movies);
        }
      } catch (error) {
        console.error("Error fetching shared movies:", error);
      }
    };
    fetchSharedMovies();
  }, [email]);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }, []);

  return (
    <Container>
      <div className="left flex a-center">
        <h1 className="brand flex a-center j-center font-bold text-yellow-400">
          <span className="logo-text text-lg mt-9 ml-10">CINEO PHILE</span>
        </h1>
      </div>
      <div className="content flex column">
        {movies && movies.length > 0 ? <h1>{`${email}'s Playlist`}</h1> : ""}
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
              The Playlist is Empty
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
  }

  .empty-list-message {
    margin: 20px;
    color: red;
  }
`;
