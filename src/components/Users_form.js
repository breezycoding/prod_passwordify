import React from "react";
import moment from 'moment';

export default class Users_form extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			id: props.current_user[0] ? props.current_user[0].id : "",
			username: props.current_user[0] ? props.current_user[0].username : "",
			password: props.current_user[0] ? props.current_user[0].password : "",
			updated_at: moment().format('MMMM Do YYYY, h:mm'),
			all_input_is_ampty: false,
			username_is_empty: false,
			password_is_empty: false,
			password_invalid: false,
			form_success: false,
			form_disable: false
		}
	}
	
	on_username_change = (event) => {
		const username = event.target.value;
		this.setState(()=> ({username}));
	}
	
	on_password_change = (event) => {
		const password = event.target.value;
		this.setState(()=> ({password}));
	}

	set_form_filter = (all_input_is_ampty, username_is_empty, password_is_empty, password_invalid, form_success) => {
		this.setState({
			all_input_is_ampty: all_input_is_ampty,
			username_is_empty: username_is_empty,
			password_is_empty: password_is_empty,
			password_invalid: password_invalid,
			form_success: form_success
		});
	}
	
	on_submit = (event) => {
		event.preventDefault();
		if(!event.target.elements.username.value && !event.target.elements.password.value){
			this.set_form_filter(true, false, false, false, false);
		}else if(!event.target.elements.username.value){
			this.set_form_filter(false, true, false, false, false);
		}else if(!event.target.elements.password.value){
			this.set_form_filter(false, false, true, false, false);
		}else if(!/(^\S[A-za-z0-9]{7,})$/.test(event.target.elements.password.value)){
			this.set_form_filter(false, false, false, true, false);	 
		}else{
			this.set_form_filter(false, false, false, false, true);
			this.props.modal_clear_top();
			setTimeout(function() {	
				this.props.on_submit_edit({
					username: this.state.username,
					password: this.state.password,
					updated_at: this.state.updated_at
				});
				this.props.close_modal();
			}.bind(this), 3000);
		}
	}
	
	render(){
		return(
			<div>
				<section id="users_form">
					<div>
						{
							!this.state.form_success && (
								<form onSubmit={this.on_submit}>
									<input 
										className="form_input" 
										autoFocus 
										type="text" 
										placeholder="USERNAME" 
										name="username" 
										value={this.state.username}
										onChange={this.on_username_change}
									/>
									<input 
										className="form_input" 
										type="text" 
										placeholder="PASSWORD" 
										name="password" 
										value={this.state.password}
										onChange={this.on_password_change}
									/>
									<button>SUBMIT</button>
								</form>	
							)
						}
						
						{this.state.all_input_is_ampty && <p className="form_error">Please fill out all fields</p>}
						{this.state.username_is_empty && <p className="form_error">Please fill out username</p>}
						{this.state.password_is_empty && <p className="form_error">Please fill out password</p>}
						{this.state.password_invalid && <p className="form_error">Password should be at least 8 alphanumeric characters</p>}
						{this.state.form_success && <p className="form_success success_message_margin_top">Password updated!!!</p>}
					</div>
				</section>
			</div>
		);
	};
}