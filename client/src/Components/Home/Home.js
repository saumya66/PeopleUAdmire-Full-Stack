import React from "react";
import "./Home.css";

import { Container, Row, Col, Button } from "react-bootstrap";
import People from "../People/People";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPeople } from "../../actions/people.js";

const Home = () => {
	const [currentId, setCurrentId] = useState(0);
	const [modalShow, setModalShow] = React.useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPeople());
	}, [dispatch, currentId]);

	function handleModal() {
		setModalShow(true);
	}
	return (
		<>
			<Container className="formCont">
				<button class="glow-on-hover" type="button" onClick={handleModal}>
					<p className="postButtonText">Post</p>
				</button>

				<Form show={modalShow} onHide={() => setModalShow(false)} />
			</Container>
			<Row className="mainRow">
				<Col md={9} xs={12} xs={{ order: 1 }}>
					<Container className="peopleCont" fluid>
						<People setCurrentId={setCurrentId} />
					</Container>
				</Col>
				<Col md={3} xs={12} xs={{ order: 2 }}>
					<div className="aboutCont">
						<h2 className="peep">About PeopleUAdmire</h2>
						<p>
							To create one place - Made by people, For People to Find Awesome
							People.
						</p>
						<p>
							Person can be anyone who inspires you or you have learnt things
							from and you believe others should know about!
						</p>
						<p>
							We trust you to be genuine and post positive content. If you find
							something negative do ping us from the links below.
						</p>
						<div class="wrapper">
							<a href="https://twitter.com/saumya4real" target="_blanket">
								<i class="fa fa-4x fa-twitter-square"></i>
							</a>
							<a href="https://github.com/saumya66" target="_blanket">
								<i class="fa fa-4x fa-github-square"></i>
							</a>

							<a href="mailto:futuredrivenme@gmail.com" target="_blanket">
								<i class="fa fa-4x fa-envelope-square"></i>
							</a>
						</div>
					</div>
					<a target="_blank" href="https://github.com/saumya66/PeopleUAdmire">
						<Button className="shareButton" variant="primary">
							<i class="fa fa-github"></i>
							{"  "}Star
						</Button>{" "}
					</a>
					<a
						target="_blank"
						href="https://twitter.com/intent/tweet?text=I%20loved%20this.%20Try%20it%20out ! -%20https://people-u-admire.netlify.app/"
					>
						<Button className="shareButton" variant="primary">
							<i class="fa fa-twitter"></i>
							{"  "}Share
						</Button>{" "}
					</a>
				</Col>
			</Row>
		</>
	);
};

export default Home;
