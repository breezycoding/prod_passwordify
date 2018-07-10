import React from "react";
import { connect } from "react-redux";

import Password_list_item from "./Password_list_item";

export class Password_list extends React.Component {
	
	has_password = () => {
		let has_user_id;
		this.props.password.find((item) => {
			if(item.user_id === this.props.current_user[0].id){
				has_user_id = true;
			}
		});
		return has_user_id;
	}
	
	render(){
		return(
			<section id="password_list">
				{!this.has_password() && <p>No password saved yet</p>}
				{
					this.props.password.map((pwd) => {
						if(pwd.user_id === this.props.current_user[0].id){
							return(
								<Password_list_item
									key={pwd.id}
									{...pwd}
								/>
							);
						}
					})
				}
			</section>

		);
	}
}

const map_state_to_props = (state, props) => {
	return {
		password: state.password,
		current_user: state.current_user
	};
};
export default connect(map_state_to_props)(Password_list);