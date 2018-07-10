import uuid from "uuid";
import moment from 'moment';

//ADD PASSWORD
export const add_password = ({ user_id = "", account = "", description = "", password = "", hide_password = "", updated_at = 0} = {}) => ({
	type: "ADD_PASSWORD",
	password:{
		id:uuid(),
		user_id,
		account,
		description,
		password,
		hide_password, 
		created_at:moment().format('MMMM Do YYYY, h:mm'), 
		updated_at
	}
});


// REMOVE ALL PASSWORD BY USER
export const remove_all_password_by_user = ({ user_id } = {}) => ({
	type: "REMOVE_ALL_PASSWORD_BY_USER",
	user_id
});


// REMOVE PASSWORD
export const remove_password = ({ id } = {}) => ({
	type: "REMOVE_PASSWORD",
	id
});

//EDIT PASSWORD
export const edit_password = (id, updates) => ({
	type: "EDIT_PASSWORD",
	id,
	updates
});