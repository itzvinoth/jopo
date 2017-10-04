import React from "react";
import { Form, Select, Button, Input, Icon } from 'antd';
import '../components/Card.css';

const { TextArea } = Input;
export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
		};
		this.emitEmpty = this.emitEmpty.bind(this);
    	this.onChangeUserName = this.onChangeUserName.bind(this);
	}
	emitEmpty() {
		this.userNameInput.focus();
		this.setState({
			userName: ''
		});
	}
	onChangeUserName(e) {
		this.setState({
			userName: e.target.value
		});
	}

  	render() {
  	const { userName } = this.state;
    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
    	<div className="example-input">
    	<Input placeholder="Enter your userName" prefix={<Icon type="user" />} suffix={suffix} value={userName} onChange={this.onChangeUserName} ref={node => this.userNameInput = node}/>
    	<br/><br/>
    	<TextArea rows={4} />
    	</div>
    	)
  	}
}

