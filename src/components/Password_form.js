import React from "react";
import ReactTooltip from 'react-tooltip'

import moment from 'moment';

export default class Password_form extends React.Component{
	
	state = {
		id: this.props.id ? this.props.id : "", 
		user_id: this.props.user_id ? this.props.user_id : "",
		account: this.props.account ? this.props.account : "",
		description: this.props.description ? this.props.description : "", 
		password: this.props.password ? this.props.password : "",
		hide_password : this.props.hide_password ? this.props.hide_password : "",
		updated_at: moment().format('MMMM Do YYYY, h:mm'),
		hide_password_checkbox: false, 
		edit_hide_password: false, 
		edit_hide_password_message: false,
		hide_password_is_empty: false, 
		all_is_empty: false, 
		account_is_empty: false,
		password_is_empty: false,
		form_success: false,
		edit_hide_password_txt: "",
		edit_success: false
	}

	on_account_change = (event) => {
		const account = event.target.value;
		this.setState(()=> ({account}));
	}
	
	on_description_change = (event) => {
		const description = event.target.value;
		this.setState(()=> ({description}));
	}
	
	on_password_change = (event) => {
		const password = event.target.value;
		this.setState(()=> ({password}));
	}
	
	on_hide_password_change = (event) => {
		const hide_password = event.target.value;
		this.setState(()=> ({hide_password}));
	}	
	
	on_edit_hide_password_txt_change =(event) => {
		const edit_hide_password_txt = event.target.value;
		this.setState(()=> ({edit_hide_password_txt}));
	}

	filter_form = (all_is_empty, account_is_empty, password_is_empty, hide_password_is_empty, form_success) => {
		this.setState({
			all_is_empty: all_is_empty,
			account_is_empty: account_is_empty, 
			password_is_empty: password_is_empty,
			hide_password_is_empty: hide_password_is_empty,
			form_success: form_success
		});
	}

	check_checkbox = () => {
		ReactTooltip.show();
		if(document.querySelector("#id_checkbox").checked){
			this.setState({hide_password_checkbox:true});
		}else{
			this.setState({hide_password_checkbox:false});
		}
	}
	
	password_info = (account, description, hide_password, password, updated_at) => {
		return{ account, description, hide_password, password, updated_at }
	}	
	
	account_htm = () => (
		<input 
			className="form_input" 
			type="text" 
			placeholder="ACCOUNT" 
			name="account" value={this.state.account} 
			onChange={this.on_account_change}
		/>
	)

	description_htm = () => (
		<input 
			className="form_input" 
			type="text" 
			placeholder="DESCRIPTION" 
			name="description"
			value={this.state.description}
			onChange={this.on_description_change}
		/>
	)

	password_htm = () => (
		<input 
			className="form_input" 
			type="text" 
			placeholder="PASSWORD" 
			name="password"
			value={this.state.password}
			onChange={this.on_password_change}
		/>  
	)

	checkbox_hide_password = () => {
		return(
			<div className="checkbox_container">
				{ !this.state.id &&<input onClick={this.check_checkbox} className="form_checkbox" type="checkbox" id="id_checkbox" name="form_checkbox" />}
				{
					(() => {
							if(!this.state.id){
								if(this.state.hide_password_checkbox){
								   return(
										<input 
											className="form_input" 
											type="text" 
											placeholder="TYPE KEYWORD" 
											name="hide_password" 
											value={this.state.hide_password}
											onChange={this.on_hide_password_change}
										/>
									);
								}else{
								   return(
										<label data-for="checkbox_tooltip" data-tip="" className="label_checkbox" type="checkbox_hide_password">PASSWORD KEYWORD?</label>
									);
								}
							}else{
								 return(
									<input 
										className="form_input" 
										type="text" 
										placeholder="TYPE KEYWORD" 
										name="hide_password" 
										value={this.state.hide_password}
										onChange={this.on_hide_password_change}
									/>
								);
							}
					})()
				}
			</div>
		);
	}
	
	on_submit_edit_hide_password = (event) => {
		event.preventDefault();
		if(event.target.elements.edit_hide_password_txt.value === this.props.hide_password){
		    this.setState({edit_hide_password:true});
		}else{
			this.setState({edit_hide_password_message:true});
			setTimeout(function() {	
				this.setState({edit_hide_password_message:false});
			}.bind(this), 1500);
		}
	}
	
