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
        jobId:'',
        companyName: '',
        designation: '',
        details: '',
        yearsExp: 3
      };
      //Specify the event inside array
      let eventArray = ["handleSubmit", "onChangeCompanyName", "onDesignationChange", "onDetailsUpdate", "onExpChange"];
      for (var i=0;i<eventArray.length;i++) {
        this[eventArray[i]] = this[eventArray[i]].bind(this);
      }
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
        jobId : '',
        companyName: '',
        designation: '',
        details: '',
        yearsExp: 3
      });

      //Posting and input field value to api
      const data = {
        jobId: (this.state.jobId ? this.state.jobId : ''),
        companyName: this.state.companyName,
        designation: this.state.designation,
        details: this.state.details,
        yearsExp: this.state.yearsExp
      };

      if(data.jobId ){
        request.put('/api/updatejob').set('Accept', 'application/json').send(data).end((err, res) => {
          if (err || !res.ok) {
              console.log('Oh no! err' + err);
          } else {
              this.props.generateCard(res.body);    // Callback Card.js populateCard() function 
          }
        });
      }else{
        request.post('/api/jobpost').set('Accept', 'application/json').send(data).end((err, res) => {
          if (err || !res.ok) {
              console.log('Oh no! err' + err);
          } else {
              this.props.generateCard(res.body);    // Callback Card.js populateCard() function 
          }
        });
      }
      

    }

    // Populate the card details in form to edit the details 

    componentWillReceiveProps(newProps){
      const editingJob = newProps.editJob;
      const obj = newProps.editJobObj;
      if(editingJob && obj != this.state){
        this.setState({jobId:obj.jobId, companyName:obj.companyName, designation: obj.designation, details: obj.details, yearsExp: obj.yearsExp});
      }
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