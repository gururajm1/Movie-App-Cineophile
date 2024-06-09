import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Card from "../components/Card";
import logo from "../assets/cinilogo.jpg";

export default function SharedPlaylist() {
  const { uuid } = useParams();
  const [email, setEmail] = useState("");
  const [movies, setMovies] = useState([]);
  const [privateMessage, setPrivateMessage] = useState("");

  const getEmailName = (email) => {
    if (!email) return "";
    const parts = email.split("@");
    return parts[0];
  };

  useEffect(() => {
    const fetchSharedMovies = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/user/public/liked/${uuid}`
        );

        if (data.msg === "Playlist is Private") {
          setPrivateMessage("This playlist is private.");
        } else if (data.email && data.movies) {
          setEmail(data.email);
          setMovies(data.movies);
        } else {
          setPrivateMessage("Playlist not found or user not found.");
        }
      } catch (error) {
        console.error("Error fetching shared movies:", error);
        setPrivateMessage("Error fetching playlist.");
      }
    };

    fetchSharedMovies();
  }, [uuid]);

  return (
    <Container>
      <Helmet>
        <title>{`${getEmailName(email)}'s Playlist - CINEO PHILE`}</title>
        <link rel="icon" type="image/png" href={logo} sizes="16x16" />
      </Helmet>
      <div className="left flex a-center">
        <h1 className="brand flex a-center j-center font-bold text-yellow-400">
          <span className="logo-text text-lg mt-9 ml-10">CINEO PHILE</span>
        </h1>
      </div>
      <div className="content flex column">
        {privateMessage ? (
          <h2 className="text-red-500 text-xl bold flex ml-[650px]">
            {privateMessage}
          </h2>
        ) : email ? (
          <h1>{`${getEmailName(email)}'s Playlist`}</h1>
        ) : null}
        <div className="grid flex">
          {movies && movies.length > 0
            ? movies.map((movie, index) => (
                <Card
                  movieData={movie}
                  index={index}
                  key={movie.id}
                  isLiked={true}
                />
              ))
            : !privateMessage && (
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
  }

  .empty-list-message {
    margin: 20px;
    color: red;
  }
`;