	on_submit_add = (event) => {
		event.preventDefault();
		if(!event.target.elements.account.value && !event.target.elements.description.value && !event.target.elements.password.value){
			this.filter_form(true, false, false, false, false);
		}else if(!event.target.elements.account.value){
			this.filter_form(false, true, false, false, false);
		}else if(!event.target.elements.password.value){
			this.filter_form(false, false, true, false, false); 
		}else{
			if(!document.querySelector("#id_checkbox").checked){
				this.filter_form(false, false, false, false, true); 
				this.props.add_password_form(
					this.password_info(
						event.target.elements.account.value, 
						event.target.elements.description.value, 
						"", 
						event.target.elements.password.value
					)
				);
				setTimeout(function() {	
					this.props.close_modal();
				}.bind(this), 2000);
			}else if(document.querySelector("#id_checkbox").checked && !event.target.elements.hide_password.value){
				this.filter_form(false, false, false, true, false); 
			}else{
				this.filter_form(false, false, false, false, true); 
				this.props.add_password_form(
					this.password_info(
						event.target.elements.account.value, 
						event.target.elements.description.value, 
						event.target.elements.hide_password.value, 
						event.target.elements.password.value
					)
				);
				setTimeout(function() {	
					this.props.close_modal();
				}.bind(this), 2000);
			}
		}
	}
	
	on_submit_edit = (event) => {
		event.preventDefault();
		if(!event.target.elements.account.value && !event.target.elements.description.value && !event.target.elements.password.value){
			this.filter_form(true, false, false, false, false);
		}else if(!event.target.elements.account.value){
			this.filter_form(false, true, false, false, false);
		}else if(!event.target.elements.password.value){
			this.filter_form(false, false, true, false, false); 
		}else{
			if(this.state.hide_password === ""){
				this.setState({edit_success:true});
				this.filter_form(false, false, false, false, false); 
				this.props.modal_clear_top();
				this.props.edit_password_form(
					this.password_info(
						event.target.elements.account.value, 
						event.target.elements.description.value, 
						"", 
						event.target.elements.password.value,
						this.state.updated_at
					)
				);
				setTimeout(function() {
					this.props.close_modal();
				}.bind(this), 2000);
			}else{
				this.filter_form(false, false, false, false, false); 
				this.setState({edit_success:true});
				this.props.modal_clear_top();
				this.props.edit_password_form(
					this.password_info(
						event.target.elements.account.value, 
						event.target.elements.description.value, 
						event.target.elements.hide_password.value, 
						event.target.elements.password.value,
						this.state.updated_at
					)
				);
				setTimeout(function() {	
					this.props.close_modal();
				}.bind(this), 2000);
			}
		}
		
	}
	
	render(){
		return(
			<div>
				<ReactTooltip 
				id={"checkbox_tooltip" || "checkbox_tooltip_edit"}
				data-multiline="true" 
				place="right" 
				type="info" 
				effect="float"
				>
					Set a keyword to hide password 
					<br /> Once keyword is entered 
					<br />password will be revealed
				</ ReactTooltip>
				<section id="password_form">
					{
						(() => {
							if(!this.state.id && !this.state.form_success){
								return(
									<form onSubmit={this.on_submit_add}>
										{this.account_htm()}
										{this.description_htm()}
										{this.checkbox_hide_password()}
										{this.password_htm()}
										<button>SUBMIT</button>
									</form>
								);
							}else if(this.state.id && !this.state.form_success){
								if(this.state.hide_password){
									if(!this.state.edit_hide_password){
										return(
											<form className="label_edit_hide_password" onSubmit={this.on_submit_edit_hide_password}>
												<label type="on_submit_edit_hide_password">Password is encrypted Please type keyword?</label>
												<input 
													className="form_input" 
													type="text" 
													placeholder="TYPE KEYWORD" 
													name="edit_hide_password_txt" 
													value={this.state.edit_hide_password_txt} 
													onChange={this.on_edit_hide_password_txt_change}
												/>
												<button>SUBMIT</button>
											</form>
										);
									}else{
										if(!this.state.edit_success){
											return(
												<form onSubmit={this.on_submit_edit}>
													{this.account_htm()}
													{this.description_htm()}
													{this.checkbox_hide_password()}
													{this.password_htm()}
													<button>SUBMIT</button>
												</form>
											);
										}
									}
								}else{
									if(!this.state.edit_success){
										return(
											<form onSubmit={this.on_submit_edit}>
												{this.account_htm()}
												{this.description_htm()}
												{this.password_htm()}
												<button>SUBMIT</button>
											</form>
										);
									}
								}
							}
						})()
					}
					{this.state.all_is_empty && <p className="form_error">Please fill out the form</p>}
					{this.state.account_is_empty && <p className="form_error">Please fill out account name</p>}
					{this.state.password_is_empty && <p className="form_error">Please fill out password</p>}
					{this.state.hide_password_is_empty && <p className="form_error">Please fill out password keyword</p>}
					{this.state.edit_hide_password_message && <p className="form_error">Incorrect keyword</p>}
					{this.state.form_success && <p className="form_success form_success_margin_top">Great! password is added</p>}
					{this.state.edit_success && <p className="form_success form_success_margin_top">Password updated</p>}
				</section>
			</div>
		);
	}
}