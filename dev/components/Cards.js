import React from 'react';
import { Card, Radio, Button } from 'antd';
import './Card.css';

const RadioGroup = Radio.Group;
export default class Cards extends React.Component {
  
  constructor(props) {
    super(props);
    // We can't use other names instead of 'state' prop in obj
    // Because 'state' is an existing property name in React   
    this.state = {
      cards: ["card1","card2","card3","card4","card5"],
      value: 1,
      size: 'large',
    };
    this.state.duplicateCards = this.state.cards;
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
    console.log(this.state.duplicateCards)
    this.setState({
      value: e.target.value,
      cards: this.state.duplicateCards.filter((card,idx) => (parseInt(idx+1)%e.target.value) == 0)
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
      this.setState({ 
        cards: this.state.cards.concat(this.newCard),
        duplicateCards: this.state.cards 
      });
    }
  }

  createListItems() {
    this.newCardCreator();
    this.setState({ 
      cards: this.state.cards.concat(this.newCard),
      duplicateCards: this.state.cards 
    });
  }

  render() {
    return ( 
      <div>
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          <Radio value={1}>Filter 1</Radio>
          <Radio value={2}>Filter 2</Radio>
          <Radio value={3}>Filter 3</Radio>
          <Radio value={5}>Filter 5</Radio>
          <Radio value={10}>Filter 10</Radio>
        </RadioGroup>
        {this.state.cards.map((card, id) => { 
            return (<div key={id}><Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                      <div className="custom-card">
                        <h3>{card}</h3>
                      </div>
                    </Card></div>)
          })}
        <Button type="primary" size={this.state.size} onClick={this.createListItems}> Add </Button>
      </div>
    )
  }
  
}
