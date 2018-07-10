import { createStore } from "redux";

const store  = createStore((state = {count:0}, action)=> {
	switch(action.type){
		case "INCREMENT" :
			return{
			   count:state.count + 1
		   };
		case "DECREMENT" :
			return{
			   count:state.count - 1
		   };
		case "RESET" :
			return{
			   count:0
		   };
		default:
			return state;
			
			
	}
	
	/*if(action.type === "INCREMENT"){
	   return{
		   count:state.count + 1
	   };
   }else{
	   return state;
   }*/

});

console.log(store.getState());

/*
	Actions - object that gets sent to the store
*/



//steps
//Id like to increment the count
/*
	type - is the action
	INCREMENT - is the action type
		uppercase is the convention for action type
	-we send this object to the store
		{
			type:"INCREMENT"
		}
	-dispatch - allows us to send action object. and store could do something in this information
	-now were going to combine action to the current state
	if(action.type === "INCREMENT"){
	   return{
		   count:state.count + 1;
	   }
   }else{
	   return state;
   }
*/

store.dispatch({
	type:"INCREMENT"
});

store.dispatch({
	type:"INCREMENT"
});

store.dispatch({
	type:"RESET"
});

store.dispatch({
	type:"DECREMENT"
});


//I'd like to reset the count to zero

console.log(store.getState());


