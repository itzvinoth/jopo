import React from 'react';
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
  					<Sider>
  						<Input placeholder="Basic usage" />
          			</Sider>
  				</Layout>
  			</div>
  		)
  	}
}
