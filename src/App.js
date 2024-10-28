// src/App.js

import React, { useState } from "react";
import Fuse from "fuse.js";
import books from "./data";

function App() {
  const [query, setQuery] = useState("");

  // Configure Fuse.js options
  const fuse = new Fuse(books, {
    keys: ["title", "author"],
    includeScore: true,
    threshold: 0.4, // Adjust for sensitivity
  });

  // Perform the search
  const results = fuse.search(query);
  const bookResults = query
    ? results.map((result) => result.item)
    : books;

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Book Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by title or author..."
        style={{
          width: "100%",
          padding: "0.5rem",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      />
      <ul>
        {bookResults.map((book, index) => (
          <li key={index} style={{ marginBottom: "0.5rem" }}>
            <strong>{book.title}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
