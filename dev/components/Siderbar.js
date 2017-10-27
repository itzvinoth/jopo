import React from 'react';
import './Card.css';
<<<<<<< HEAD
import { Input, Layout, Menu, Icon } from 'antd';
=======
import { Form, Select, Input, Layout, Button, Menu, Icon, InputNumber } from 'antd';
>>>>>>> upstream/master
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class SiderBar extends React.Component {
	constructor(props) {
	    super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);
  	}

    handleSubmit(e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }

    handleSelectChange(value) {
      this.props.form.setFieldsValue({
        designation: value,
      });
    }

  	render() {
  		const collapsed = this.props.collapsed;
  		const { getFieldDecorator } = this.props.form;
  		if (!collapsed) {
    		return null;
  		}
  		return (
<<<<<<< HEAD
  			<div>
  				<Layout>
  					<Sider trigger={null} collapsible collapsed={collapsed}>
			            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
				            <Menu.Item key="1">
				            	<span>nav 1</span>
				            </Menu.Item>
				            <Menu.Item key="2">
				            	<span>nav 2</span>
				            </Menu.Item>
				            <Menu.Item key="3">
				            	<span>nav 3</span>
				            </Menu.Item>
				          </Menu>
          			</Sider>
  				</Layout>
  			</div>
=======
        	<Form onSubmit={this.handleSubmit} >
                <FormItem label="Company Name" labelCol={{ span: 12 }} wrapperCol={{ span: 8 }}>
                    {getFieldDecorator('companyName', {
			            rules: [{ required: true, message: 'Please provide your company name!' }],
			        })(<Input/>)}
                </FormItem>
                <FormItem label="Designation" labelCol={{ span: 12 }} wrapperCol={{ span: 8 }}>
                    {getFieldDecorator('designation', {
			            rules: [{ required: true, message: 'Please select the designation!' }],
			        })(<Select placeholder="Select a option" onChange={this.handleSelectChange}>
			              <Option value="frontend">Frontend Developer</Option>
			              <Option value="backend">Backend Developer</Option>
            			</Select>)}
                </FormItem>
                <FormItem label="Number of years" labelCol={{ span: 12 }} wrapperCol={{ span: 8 }}>
                    {getFieldDecorator('yearsExp', { initialValue: 3 })(
                      <InputNumber min={0} max={10}/>
                    )}
                    <span className="ant-form-text"> years of experience</span>
                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 12}}>
        					<Button type="primary" htmlType="submit" >
        						Submit
        					</Button>
        				</FormItem>
            </Form>
>>>>>>> upstream/master
  		)
  	}
}
const Siderbar = Form.create()(SiderBar);
export default Siderbar;