import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import App_router from "./routers/App_router";
import configure_store from "./redux/store/configure_store";
import {add_user} from "./redux/actions/users";
import "./styles/styles.scss"
import "normalize.css/normalize.css"


const store = configure_store();
const jsx = (
	<Provider store={store}>
		<App_router />
	</Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));

