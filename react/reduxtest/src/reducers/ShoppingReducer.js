const initialState = {
	id:100,
	list:[]
}

const shoppingReducer = (state=initialState, action) => {
	switch(action.type) {
		case 'ADD_TO_LIST':
			console.log("Reducer - add to list");
			let tempObject = {
				id:state.id,
				type:action.data.type,
				count:action.data.count,
				price:action.data.price
			}
			let tempList = [];
			for(let i=0;i<state.list.length;i++) {
				tempList.push(state.list[i]);
			}
			tempList.push(tempObject);
			let tempState = {
				id:state.id+1,
				list:tempList
			}
			return tempState;
		default:
			return state		
	}
}

export default shoppingReducer;