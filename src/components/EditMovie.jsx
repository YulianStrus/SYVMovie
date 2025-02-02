import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditMovie() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [rating, setRating] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [genre, setGenre] = useState("");
    const [director, setDirector] = useState("");
    const [actors, setActors] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/movies/${id}`)
            .then(response => {
                const movie = response.data;
                setTitle(movie.title);
                setImage(movie.image);
                setRating(movie.rating);
                setReleaseDate(movie.releaseDate);
                setGenre(movie.genre);
                setDirector(movie.director);
                setActors(movie.actors.join(", "));
                setDescription(movie.description);
            })
            .catch(error => console.error("Error fetching movie details:", error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMovie = {
            title,
            image,
            rating,
            releaseDate,
            genre,
            director,
            actors: actors.split(",").map(actor => actor.trim()),
            description
        };

        axios.put(`http://localhost:3000/movies/${id}`, updatedMovie)
            .then(() => navigate("/"))
            .catch(error => console.error("Error updating movie:", error));
    };

    return (
        <div className="editMovie">
            <h2>Edit Movie</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label>Image URL:</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />

                <label>Rating:</label>
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />

                <label>Release Date:</label>
                <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />

                <label>Genre:</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />

                <label>Director:</label>
                <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} required />

                <label>Actors (comma-separated):</label>
                <input type="text" value={actors} onChange={(e) => setActors(e.target.value)} required />

                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

                <button type="submit">Update Movie</button>
            </form>
        </div>
    );
}

export default EditMovie;
