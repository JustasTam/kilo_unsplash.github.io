import React from 'react';
import './App.css';
import SearchPhotos from "./searchPhotos";
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div>
      <Container>
        <h1 className="title">Unsplash API search</h1>
        <SearchPhotos />
      </Container>
    </div>
  );
}

export default App;
