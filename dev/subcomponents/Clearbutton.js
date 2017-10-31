import React from "react";
import { Card, Radio, Button, Icon } from 'antd';
import request from 'superagent';

export default class Clearbutton extends React.Component {

	constructor(props) {
	    super(props);
	    this.onClearData = this.onClearData.bind(this);
  	}

  	onClearData() {
  		let self = this;
  		// console.log(this.props.cards);
  	}
  	
  	render() {
  		const cards = this.props.cards;
  		return (
	        <Button.Group size="large">
		        <Button type="primary" value={cards} onClick={this.onClearData}>Clear Data</Button>
		    </Button.Group>	
      	)
  	}
}