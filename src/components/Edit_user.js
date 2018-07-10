import React from "react";
import { connect } from "react-redux";

import { edit_current_user } from "../redux/actions/current_user";
import { edit_user } from "../redux/actions/users";

import Users_form from "./Users_form";


export class Edit_user extends React.Component{
	
	on_submit_edit = (user) => {
		this.props.edit_current_user(this.props.current_user[0].id, user);
		this.props.edit_user(this.props.current_user[0].id, user);
	}
	
	
	render(){
		return(
			<div>
				<section id="edit_user">
					<Users_form 
						current_user={this.props.current_user} 
						modal_clear_top={this.props.modal_clear_top}
						close_modal={this.props.close_modal}
						on_submit_edit={this.on_submit_edit}
					/>
				</section>
			</div>
		)
	}
}

const map_state_to_props = (state, props) => {
	return {
		current_user: state.current_user,
		users: state.users
	};
};

const map_dispatch_to_props = (dispatch) => ({
	edit_current_user:(id, user) => dispatch(edit_current_user(id, user)),
	edit_user:(id, user) => dispatch(edit_user(id, user))
});
export default connect(map_state_to_props, map_dispatch_to_props)(Edit_user);