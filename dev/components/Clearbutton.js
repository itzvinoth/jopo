import React from "react";
import { Card, Radio, Button, Icon } from 'antd';

export default class Clearbutton extends React.Component {
  render() {
    return (
        <Button.Group size="large">
	        <Button type="primary">Clear Data</Button>
	    </Button.Group>	
      )
  }
}