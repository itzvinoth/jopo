import React from 'react';

var createReactClass = require('create-react-class');
const Cards = createReactClass({
  getInitialState: function() {
    return ({data: [], requestSent: false,defaultState:[],length: 50,startKey: 1});
  }, 

  componentDidMount: function() {
    window.addEventListener('scroll', this.handleOnScroll);

    this.initFakeData();
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleOnScroll);
  },

  initFakeData: function() {
    var data = this.createFakeData(this.state.data.length, this.state.length, 1);
    this.setState({data: data,defaultState:data});
  },

  createFakeData: function(startKey, counter, incCounter) {
    console.log(startKey)
    var i = 0;
    var data = [];
    if(startKey%incCounter !== 0) {
      startKey += startKey%incCounter
    }
    for (i = startKey; i < counter; i+=incCounter) {
      var fakeData = (<div key={i} id={i} className="col-md-4 animate"><div className="data-info"><div className="data-text">Data {i}</div></div></div>);
      data.push(fakeData);
    }

    return data;
  },

  querySearchResult: function() {
    if (this.state.requestSent) {
      return;
    }

    setTimeout(this.doQuery, 2000);

    this.setState({requestSent: true});
  },

  doQuery: function() {
        var newlen = this.state.length + 50;
        console.log(this.state.length,newlen)
        var fakeData = this.createFakeData(this.state.length, newlen, this.state.startKey);
        var newData = this.state.data.concat(fakeData);
        this.setState({data: newData, requestSent: false,length:newlen});
  },  

  filterdivide: function(value) {
    if (value === 0) {
      this.setState({data:this.state.defaultState,length:100,startKey: 1})
    } else {
     var newlen = this.state.length + 50;
     var  data = this.createFakeData(0,newlen, value);
      this.setState({data:data,startKey:value,length:newlen,startKey:value})
    }    
  }, 

  filterdivideby: function(event) {
    this.filterdivide(parseFloat(event.target.id.replace('f','')));
  },

  handleOnScroll: function() {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= (scrollHeight-2000);

    if (scrolledToBottom) {
      this.querySearchResult();
    }
  },

  render: function() {
    return (
      <div>  
        
        <div className="container">
        <div className="col-md-12">
            <input id="f3" onClick={this.filterdivideby} type="radio" name="filter" />
            <label htmlFor="f3">Filter 3</label>
          <input id="f10" onClick={this.filterdivideby} type="radio" name="filter"/>
          <label htmlFor="f10">Filter 10</label>
          <input id="f5" onClick={this.filterdivideby} type="radio" name="filter"/>
          <label htmlFor="f5">Filter 5</label>
          <input id="f1" onClick={this.filterdivideby} type="radio" name="filter"/>
          <label htmlFor="f1">Filter 1</label>
          <input id="f15" onClick={this.filterdivideby} type="radio" name="filter"/>
          <label htmlFor="f15">Filter 15</label>
          <input id="f0" onClick={this.filterdivideby} type="radio" name="filter"/>
          <label htmlFor="f0">Remove Filter</label>
          </div>
          {this.state.data}
        </div>
        {(() => {
          if (this.state.requestSent) {
            return(
              <div className="data-loading">
                <i className="fa fa-refresh fa-spin"></i>
              </div>
            );
          } else {
            return(
              <div className="data-loading"></div>
            );
          }
        })()}
      </div>
    );
  }
});


export default Cards;
