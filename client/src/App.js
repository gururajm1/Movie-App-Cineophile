import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllMovies from "./pages/AllMovies";
import Landing from "./pages/Landing";
import Player from "./pages/Player";
import Hero from './Hero/Hero'
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Playlist from "./pages/Playlist";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/allmovies" element={<AllMovies />} />
        <Route exact path="/" element={<Hero />} />
        <Route exact path="/myplaylist" element={<Playlist />} />
        <Route exact path="/dash" element={<Landing />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
