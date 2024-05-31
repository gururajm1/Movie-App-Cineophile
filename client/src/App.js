import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MoviePage from "./pages/Movies";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Hero from './Hero/Hero'
import TVShows from "./pages/TVShows";
import UserListedMovies from "./pages/UserListedMovies";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/login" element={<Login />} /> */}
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/tv" element={<TVShows />} />
        {/* <Route exact path="/" element={<MoviePage />} /> */}
        <Route exact path="/" element={<Hero />} />
        <Route exact path="/new" element={<Player />} />
        <Route exact path="/mylist" element={<UserListedMovies />} />
        <Route exact path="/dash" element={<Netflix />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
