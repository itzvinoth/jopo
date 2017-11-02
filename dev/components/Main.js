import React from "react";
import { Route, Switch } from 'react-router-dom';


import Cards from "./Cards";
import LayoutPage from "./LayoutPage";
import Home from "../pages/Home";
import LoginForm from "../pages/LoginForm";
import Post from "../pages/Post";

const Main = () => (
	<Switch>
		<Route exact path="/" component={LayoutPage}></Route>
		<Route path="/home" component={Home}></Route>
		<Route path="/signin" component={LoginForm}></Route>
		<Route path="/post" component={Post}></Route>
	</Switch>
);

export default Main