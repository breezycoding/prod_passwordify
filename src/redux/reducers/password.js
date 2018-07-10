//users reducer
const passwords_reducer_default_state = [];
export default (state = passwords_reducer_default_state, action) => {
	switch(action.type){
		case "ADD_PASSWORD" :
			return [...state, action.password];
		case "REMOVE_ALL_PASSWORD_BY_USER" :
			return state.filter(({ user_id }) => user_id !== action.user_id);
		case "REMOVE_PASSWORD" :
			return state.filter(({ id }) => id !== action.id);
		case "EDIT_PASSWORD" :
			return state.map((password) => {
				if(password.id === action.id){
					return{
						...password, ...action.updates
					}
				}else{
					return password;
				}
			});
		default: 
			return state;
	}
};