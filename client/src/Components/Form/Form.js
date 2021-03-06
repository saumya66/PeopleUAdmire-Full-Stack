import { Modal, Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Person from "../Person/Person";
import { useDispatch, useSelector } from "react-redux";
import "./Form.css";
import FileBase from "react-file-base64";
import { useState, useEffect } from "react";
import { createPerson } from "../../actions/people";

const user = JSON.parse(localStorage.getItem("profile"));

const People = (props) => {
	const [personData, setPersonData] = useState({
		name: "",
		inspire: "",

		file: "",
		link: "",
	});
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(createPerson({ ...personData, name: user?.result.name }));
	};
	if (!user?.result?.name) {
		return <h4>Sign In to create Post </h4>;
	}

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Thanks for Sharing !
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Form className="form" onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Person U Admire</Form.Label>
							<Form.Control
								placeholder="Name"
								name="name"
								value={personData.name}
								onChange={(e) =>
									setPersonData({ ...personData, name: e.target.value })
								}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>What Inspires You </Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="About the Person in less that 20 words"
								name="inspire"
								value={personData.inspire}
								onChange={(e) =>
									setPersonData({ ...personData, inspire: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Label>Link to Person</Form.Label>
						<Form.Control
							as="textarea"
							rows={1}
							placeholder="For someone to reach/know more about the person.."
							name="link"
							value={personData.link}
							onChange={(e) =>
								setPersonData({ ...personData, link: e.target.value })
							}
						/>

						<div>
							<FileBase
								type="file"
								multiple={false}
								onDone={({ base64 }) =>
									setPersonData({ ...personData, file: base64 })
								}
							/>
						</div>
						{personData.name !== "" &&
						personData.link !== "" &&
						personData.file !== "" &&
						personData.inspire !== "" ? (
							<Button variant="primary" type="submit" onClick={props.onHide}>
								Submit
							</Button>
						) : (
							<>
								<Button
									variant="primary"
									type="submit"
									onClick={props.onHide}
									disabled
								>
									Submit
								</Button>
								<p>*Enabled when whole form is filled </p>
							</>
						)}
					</Form>
				</Container>
			</Modal.Body>
		</Modal>
	);
};
export default People;
