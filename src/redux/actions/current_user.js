export const current_user = ({ id = "", username = "", password = "", created_at = 0, updated_at = 0 } = {}) => ({
	type: "CURRENT_USER",
	user:{
		id,
		username, 
		password, 
		created_at, 
		updated_at
	}
});

export const logout_user = ({ id } = {}) => ({
	type: "LOGOUT_USER",
	id
});

//EDIT EXPENSE
export const edit_current_user = (id, updates) => ({
	type: "EDIT_CURRENT_USER",
	id,
	updates
});