import React, { useEffect } from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import video from '../assets/trailer.mp4';

export default function Player() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(!location.pathname.includes("/share-playlist/")){
      return;
    }if (!localStorage.getItem("cini-auth")) {
      navigate("/");
    } else if (localStorage.getItem("cini-auth")) {
      navigate("/dash");
    }
  }, [location, navigate]);

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video src={video} autoPlay loop controls muted />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
