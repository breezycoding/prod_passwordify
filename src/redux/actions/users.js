import uuid from "uuid";
import moment from 'moment';

//ADD USER
export const add_user = ({ username = "", password = "", updated_at = 0} = {}) => ({
	type: "ADD_USER",
	users:{
		id:uuid(),
		username,
		password,
		created_at:moment().format('MMMM Do YYYY, h:mm'), 
		updated_at
	}
});

// REMOVE USER
export const remove_user = ({ id } = {}) => ({
	type: "REMOVE_USER",
	id
});

//EDIT USER
export const edit_user = (id, updates) => ({
	type: "EDIT_USER",
	id,
	updates
});