import React from 'react';
import './Card.css';
import { Input, Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

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
  		)
  	}
}
