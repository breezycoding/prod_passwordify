//users reducer
const users_reducer_default_state = [];
export default (state = users_reducer_default_state, action) => {
	switch(action.type){
		case "CURRENT_USER" :
			return [...state, action.user];
		case "LOGOUT_USER" :
			return state.filter(({ id }) => id !== action.id);
		case "EDIT_CURRENT_USER" :
			return state.map((user) => {
				if(user.id === action.id){
					return{
						...user, ...action.updates
					}
				}else{
					return user;
				}
			});
		default: 
			return state;
	}
};