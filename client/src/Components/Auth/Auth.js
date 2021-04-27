import React from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import Formcomp from "./FormComp";
import "./Auth.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth.js";

const initialData = {
	firstname: "",
	lastname: "",
	email: "",
	password: "",
	confirmpassword: "",
};

const Auth = () => {
	const [formData, setFormData] = useState(initialData);

	const dispatch = useDispatch();
	const history = useHistory();
	const clientId =
		"1058989024683-1alkubcjnh44f2g8ghm65887srko7t82.apps.googleusercontent.com";

	const handleSuccess = async (res) => {
		console.log("Login Successful");
		const result = res?.profileObj; //?. is optional chaining, by using this we dont get and error even if the the res has nothing
		const token = res?.token;
		try {
			dispatch({ type: "AUTH", payload: { result, token } });
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};
	const handleFailure = (error) => {
		console.log("Login Unsuccessful !", error);
	};

	const [isSignUp, setIsSignUp] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	const handlePassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
		console.log(showPassword);
	};
	const switchMode = () => setIsSignUp((prevIsSignUp) => !prevIsSignUp);

	const handleSubmit = (e) => {
		if (signUp) {
			e.preventDefault();
			dispatch(signUp(formData, history));
			console.log(formData);
		} else {
			e.preventDefault();
			dispatch(signIn(formData, history));
			console.log(formData);
		}
	};
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<Row className="auth">
			<div className="formCont">
				<Form onSubmit={handleSubmit}>
					{isSignUp && (
						<Form.Row>
							<Col>
								<Formcomp
									title="First Name"
									name="firstname"
									handleChange={handleChange}
								/>
							</Col>
							<Col>
								<Formcomp
									title="Last Name"
									name="lastname"
									handleChange={handleChange}
								/>
							</Col>
						</Form.Row>
					)}

					<Formcomp title="Email" name="email" handleChange={handleChange} />
					<Formcomp
						title="Password"
						name="password"
						handleChange={handleChange}
						handlePassword={handlePassword}
						type={showPassword ? "text" : "password"}
					/>
					{isSignUp && (
						<Formcomp
							title="Confirm Password"
							name="comfirmpassword"
							handleChange={handleChange}
						/>
					)}

					<GoogleLogin
						className="googleButton"
						clientId={clientId}
						onSuccess={handleSuccess}
						onFailure={handleFailure}
						buttonText="SignIn"
						cookiePolicy={"single_host_origin"}
					/>

					<Button type="submit" variant="primary">
						{isSignUp ? "Sign Up" : "Sign In"}
					</Button>
					{isSignUp ? (
						<h6>
							Already have an account ?{" "}
							<a onClick={switchMode} style={{ color: "blue" }}>
								Sign In
							</a>
						</h6>
					) : (
						<h6>
							Don't have an account ?{" "}
							<a onClick={switchMode} style={{ color: "blue" }}>
								Sign Up
							</a>
						</h6>
					)}
				</Form>
			</div>
		</Row>
	);
};

export default Auth;
