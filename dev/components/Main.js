import React from "react";
import { Route, Switch } from 'react-router-dom';

import Cards from "./Cards";
import Home from "../pages/Home";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import Post from "../pages/Post";

const Main = () => (
	<Switch>
		<Route exact path="/" component={Cards}></Route>
		<Route path="/home" component={Home}></Route>
		<Route path="/signin" component={LoginForm}></Route>
		<Route path="/signup" component={RegisterForm}></Route>
		<Route path="/post" component={Post}></Route>
	</Switch>
);

export default Main