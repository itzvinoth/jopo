import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Radio, Button, Icon } from 'antd';
import Formbutton from './Formbutton';
import Clearbutton from './Clearbutton';
import Siderbar from './Siderbar';
import request from 'superagent';
import _ from 'underscore';
import './Card.css';

const RadioGroup = Radio.Group;

export default class Cards extends React.Component {
  
  constructor(props) {
    super(props);
    
    // We can't use other names instead of 'state' prop in obj
    // Because 'state' is an existing property name in React 
    this.state = {
      cards: [],
      size: 'large',
      collapsed: false
    };
    this.state.duplicateCards = this.state.cards;
    this.formToggle = this.formToggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getCards() {
    let self = this;
    request.get("/api/jobpost").end(function(err, res) {
      if (err) {
        console.log(err);
        self.setState({ cards: ["card1","card2","card3","card4","card5"]});
      } else {
        let cards = _.compact(_.pluck(res.body, 'userName'));
        //Temporarily commenting because of the long list of cards....
        // self.setState({ cards : cards });
        self.setState({ cards : ["cards"] });
      }
    });
  }

  componentDidMount() {
    // We can't directly use setState in here.
    //requesting data from the api
    this.getCards();
    this.formToggle();
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
      cards: this.state.duplicateCards.filter((card,idx) => (parseInt(idx+1)%e.target.value) == 0)
    });
  }

  formToggle() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  }
  
  render() {
    return ( 
      <div className="main">
        <div className="cards">
          {this.state.cards.map((card, id) => { 
              return (<div key={id}><Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                        <div className="custom-card">
                          <h3>{card}</h3>
                        </div>
                      </Card></div>)
            })}
          <Button type="primary" size={this.state.size} onClick={this.formToggle}> Add </Button>
        </div>
        <div className="sliderform">
          <Siderbar collapsed={this.state.collapsed} />
        </div>
      </div>
    )
  }
  
}
