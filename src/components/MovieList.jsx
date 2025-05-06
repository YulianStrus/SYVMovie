function MovieList({ movies, searchTerm, toggleFavorite }) {
  return (
    <div className="movie-list">
      {movies
        .filter(
          (movie) =>
            movie.title &&
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.image} alt={movie.title} width="100" />
            <button className="favorite" onClick={() => toggleFavorite(movie.id)}>
              {movie.favorite ? "★" : "☆"}
            </button>
            <h3>{movie.title}</h3>
            <p>Rating: {movie.rating}</p>
            <p>Release Date: <br /> {movie.releaseDate}</p>

            <Link to={`/movie/${movie.id}`}>View Details</Link>
          </div>
        ))}
      <Link to="/add" className="add-movie-button">
        <div className="movie-card add-movie">+</div>
      </Link>
    </div>
  );
}
