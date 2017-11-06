import React from "react";
import { Link } from "react-router-dom";
import Loginbutton from '../subcomponents/Loginbutton';
import Registerbutton from '../subcomponents/Registerbutton';
import { Layout, Menu, Breadcrumb, Select, Avatar , Row, Col, Button} from 'antd';
import './Card.css';
import Cards from "./Cards";

const { Header, Content, Footer } = Layout;
const Option = Select.Option;

export default class LayoutPage extends React.Component {
	constructor() {
		super();
		this.state = {addJob : false}
    this.handleChange = this.handleChange.bind(this);
	}

  handleChange(value) {
    console.log("selected", value);
  }
  postJob(){
    this.setState({addJob:true});
  }

	render() {
    return (
    	<div style={{height:"100%", width:"100%"}}>
      	<Layout style={{minHeight:"100%"}}>
          <Header style={{ position: 'fixed', width: '100%', zIndex: 1000, background:"#3d3a71" }}>             
              <Row gutter={16}>
                <Col className="gutter-row" span={4}>
                  <h3 style={{color:"white"}}>Job Postal System</h3>
                </Col>
                <Col className="gutter-row loginIcon" span={1}>
                  
                    <Link to='/signin'><Avatar size="large" icon="user" />
                    </Link>
                  
                </Col>
                <Col className="gutter-row" span={4}>
                  <Select className="jobSelection"
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Job Type">
                    <Option value="fulltime">Full-Time Employment </Option>
                    <Option value="parttime">Part-Time Employment</Option>
                  </Select> 
                </Col>
                <Col className="gutter-row" span={4}>
                  <Select className="jobSelection"
                    showSearch
                    style={{ width:  "100%" }}
                    placeholder="Job Category">
                    <Option value="frontend">Frontend Developer</Option>
                    <Option value="backend">Backend Developer</Option>
                  </Select> 
                </Col>
                <Col className="gutter-row" span={6}>
                  <Select className="jobSelection"
                    mode="multiple"
                    defaultValue={['usa', 'india']}
                    style={{ width:  "100%" }}
                    placeholder="Location" onChange={this.handleChange}>
                    <Option value="india">India</Option>
                    <Option value="usa">USA</Option>
                    <Option value="aus">Australia</Option>
                    <Option value="canada">Canada</Option>
                    <Option value="uk">UK</Option>
                    <Option value="europe">Europe</Option>
                  </Select>
                </Col>
                <Col className="gutter-row" span={2} offset={2}>
                    <Button onClick={this.postJob.bind(this)}>Post Job</Button>
                </Col>
              </Row>
             
              
                
          </Header>
          <Content style={{marginTop: 64,padding: 20, background:" #e2dada", }}>            
            <div>  <Cards addjob = {this.state.addJob}/> </div>
          </Content>
        </Layout>
      </div>
  	)
  }
}
