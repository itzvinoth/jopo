import React from 'react';
import './Card.css';
import { Form, Select, Input, Layout, Button, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
export default class Siderbar extends React.Component {
	constructor(props) {
	    super(props);
  	}

  	render() {
  		const collapsed = this.props.collapsed;
  		if (!collapsed) {
    		return null;
  		}
  		return (
  				<Layout>
  					<Sider trigger={null} collapsible collapsed={collapsed}>
			            <Layout>
			            	<Form>
				                <FormItem label="Company Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
				                    <Input/>
				                </FormItem>
				                <FormItem>
				                    <Button type="primary" htmlType="submit" action="#">
				                        Submit
				                    </Button>
				                </FormItem>
				            </Form>
		                </Layout>
          			</Sider>
  				</Layout>
  		)
  	}
}
