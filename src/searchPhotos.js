import React, { useState } from "react";

export default function SearchPhotos() {
	const [query, setQuery] = useState("");

  return (
    <>
    	<form className="form"> 
        <label className="label" htmlFor="query"> 
          {" "}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "dog" or "apple"`}
          value={query}
    			onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
    </>
  );
}