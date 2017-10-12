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
            userName: this.state.userName
        };
        request.post('/api').set('Accept', 'application/json').send(data).end((err, res) => {
            if (err || !res.ok) {
                console.log('Oh no! err' + err);
            } else {
                console.log('Success');
            }
        });
    }

  	render() {
    return (
    	<div className="example-input">
          <Form>
            <FormItem>
                <Input placeholder="Enter your userName" value={this.state.userName} onChange={this.onChangeUserName}/>
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit} action="#">
                    Submit
                </Button>
            </FormItem>
            </Form>
    	</div>
    	)
  	}
}

