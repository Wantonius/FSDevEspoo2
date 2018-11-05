const initialState = {
	id:100,
	list:[]
}

const shoppingReducer = (state=initialState, action) => {
	let tempList = []
	switch(action.type) {

		case 'ADD_TO_LIST':
			console.log("Reducer - add to list");
			let tempObject = {
				id:state.id,
				type:action.data.type,
				count:action.data.count,
				price:action.data.price
			}
			for(let i=0;i<state.list.length;i++) {
				tempList.push(state.list[i]);
			}
			tempList.push(tempObject);
			let tempState = {
				id:state.id+1,
				list:tempList
			}
			return tempState;
		case 'REMOVE_FROM_LIST':
			console.log("Remove from list");
			console.log(action)
			let tempId = parseInt(action.data,10);

			for(let i=0;i<state.list.length;i++) {
				if(tempId !== state.list[i].id) {
					tempList.push(state.list[i]);
				}
			}
			let tempState2 = {
				id:state.id,
				list:tempList
			}
			return tempState2;
		default:
			return state		
	}
}

export default shoppingReducer;