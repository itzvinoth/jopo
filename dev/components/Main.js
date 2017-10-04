import React from "react";
import { Route, Switch } from 'react-router-dom';

import Cards from "./Cards";
import Home from "../pages/Home";
import Post from "../pages/Post";

const Main = () => (
	<Switch>
		<Route exact path="/" component={Cards}></Route>
		<Route path="/home" component={Home}></Route>
		<Route path="/post" component={Post}></Route>
	</Switch>
);

export default Main