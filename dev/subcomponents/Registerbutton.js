import React from "react";
import { Button, Icon } from 'antd';

export default class Registerbutton extends React.Component {
  render() {
    return (
        <Button.Group size="large">
	        <Button type="primary">Go to Register<Icon type="right" /></Button>
	    </Button.Group>
      )
  }
}
