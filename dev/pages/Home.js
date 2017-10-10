import React from "react";
import { Form, Select, Button, Input, Icon } from 'antd';
import '../components/Card.css';

const FormItem = Form.Item;
export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
		};
		this.emitEmpty = this.emitEmpty.bind(this);
    	this.onChangeUserName = this.onChangeUserName.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}
	emitEmpty() {
		this.setState({
			userName: ''
		});
	}
	onChangeUserName(e) {
		this.setState({
			userName: e.target.value
		});
	}
	handleSubmit(e) {
		this.setState({
			userName: e.target.value
		});
		console.log('Received values of form: ', this.state.userName);
		e.preventDefault();
		this.emitEmpty();
	}
  	render() {
  	const { userName } = this.state;
    return (
    	<div className="example-input">
	    	<Form onSubmit={this.handleSubmit}>
	    		<FormItem>
	    			<Input placeholder="Enter your userName" value={this.state.userName} onChange={this.onChangeUserName} ref={node => this.userNameInput = node}/>
	    		</FormItem>
	    		<FormItem>
	    			<Button type="primary" htmlType="submit"> Submit </Button>
	    		</FormItem>
	    	</Form>
    	</div>
    	)
  	}
}

