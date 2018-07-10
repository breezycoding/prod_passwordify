//users reducer
const users_reducer_default_state = [];
export default (state = users_reducer_default_state, action) => {
	switch(action.type){
		case "ADD_USER" :
			return [...state, action.users];
		case "REMOVE_USER" :
			return state.filter(({ id }) => id !== action.id);
		case "EDIT_USER" :
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