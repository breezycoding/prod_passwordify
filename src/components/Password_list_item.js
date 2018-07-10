import React from "react";
import ReactTooltip from 'react-tooltip';
import { connect } from "react-redux";
import Modal from "react-modal";

import { edit_password, remove_password } from "../redux/actions/password";
import Password_form from "./Password_form";

export class Password_list_item extends React.Component{
	state = {
		hide_password: false,
		modalIsOpen: false,
		alert_thank_you: false,
		modal_clear_top: false
	}

	open_modal = () => {
		this.setState({modalIsOpen: true});
	}

	close_modal = () => {
		this.setState({
			modalIsOpen: false,
			modal_clear_top: false
		});
	}

	show_password = (event) => {
		event.preventDefault();
		if(event.target.elements.hide_password.value === this.props.hide_password){
			this.setState({hide_password:true});
		}else
			alert("Incorrect keyword, please try again");
	}
	
	modal_clear_top = () => {
		this.setState({modal_clear_top:true});
	}
	
	remove_password = (event) => {
		event.preventDefault();
		if(confirm("are you sure want to delete this password")){
			this.props.remove_password({id:this.props.id});
		}
	}
	
	edit_password = (event) => {
		event.preventDefault();
		this.setState({
			on_edit: true, 
			modalIsOpen: true
		});
	}
	
	edit_password_form = (password_data) => {
		this.props.edit_password(this.props.id, password_data);
	}
	
	render(){
		return(
			<div className="password_list_item">
				<div>Account: {this.props.account}</div>
				<div>Description: 
				{
					this.props.description === "" ? (" N/A") : (" " + this.props.description)
				}
				</div>
				{
					this.props.hide_password !== "" ? (
						<div className={(this.state.hide_password ? ("form_disable") : (""))}>
							<form onSubmit={this.show_password}>
								<label data-for="show_password_tooltip" data-tip="" className="label_checkbox" type="checkbox_hide_password">?</label>
								<input className="form_input" type="text" placeholder="KEYWORD" name="hide_password" /> 
							</form>
						</div>
					) : ""
				}
				<div>{this.state.hide_password || this.props.hide_password === "" ? ("password: "+this.props.password) : ("")}</div>
				<div>Created : {this.props.created_at}</div>
				<div>Updated : {this.props.updated_at === 0 ? (" N/A") : (" " + this.props.updated_at)}</div>
				<div>
					<a className="password_icons form_error" onClick={this.remove_password} href="javascript:void(0);">&#10540;</a>
					<a className="password_icons form_success" onClick={this.edit_password} href="javascript:void(0);">&#9998;</a>
				</div>
				<ReactTooltip 
					id="show_password_tooltip"
					data-multiline="true" 
					place="right" 
					type="info" 
					effect="float">
						this password is encrypted  
						<br /> please enter correct keyword
						<br /> to reveal password
				</ ReactTooltip>
				<Modal
					className="password_form_modal"
					isOpen={this.state.modalIsOpen}
					contentLabel="Modal info"
				>
					<a className={"right close_modal "+(this.state.modal_clear_top && "form_remove")} onClick={this.close_modal} href="javascript:void(0);">&#10540;</a>
					<Password_form
						edit_password_form={this.edit_password_form}
						close_modal={this.close_modal}
						modal_clear_top={this.modal_clear_top}
						{...{id: this.props.id, user_id: this.props.user_id, account: this.props.account, description: this.props.description, password: this.props.password, hide_password: this.props.hide_password}}

					/>
				</Modal>
				
			</div>
		);
	}
}

const map_dispatch_to_props = (dispatch) => ({
	remove_password: (id) => dispatch(remove_password(id)),
	edit_password: (id, updates) => dispatch(edit_password(id, updates))
});
export default connect(undefined, map_dispatch_to_props)(Password_list_item);
