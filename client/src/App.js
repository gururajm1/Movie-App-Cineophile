import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Player from "./pages/Player";
import Hero from "./Hero/Hero";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Playlist from "./pages/Playlist";
import SharedPlaylist from "./pages/SharedPlaylist";
import PlaylistDetails from "./pages/PlaylistDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shared-playlist/:uuid" element={<SharedPlaylist />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/" element={<Hero />} />
        <Route path="/myplaylist/:name" element={<PlaylistDetails />} />
        <Route path="/myplaylist" element={<Playlist />} />
        <Route exact path="/dash" element={<Landing />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
