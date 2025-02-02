import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/movies/${id}`)
            .then(response => setMovie(response.data))
            .catch(error => console.error("Error fetching movie details:", error));
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:3000/movies/${id}`)
            .then(() => navigate("/"))
            .catch(error => console.error("Error deleting movie:", error));
    };

    if (!movie) return <p>Loading...</p>;

    return (
        <div>
            <h2>{movie.title}</h2>
            <img src={movie.image} alt={movie.title} width="200" />
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Release Date:</strong> {movie.releaseDate}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Actors:</strong> {movie.actors.join(", ")}</p>
            <p><strong>Description:</strong> {movie.description}</p>

            <Link to={`/edit/${id}`}><button>Edit</button></Link>
            <button onClick={handleDelete} style={{ marginLeft: "10px", background: "red", color: "white" }}>Delete</button>
            <br /><br />
            <Link to="/">Back to List</Link>
        </div>
    );
}

export default MovieDetail;
