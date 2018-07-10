import React from "react";
import { connect } from "react-redux";


export const Account_info = (props) => (
	<section id="account_info">
		<div>
			<p>ID: {props.current_user[0].id}</p>
			<p>Username: {props.current_user[0].username}</p>
			<p>Password: {props.current_user[0].password}</p>
			<p>Created at: {props.current_user[0].created_at}</p>
			<p>Updated at: {props.current_user[0].updated_at !== 0  ? (props.current_user[0].updated_at) : "Account haven't updated yet"}</p>
		</div>
	</section>
)

const map_state_to_props = (state, props) => {
	return {
		current_user: state.current_user
	};
};


export default connect(map_state_to_props)(Account_info);