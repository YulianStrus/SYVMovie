import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import Header from "./components/Header";
import "./App.css";

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const API_URL = import.meta.env.VITE_API_URL;
        const BASE_URL = API_URL.replace('/movies', '');

   useEffect(() => {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
            console.log("Fetched movies:", data);
          if (Array.isArray(data)) {
            setMovies(data);
          } else {
            console.error("Unexpected API response", data);
          }
        })
        .catch((err) => console.error("API error:", err));
    }, []);
    
    const toggleFavorite = (id) => {
      const updatedMovies = movies.map((movie) =>
        movie.id === id ? { ...movie, favorite: !movie.favorite } : movie
      );
      setMovies(updatedMovies);
    
      const updatedMovie = updatedMovies.find((movie) => movie.id === id);
    
      axios
        .patch(`${BASE_URL}/movies/${id}`, {
          favorite: updatedMovie.favorite,
        })
        .catch((error) => console.error("Error updating favorite status:", error));
    };

    return (
        <Router>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <div className="container">

                <div className="body">
                    <Routes>
                        <Route path="/" element={<MovieList movies={movies} searchTerm={searchTerm}
                                                            toggleFavorite={toggleFavorite}/>}/>
                        <Route path="/movie/:id" element={<MovieDetail toggleFavorite={toggleFavorite}/>}/>
                        <Route path="/add" element={<AddMovie/>}/>
                        <Route path="/edit/:id" element={<EditMovie/>}/>
                        <Route path="/favorites" element={<MovieList movies={movies.filter(movie => movie.favorite)}
                                                                     searchTerm={searchTerm}
                                                                     toggleFavorite={toggleFavorite}/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
);
}

export default App;
