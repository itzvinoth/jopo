import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Radio, Button, Icon } from 'antd';
import Loginbutton from '../subcomponents/Loginbutton';
import Clearbutton from '../subcomponents/Clearbutton';
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
      editCardObj : {},
      editing:false,
      size: 'large',
      collapsed: false
    };
    this.state.duplicateCards = this.state.cards;
    //Specify the event inside array
    let eventArray = ["formToggle", "onChange", "populateCard"];
    for (var i=0;i<eventArray.length;i++) {
      this[eventArray[i]] = this[eventArray[i]].bind(this);
    }
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
        self.setState({ cards : [{jobId:0,companyName:"VBI", designation:"Frontend Developer", details:"Strong skillset", yearsExp:3},
          {jobId:1,companyName:"Dell", designation:"Frontend Developer", details:"Strong skillset", yearsExp:6}] });
      }
    });
  }

  // Populate Card when job is added

  populateCard(obj) {
    var arr = this.state.cards;
    if(this.state.editing == true){
      arr.map(function(data,i){
        if(data.jobId == obj.jobId){
          arr[i] = obj;
        }
      });
    }
    else {
      arr.push(obj);
    }
    this.setState({cards:arr, editing:false});
  }

  // Edit Card 

  editCard(obj,val){
    const data = obj;
    this.setState({editCardObj:data, editing:true});
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
        <div className="header">
          <Link to='/signin'>
            <Loginbutton/>
          </Link>
        </div>
        <div className="cards">
          {this.state.cards.map((card, id) => { 
              return (<div key={id} onClick = {this.editCard.bind(this,card)}><Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                        <div className="custom-card">
                          <h3>{card.companyName}</h3>
                          <text>{card.designation}</text>
                          <p>{card.details}</p><text>{card.yearsExp}</text>
                          <p></p>
                        </div>
                      </Card></div>)
            },this)}
          <Button type="primary" size={this.state.size} onClick={this.formToggle}> Add </Button>
        </div>
        <div className="sliderform">
          <Siderbar collapsed={this.state.collapsed} generateCard = {this.populateCard} editJob = {this.state.editing} editJobObj = {this.state.editCardObj}/>
        </div>
      </div>
    )
  }
  
}
