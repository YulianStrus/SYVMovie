import React from "react";
import { Link } from "react-router-dom";

function Header({ searchTerm, setSearchTerm }) {
    return (
        <header className="header">
            <div className="menu">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/favorites">Favorites</Link>
                </nav>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </header>
    );
}

export default Header;
