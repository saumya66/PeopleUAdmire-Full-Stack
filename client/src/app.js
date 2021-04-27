import React from "react";
import "./app.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";

import Navbar from "./Components/Navbar/Navbar.js";
const App = () => {
	return (
		<div className="app">
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/auth">
						<Auth />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;

// background-color: #f2f2f2;
