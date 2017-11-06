import React from 'react';
import request from 'superagent';
import { Form, Select, Button, Input, Icon, Checkbox,Layout } from 'antd';
import '../components/Card.css';
import bcrypt from 'bcrypt-nodejs';

const FormItem = Form.Item;
const { Header, Content, Footer } = Layout;

class NormalRegistrationForm extends React.Component {
  constructor(props) {
  	super(props);
	this.state = {
  		confirmDirty: false
  	};
	let eventArray = ["handleSubmit", "checkPassword", "checkConfirm", "handleConfirmBlur"];
    for (var i=0;i<eventArray.length;i++) {
      this[eventArray[i]] = this[eventArray[i]].bind(this);
    }
  }

  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is not same!');
    } else {
      callback();
    }
  }

  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      	bcrypt.hash(values.password, null, null, function(err, hash) {
      		// console.log(hash);
		});
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0,},
        sm: { span: 14, offset: 6,}
      }
    };
    return (
      <div><Layout className ="loginPage" style={{maxHeight:"55%"}}>
      <Header style={{ background:"#3d3a71",textAlign:"center"}}>
        <h3>Register</h3>
      </Header>
      <Content >
      	<div className="loginDiv">
  	      <Form onSubmit={this.handleSubmit} className="login-form">
  	        <FormItem label="Username" labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
  	          {getFieldDecorator('userName', {
  	            rules: [{ required: true, message: 'Please input your username!' }],
  	          })(
  	            <Input/>
  	          )}
  	        </FormItem>
  	        <FormItem label="E-mail" labelCol={{ span: 4 }} wrapperCol={{ span: 12 }} hasFeedback>
  	          {getFieldDecorator('email', {
  	            rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
  	          })(
  	            <Input/>
  	          )}
          	</FormItem>
  	        <FormItem label="Password" labelCol={{ span: 4 }} wrapperCol={{ span: 12 }} hasFeedback>
  	          {getFieldDecorator('password', {
  	            rules: [{
  	              required: true, message: 'Please input your password!',
  	            }, {
  	              validator: this.checkConfirm,
  	            }],
  	          })(
  	            <Input type="password"/>
  	          )}
  	        </FormItem>
  	        <FormItem label="Confirm Password" labelCol={{ span: 4 }} wrapperCol={{ span: 12 }} hasFeedback>
  	          {getFieldDecorator('confirm', {
  	            rules: [{
  	              required: true, message: 'Please confirm your password!',
  	            }, {
  	              validator: this.checkPassword,
  	            }],
  	          })(
  	            <Input type="password" onBlur={this.handleConfirmBlur}/>
  	          )}
  	        </FormItem>
  	        <FormItem {...tailFormItemLayout}>  
  	          <Button type="primary" htmlType="submit" className="login-form-button">
  	            Register
  	          </Button>
  	        </FormItem>
  	      </Form>
        </div>
      </Content>
      </Layout></div>
    );
  }
}

const RegistrationForm = Form.create()(NormalRegistrationForm);

export default RegistrationForm;