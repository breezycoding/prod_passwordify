import React from "react";
import Modal from "react-modal";

import Registration_form from "./Registration_form"
import Login_form from "./Login_form"

export default class Main_page extends React.Component{
	state = {
		login:undefined,
		register:undefined,
		modalIsOpen:false,
		modal_clear_top: false
	}
	
	open_modal = () => {
		this.setState({modalIsOpen: true});
	}

	close_modal = () => {
		this.setState({modalIsOpen: false});
	}
	
	modal_clear_top_remove = () => {
		this.setState({modal_clear_top: true});
	}
	
	register = (event) => {
		event.preventDefault();
		this.setState({
			login:undefined,
			register:1,
			modalIsOpen:true,
			modal_clear_top: false
		});
	}
	
	login = (event) => {
		event.preventDefault();
		this.setState({
			login:1,
			register:undefined,
			modalIsOpen:true,
			modal_clear_top: false
		});
	}

	render(){
		Modal.setAppElement('#app');
		return(
			<div>
				
				<section id="main_page">
					<div className="container">
						<h2><a onClick={this.register} href="javascript:void(0);">Signup</a></h2>
						<h2><a onClick={this.login} href="javascript:void(0);">Log in</a></h2>
						{this.state.register === 1 && <Modal
															isOpen={this.state.modalIsOpen}
															contentLabel="Modal Register"
														>
															<a className={"right close_modal "+(this.state.modal_clear_top && "form_remove")} onClick={this.close_modal} href="javascript:void(0);">&#10540;</a>
															<h2>{!this.state.modal_clear_top && "register"}</h2>
															<Registration_form 
																close_modal={this.close_modal} 
																modal_clear_top_remove={this.modal_clear_top_remove}
															/>
														</Modal>}
						{this.state.login === 1 && <Modal
															isOpen={this.state.modalIsOpen}
															contentLabel="Modal login"
														>
															<a className={"right close_modal "+(this.state.modal_clear_top && "form_remove")} onClick={this.close_modal} href="javascript:void(0);">&#10540;</a>
															<h2>{!this.state.modal_clear_top && "login"}</h2>
															<Login_form 
						 										close_modal={this.close_modal} 
						 										history={this.props.history}
						 										modal_clear_top_remove={this.modal_clear_top_remove}
						 									/>
														</Modal>}
					</div>
				</section>
			</div>
		)
	}
}