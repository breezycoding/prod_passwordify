import React from "react";
import { connect } from "react-redux";

import { current_user } from "../redux/actions/current_user"



class Modal_login extends React.Component{
	state = {
		username_is_empty: false,
		username_cannot_find: false,
		username_success: false,
		password_is_empty: false,
		password_invalid: false,
		password_doesnt_match: false,
		form_success: false,
		current_user: [],
		disable_form: false
	}

	set_form_filter = (username_is_empty, username_cannot_find, username_success, password_is_empty, password_invalid, password_doesnt_match, form_success) => {
		this.setState({
			username_is_empty: username_is_empty,
			username_cannot_find: username_cannot_find,
			username_success: username_success,
			password_is_empty: password_is_empty,
			password_invalid: password_invalid,
			password_doesnt_match: password_doesnt_match,
			form_success: form_success
		});
	}
	
	on_submit_username = (event) => {
		event.preventDefault();
		if(!event.target.elements.username.value){
			this.set_form_filter(true, false, false, false, false, false, false);
		}else if(this.props.users.find(user => user.username === event.target.elements.username.value) === undefined){
			this.set_form_filter(false, true, false, false, false, false, false);
		}else{
			let current = this.props.users.find(user => user.username === event.target.elements.username.value);
			this.set_form_filter(false, false, true, false, false, false, false);
			setTimeout(function() {
				this.set_form_filter(false, false, false, false, false, false, false);	
			}.bind(this), 2000);
			this.setState({
				current_user: [current]
			});
		}
	}
	
	on_submit_password = (event) => {
		event.preventDefault();
		if(!event.target.elements.password.value){
			this.set_form_filter(false, false, false, true, false, false, false);
		}else if(!/(^\S[A-za-z0-9]{7,})$/.test(event.target.elements.password.value)){
			this.set_form_filter(false, false, false, false, true, false, false);	 
		}else{
			if(this.state.current_user[0].password === event.target.elements.password.value){
				this.props.modal_clear_top_remove();
				this.props.current_user({
					id: this.state.current_user[0].id, 
					username: this.state.current_user[0].username, 
					password: this.state.current_user[0].password, 
					created_at: this.state.current_user[0].created_at,
					updated_at: this.state.current_user[0].updated_at !== 0 ? this.state.current_user[0].updated_at : 0
				});
				this.set_form_filter(false, false, false, false, false, false, true);
				this.setState({disable_form:true});
				setTimeout(function() {
					this.setState({disable_form:false});
					this.props.history.push("/dashboard");
				}.bind(this), 2000);
			}else{
				this.set_form_filter(false, false, false, false, false, true, false);
			}
		}
	}

	
	render(){
		return(
			<div>
				<section id="modal_login">
					<div className="container forms">
						{
							this.state.current_user.length < 1 && 
										(
											<form onSubmit={this.on_submit_username}>
												<input className="form_input" type="text" placeholder="USERNAME" name="username"/>
												<button>SUBMIT</button>
											</form>			
										)
						}
						{
							this.state.current_user.length > 0 && 
										(
											<form className={(this.state.disable_form ? "form_remove" : "none")} onSubmit={this.on_submit_password}>
												<input className="form_input" type="password" placeholder="PASSWORD" name="password"/>
												<button>SUBMIT</button>
											</form>
										)
						}
						
						{this.state.username_is_empty && <p className="form_error">Please fill out username</p>}
						{this.state.username_cannot_find && <p className="form_error">Cannot find such username</p>}
						{this.state.username_success && <p className="form_success">Great please fill out password</p>}
						{this.state.password_is_empty && <p className="form_error">Please fill out password</p>}
						{this.state.password_invalid && <p className="form_error">Password should be at least 8 alphanumeric characters</p>}
						{this.state.password_doesnt_match && <p className="form_error">Password doesnt match given username</p>}
						{this.state.form_success && <p className="form_success success_message_margin_top">Great your now logged in!</p>}
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
	current_user: (user) => dispatch(current_user(user))
});
export default connect(map_state_to_props, map_dispatch_to_props)(Modal_login);