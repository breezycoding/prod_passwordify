import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main_page from "../components/Main_page";
import Dashboard from "../components/Dashboard";
import Edit_user from "../components/Edit_user";
import Help_page from "../components/Help_page";
import Page_not_found from "../components/Page_not_found";
import Header from "../components/Header";


const App_router = () => (
	<BrowserRouter>
		<div>
			<Header />
			<Switch>
				<Route path="/" component={Main_page} exact={true}/>
				<Route path="/edit_user/:id" component={Edit_user} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/help" component={Help_page} />
				<Route component={Page_not_found} />
			</Switch>	
		</div>
	</BrowserRouter>
);

export default App_router;