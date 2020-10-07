import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";

import { trackPromise } from 'react-promise-tracker';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';

import Spinner from "./spinner";


const unsplash = new Unsplash({
	accessKey: process.env.REACT_APP_API_KEY,
});

export default function SearchPhotos() {
	const [query, setQuery] = useState("");
	const [pics, setPics] = useState([]);

	const searchPhotos = async (e) => {
		e.preventDefault();

    await trackPromise(
      unsplash.search
				.photos(query, "", 20) // keyword, page, per_page
				.then(toJson)
				.then((json) => {
					setPics(json.results);

					if (!json.results.length) {
						handleShow();
					}
				})
    );
	};

	// Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Form onSubmit={searchPhotos} className="search_form">
			  <Row>
			    <Col lg={11} sm={11} xs={10}>
			      <Form.Label htmlFor="query" srOnly></Form.Label>
			      <Form.Control 
			      	id="inlineFormInputName"
			      	type="text"
		          name="query"
		          className="input"
		          placeholder="Search photos"
		          value={query}
		    			onChange={(e) => setQuery(e.target.value)}
			      />
			    </Col>
			    <Col lg={1} sm={1} xs={1}>
			      <Button type="submit">Submit</Button>
			    </Col>
			  </Row>
			</Form>

			<Spinner />
			<Container>
  			<Row>
  				{pics.map((pic) => 
	      		<Col sm={4} lg={3} key={pic.id}>
	      			<img
	      				className="card--image"
	      				alt={pic.alt_description}
	      				src={pic.urls.full}
	      			></img>
	      		</Col>
	      	)}{" "}
  			</Row>
  		</Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>So sorry to say this but:</Modal.Title>
        </Modal.Header>
        <Modal.Body>We used your keyword and could not find anything!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}