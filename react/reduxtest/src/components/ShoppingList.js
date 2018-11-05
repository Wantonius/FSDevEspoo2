import React from 'react';
import {connect} from 'react-redux'

class ShoppingList extends React.Component {

	render() {
			let items = this.props.list.map((item) => {
				return <tr key={item.id}>
							<td>{item.count}</td>
							<td>{item.type}</td>
							<td>{item.price}</td>
						</tr>				
			})
	return(
		<table>
			<thead>
				<tr>
					<th>Count</th>
					<th>Type</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{items}
			</tbody>
		</table>	
		)		
	}
}

const mapStateToProps = (state) => {
	console.log("ShoppingList - mapStateToProps");
	return {
		list: state.list
	}
}

export default connect(mapStateToProps)(ShoppingList);