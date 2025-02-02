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

    useEffect(() => {
        axios.get("http://localhost:3000/movies")
            .then(response => setMovies(response.data))
            .catch(error => console.error("Error fetching movies:", error));
    }, []);

    const toggleFavorite = (id) => {
        const updatedMovies = movies.map(movie =>
            movie.id === id ? { ...movie, favorite: !movie.favorite } : movie
        );
        setMovies(updatedMovies);

        const updatedMovie = updatedMovies.find(movie => movie.id === id);
        axios.patch(`http://localhost:3000/movies/${id}`, { favorite: updatedMovie.favorite })
            .catch(error => console.error("Error updating favorite status:", error));
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
