import React from 'react';
import request from 'superagent';
import './Card.css';
import { Form, Select, Input, Layout, Button, Menu, Icon, InputNumber } from 'antd';
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class SiderBar extends React.Component {
	constructor(props) {
      super(props);
      this.state = {
        companyName: '',
        designation: '',
        details: '',
        yearsExp: 3
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
      this.onDesignationChange = this.onDesignationChange.bind(this);
      this.onDetailsUpdate = this.onDetailsUpdate.bind(this);
      this.onExpChange = this.onExpChange.bind(this);
  	}

    onChangeCompanyName(e) {
      this.setState({
        companyName: e.target.value
      });
    }

    onDesignationChange(value) {
      this.setState({
        designation: value
      });
    }

    onExpChange(value) {
      this.setState({
        yearsExp: value
      });
    }

    onDetailsUpdate(e) {
      this.setState({
        details: e.target.value
      });
    }

    handleSubmit() {
      this.setState({
        companyName: '',
        designation: '',
        details: '',
        yearsExp: 3
      });
      //Posting and input field value to api
      const data = {
        companyName: this.state.companyName,
        designation: this.state.designation,
        details: this.state.details,
        yearsExp: this.state.yearsExp
      };
      
      request.post('/api/jobpost').set('Accept', 'application/json').send(data).end((err, res) => {
        if (err || !res.ok) {
            console.log('Oh no! err' + err);
        } else {
            console.log('Success');
        }
      });
    }

  	render() {
  		const collapsed = this.props.collapsed;
  		if (!collapsed) {
    		return null;
  		}
  		return (
        	<Form>
                <FormItem label="Company Name" labelCol={{ span: 12 }} wrapperCol={{ span: 8 }}>
                  <Input placeholder="Enter your company name" value={this.state.companyName} onChange={this.onChangeCompanyName}/>
                </FormItem>
                <FormItem label="Designation" labelCol={{ span: 12 }} wrapperCol={{ span: 8 }}>
                  <Select placeholder="Please select the designation" value={this.state.designation} onChange={this.onDesignationChange}>
                    <Option value="frontend">Frontend Developer</Option>
                    <Option value="backend">Backend Developer</Option>
                  </Select>
                </FormItem>
                <FormItem label="Job Details" labelCol={{ span: 12 }} wrapperCol={{ span: 8 }}>
                  <TextArea value={this.state.details} onChange={this.onDetailsUpdate} rows={4} placeholder="Please provide the details of the job"/>
                </FormItem>
                <FormItem label="Number of years" labelCol={{ span: 12 }} wrapperCol={{ span: 8 }}>
                  <InputNumber min={0} max={10} defaultValue={this.state.yearsExp} onChange={this.onExpChange}/>
                  <span className="ant-form-text"> years of experience</span>
                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 12}}>
                  <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </FormItem>
            </Form>
  		)
  	}
}
const Siderbar = Form.create()(SiderBar);
export default Siderbar;