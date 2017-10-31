import React from "react";
import { Card, Radio, Button, Icon } from 'antd';

export default class Loginbutton extends React.Component {
  render() {
    return (
        <Button.Group size="large">
	        <Button type="primary">Go to SignIn<Icon type="right" /></Button>
	    </Button.Group>
      )
  }
}
