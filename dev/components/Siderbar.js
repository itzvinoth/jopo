import React from 'react';
import './Card.css';
import { Form, Select, Input, Layout, Button, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class SiderBar extends React.Component {
	constructor(props) {
	    super(props);
  	}

  	render() {
  		const collapsed = this.props.collapsed;
  		const { getFieldDecorator } = this.props.form;
  		if (!collapsed) {
    		return null;
  		}
  		return (
        	<Form>
                <FormItem label="Company Name" labelCol={{ span: 12 }} wrapperCol={{ span: 8 }}>
                    {getFieldDecorator('cname', {
			            rules: [{ required: true, message: 'Please provide your company name!' }],
			        })(<Input />)}
                </FormItem>
                <FormItem label="Designation" labelCol={{ span: 12 }} wrapperCol={{ span: 8 }}>
                    {getFieldDecorator('designation', {
			            rules: [{ required: true, message: 'Please select the designation!' }],
			        })(<Select placeholder="Select a option">
			              <Option value="frontend">Frontend Developer</Option>
			              <Option value="backend">Backend Developer</Option>
            			</Select>)}
                </FormItem>
                <FormItem label="Number of years" labelCol={{ span: 12 }} wrapperCol={{ span: 8 }}>
                    {getFieldDecorator('nyears', {
			            rules: [{ required: true, message: 'Please provide your company name!' }],
			        })(<Input />)}
                </FormItem>
                <FormItem wrapperCol={{ span: 8, offset: 4 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</FormItem>
            </Form>
  		)
  	}
}
const Siderbar = Form.create()(SiderBar);
export default Siderbar;