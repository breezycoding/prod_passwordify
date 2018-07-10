import React from "react";
import { connect } from "react-redux";

import {add_user} from "../redux/actions/users"

class Registration_form extends React.Component{
	state = {
		all_input_is_ampty: false,
		username_is_empty: false,
		password_is_empty: false,
		password_invalid: false,
		username_is_taken: false,
		form_success: false,
		form_disable: false
	}

	set_form_filter = (all_input_is_ampty, username_is_empty, password_is_empty, password_invalid, username_is_taken, form_success) => {
		this.setState({
			all_input_is_ampty: all_input_is_ampty,
			username_is_empty: username_is_empty,
			password_is_empty: password_is_empty,
			password_invalid: password_invalid,
			username_is_taken: username_is_taken,
			form_success: form_success
		});
	}
	
	on_submit = (event) => {
		event.preventDefault();
		if(!event.target.elements.username.value && !event.target.elements.password.value){
			this.set_form_filter(true, false, false, false, false, false);
		}else if(!event.target.elements.username.value){
			this.set_form_filter(false, true, false, false, false, false);
		}else if(!event.target.elements.password.value){
			this.set_form_filter(false, false, true, false, false, false);
		}else if(!/(^\S[A-za-z0-9]{7,})$/.test(event.target.elements.password.value)){
			this.set_form_filter(false, false, false, true, false, false);	 
		}else{
			let username_is_taken = this.props.users.find(user => user.username === event.target.elements.username.value);
			if(username_is_taken){
				this.set_form_filter(false, false, false, false, true, false);
			}else{
				this.set_form_filter(false, false, false, false, false, true);
				this.props.add_user({
					username:event.target.elements.username.value, 
					password:event.target.elements.password.value
				});
				this.setState({form_disable:true});
				this.props.modal_clear_top_remove();
				setTimeout(function() {
					this.setState({form_disable:false});
					this.props.close_modal();
				}.bind(this), 2000);
			}
		}
	}
	
	render(){
		return(
			<div>
				<section id="registration_form">
					<div className="container forms">
						{
							!this.state.form_disable && (
									<form onSubmit={this.on_submit}>
										<input className="form_input" type="text" placeholder="USERNAME" name="username"/>
										<input className="form_input" type="password" placeholder="PASSWORD" name="password" />
										<button>SUBMIT</button>
									</form>		
							)
						}
						
						{this.state.all_input_is_ampty && <p className="form_error">Please fill out all fields</p>}
						{this.state.username_is_empty && <p className="form_error">Please fill out username</p>}
						{this.state.password_is_empty && <p className="form_error">Please fill out password</p>}
						{this.state.password_invalid && <p className="form_error">Password should be at least 8 alphanumeric characters</p>}
						{this.state.username_is_taken && <p className="form_error">Username already taken</p>}
						{this.state.form_success && <p className="form_success success_message_margin_top">Great!!! you may now login</p>}
					</div>	
				</section>
			</div>
		)
	}
}

const map_state_to_props = (state, props) => {
	return {
		users: state.users
	};
};

const map_dispatch_to_props = (dispatch) => ({
	add_user: (users) => dispatch(add_user(users))
});
export default connect(map_state_to_props, map_dispatch_to_props)(Registration_form);