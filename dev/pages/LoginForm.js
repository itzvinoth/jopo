import React from 'react';
import { Link } from 'react-router-dom';
import request from 'superagent';
import {Layout, Form, Select, Button, Input, Icon, Checkbox } from 'antd';
import '../components/Card.css';
import bcrypt from 'bcrypt-nodejs';

const FormItem = Form.Item;
const { Header, Content, Footer } = Layout;

class NormalLoginForm extends React.Component {
  constructor(props) {
	super(props);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      	bcrypt.hash(values.password, null, null, function(err, hash) {
      		// console.log(hash);
		});
        // console.log('Received values of form: ', values.userName);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div><Layout className ="loginPage" style={{maxHeight:"50%"}}>
    	<Header style={{ background:"#3d3a71",textAlign:"center"}}>
    		<h3>Login</h3>
    	</Header>
    	<Content >    	
	    	<div className="loginDiv">
		      <Form onSubmit={this.handleSubmit} className="login-form">
		        <FormItem >
		          {getFieldDecorator('userName', {
		            rules: [{ required: true, message: 'Please input your username!' }],
		          })(
		            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
		          )}
		        </FormItem>
		        <FormItem>
		          {getFieldDecorator('password', {
		            rules: [{ required: true, message: 'Please input your Password!' }],
		          })(
		            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
		          )}
		        </FormItem>
		        <FormItem labelCol={{ span: 12 }}>
		          {getFieldDecorator('remember', {
		            valuePropName: 'checked',
		            initialValue: true,
		          })(
		            <Checkbox>Remember me</Checkbox>
		          )}
		          <a className="login-form-forgot" href="">Forgot password</a>
		        </FormItem>
		        <FormItem>  
		          <Button type="primary" htmlType="submit" className="login-form-button">
		            Log in
		          </Button>
		          Or <Link to='/signup'>
		            register now!
		          </Link>
		        </FormItem>
		      </Form>
     		 </div>
    	</Content>
      </Layout></div>
    );
  }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;