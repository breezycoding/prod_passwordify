import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

import Account_info from "./Account_info";
import Edit_user from "./Edit_user";
import Password_form from "./Password_form";
import Password_list from "./Password_list";
import { current_user, logout_user, edit_current_user } from "../redux/actions/current_user";
import { remove_user, edit_user } from "../redux/actions/users";
import {add_password, remove_all_password_by_user} from "../redux/actions/password";

class Dashboard extends React.Component{
	
	state = {
		add_password: false,
		account_info: false,
		edit_account: false,
		modalIsOpen: false,
		alert_thank_you: false,
		modal_clear_top: false
	}

	open_modal = () => {
		ReactTooltip.rebuild();
		this.setState({modalIsOpen: true});
	}

	close_modal = () => {
		this.setState({
			modalIsOpen: false,
			modal_clear_top: false
		});
	}
	
	logout = () => {
		this.props.logout_user({ id:this.props.current_user[0].id });
		this.props.history.push("/");
	}
	
	filter_modal = (modalIsOpen, add_password, account_info, edit_account) => {
		this.setState({
			add_password: add_password,
			account_info: account_info,
			edit_account: edit_account,
			modalIsOpen: modalIsOpen
		});
	}
	
	remove_account = () => {
		if(confirm("are you sure want to delete your account")){
			this.setState({alert_thank_you:true});
			setTimeout(function() {	
				this.setState({alert_thank_you:false});
				this.props.history.push("/");
				this.props.remove_user({id:this.props.current_user[0].id});
				this.props.logout_user({id:this.props.current_user[0].id});
				this.props.remove_all_password_by_user({user_id:this.props.current_user[0].id});
			}.bind(this), 3000);
		}
	}
	
	modal_clear_top = () => {
		this.setState({modal_clear_top:true});
	}
	
	account_info = (event) => {
		event.preventDefault();
		this.filter_modal(true, false, true, false);
	}
	
	edit_account = (event) => {
		event.preventDefault();
		this.filter_modal(true, false, false, true);
	}
	
	add_password = (event) => {
		event.preventDefault();
		this.filter_modal(true, true, false, false);
	}
	
	add_password_form = (password_info) => {
		this.setState({modal_clear_top:true});
		let user_id = {user_id: this.props.current_user[0].id};
		let password_obj = Object.assign(user_id, password_info);
		this.props.add_password(password_obj);
	}
	
	render(){
		return(
			<section id="dashboard">
				<div className="container">
					<h4 className="right"><a onClick={this.logout} href="javascript:void(0);">Log Out</a></h4>
					<h4 className="right"><a onClick={this.remove_account} href="javascript:void(0);">Remove Account</a> /</h4>
					<h4 className="right"><a onClick={this.edit_account} href="javascript:void(0);">Edit Account</a> /</h4>
					<h4 className="right"><a onClick={this.account_info} href="javascript:void(0);">Account Info</a> /</h4>
					<h4 className="right"><a onClick={this.add_password} href="javascript:void(0);">Add Password</a> /</h4>
					<h2 className="left">Hi {this.props.current_user[0].username}!</h2>
					<div className="clear"></div>
					<Password_list 
						user_id={this.props.current_user[0].id} 
					/>
					{

						this.state.alert_thank_you && (
														<div className="alert_thank_you">
															<div className="inner_thank_you">
																<p>Thank you for using Passwordify app</p>
															</div>
														</div>
														)
					}

					<div className="clear"></div>
					{
						this.state.account_info && <Modal
														isOpen={this.state.modalIsOpen}
														contentLabel="Modal info"
													>
														<a className="right close_modal" onClick={this.close_modal} href="javascript:void(0);">&#10540;</a>
														<Account_info />
													</Modal>
					}
					{
						this.state.edit_account && <Modal
														isOpen={this.state.modalIsOpen}
														contentLabel="Modal info"
													>
														<a className={"right close_modal "+(this.state.modal_clear_top && "form_remove")} onClick={this.close_modal} href="javascript:void(0);">&#10540;</a>
														<Edit_user 
															modal_clear_top={this.modal_clear_top}
															close_modal={this.close_modal}
														/>
													</Modal>
					}
					{
						this.state.add_password && <Modal
														className="password_form_modal"
														isOpen={this.state.modalIsOpen}
														contentLabel="Modal info"
													>
														<a className={"right close_modal "+(this.state.modal_clear_top && "form_remove")} onClick={this.close_modal} href="javascript:void(0);">&#10540;</a>
														<Password_form 
															add_password_form={this.add_password_form}
															close_modal={this.close_modal}
														/>
													</Modal>
					}
				</div>
			</section>
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
	logout_user: (user) => dispatch(logout_user(user)), 
	remove_user: (user) => dispatch(remove_user(user)),
	add_password: (password) => dispatch(add_password(password)),
	remove_all_password_by_user: (user_id) => dispatch(remove_all_password_by_user(user_id))
});
export default connect(map_state_to_props, map_dispatch_to_props)(Dashboard);