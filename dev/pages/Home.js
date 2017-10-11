import React from 'react';
import request from 'superagent';
import { Form, Select, Button, Input, Icon } from 'antd';
import '../components/Card.css';

const { TextArea } = Input;
const FormItem = Form.Item;
export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
		};
        this.handleSubmit = this.handleSubmit.bind(this);
    	this.onChangeUserName = this.onChangeUserName.bind(this);
        
	}
	onChangeUserName(e) {
        this.setState({
			userName: e.target.value
		});
	}
    clearForm() {
        this.setState({userName: ''});
    }
    handleSubmit() {
        const self = this;
        const data = {
            name: this.state.userName
        };
        request.post('/api').send(data).set('Accept', 'application/json').end((err, res) => {
            if (err || !res.ok) {
                console.log('Oh no! err' + JSON.stringify(data));
            } else {
                console.log('Success');
            }
        });
    }

  	render() {
    return (
    	<div className="example-input">
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
                <Input placeholder="Enter your userName" value={this.state.userName} onChange={this.onChangeUserName}/>
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </FormItem>
            </Form>
    	</div>
    	)
  	}
}

