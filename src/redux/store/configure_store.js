/*Store creation*/
import { createStore, combineReducers} from "redux";
import users_reducer from "../reducers/users";
import current_user_reducer from "../reducers/current_user";
import password_reducer from "../reducers/password";

export default () => {
	const store = createStore(
		combineReducers({
			users:users_reducer,
			current_user:current_user_reducer,
			password: password_reducer
		}),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
	return store;
};