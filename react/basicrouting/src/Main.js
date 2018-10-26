import React from 'react';
import {Switch,Route} from 'react-router-dom';
import MyList from './MyList';
import MyForm from './MyForm';

export default class Main extends React.Component {
	
	render() {
		return(
			<Switch>
				<Route exact path="/" render={() => 
					<MyList list={this.props.list}
					removeFromList={this.props.removeFromList}
					toEditMode={this.props.toEditMode}/>
				}/>
				<Route path="/form" render={() => 
					<MyForm mode={this.props.mode}
					addToList={this.props.addToList}
					item={this.props.item}/>
				}/>
			</Switch>
		)
	}

}