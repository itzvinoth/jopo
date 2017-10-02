import React from 'react';
import { Card, Radio } from 'antd';
import './Card.css';

const RadioGroup = Radio.Group;
export default class Cards extends React.Component {
  
  constructor(props) {
    super(props);
    // We can't use other names instead of 'state' prop in obj
    // Because 'state' is an existing property name in React   
    this.state = {
      cards: ["card1","card2","card3","card4","card5","card6","card7","card8","card9"],
      value: 1
    };

    this.createListItems = this.createListItems.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // We can't directly use setState in here.
    window.addEventListener("scroll", this.handleOnScroll);
    this.createListItems();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  newCardCreator() {
    this.cardsLen= this.state.cards.length;
    this.newCard = "card"+parseInt(this.cardsLen+1);
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleOnScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.newCardCreator();
      this.setState({ cards: this.state.cards.concat(this.newCard) })
    }
  }

  createListItems() {
    this.newCardCreator();
    this.setState({ cards: this.state.cards.concat(this.newCard) })
  }

  render() {
    return ( 
      <div>
        <button onClick={this.createListItems}> Add </button>
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </RadioGroup>
        {this.state.cards.map((card, id) => { 
            return (<div key={id}><Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                      <div className="custom-card">
                        <h3>{card}</h3>
                      </div>
                    </Card></div>)
          })}
        
      </div>
    )
  }
  
}
