import "./Navbar.css";
import { Image, Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
const Navbar = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation(); //when the url location changes the useeffect is activated
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	console.log(user);
	useEffect(() => {
		const token = user?.token;
		//JWT
		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);
	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		history.push("/");
		setUser(null);
	};
	return (
		<Container fluid className="headCont">
			<Col md={10}>
				<Link to="/">
					<h1>People U Admire</h1>
				</Link>
			</Col>
			<Col>
				{user ? (
					<>
						<Image
							src={user.result.imageUrl}
							alt={user.result.name}
							height={40}
							roundedCircle
						/>

						{"  "}
						<h5>{user.result.name}</h5>

						<Button variant="primary" onClick={handleLogout}>
							Logout
						</Button>
					</>
				) : (
					<Link to="/auth">
						<Button variant="primary">Sign In</Button>
					</Link>
				)}
			</Col>
		</Container>
	);
};

export default Navbar;
