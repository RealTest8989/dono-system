import React, { Component } from 'react';
import axios from 'axios';
import Navbar from "./navbar.component";
import { PayPalButton } from "react-paypal-button-v2";

export default class Donate extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeMedia_Url = this.onChangeMedia_Url.bind(this);
    this.onChangeStart_Time = this.onChangeStart_Time.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: 'Anonymous',
      message: '',
      amount: 2,
      media_url: '',
      start_time: 0,
      played: false
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeMessage(e) {
    this.setState({
      message: e.target.value
    })
  }

  onChangeAmount(e) {
    if(!e.target.value < 2){
      this.setState({
        amount: e.target.value
      })
    }
  }

  onChangeMedia_Url(e) {
    this.setState({
      media_url: e.target.value
    })
  }

  onChangeStart_Time(e) {
    this.setState({
      start_time: e.target.value
    })
  }

  /*
  onSubmit(e) {
    e.preventDefault();

    let start_time = this.state.start_time;
    if(start_time != 0){
      let a = start_time.split(':');

      start_time = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
    }


    const donation = {
      username: this.state.username,
      message: this.state.message,
      amount: this.state.amount,
      media_url: this.state.media_url,
      start_time: start_time,
      played: this.state.played
    }

    console.log(donation);

    axios.post('http://localhost:5000/donations/add', donation)
      .then(res => console.log(res.data));

    // window.location = '/';
  }
  */

  onSubmit() {

    let start_time = this.state.start_time;
    if(start_time != 0){
      let a = start_time.split(':');

      start_time = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
    }


    const donation = {
      username: this.state.username,
      message: this.state.message,
      amount: this.state.amount,
      media_url: this.state.media_url,
      start_time: start_time,
      played: this.state.played
    }

    console.log(donation);

    axios.post('http://localhost:5000/donations/add', donation)
      .then(res => console.log(res.data));

  }


  render() {
    
    return (
    <div className="test" style={{width: '100%', height: '100vh', background: '#222222' }}>
    <div className="container">
    <Navbar />
    <div className="container donation-form">
      <h2>Donate</h2>
      <p>Thank you for supporting the stream! All tips are non-refundable. Please only tip if you have the means to do so.</p>
      <hr/>
      <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              required 
              type="text" 
              value={this.state.username} 
              onChange={this.onChangeUsername} 
              placeholder="Username" 
              className="form-control" 
              id="username" 
              name="username"
            />
          </div>
          <div className="form-group">
              <label htmlFor="amount">Tip Amount ($)</label>
              <input 
                required 
                type="number" 
                value={this.state.amount} 
                onChange={this.onChangeAmount} 
                placeholder="Your tip amount" 
                className="form-control" 
                min="2"
                id="amount" 
                name="amount" 
              />
            </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              value={this.state.message} 
              onChange={this.onChangeMessage} 
              rows="2" 
              maxLength="255" 
              placeholder="Your message..." 
              className="form-control" 
              id="message"
              name="message"
            >
            </textarea>
          </div>
          <div className="form-row">
              <div className="form-group col-md-8">
                  <label htmlFor="media_url">Share Media</label>
                  <input 
                    type="url" 
                    value={this.state.media_url} 
                    onChange={this.onChangeMedia_Url} 
                    placeholder="YouTube Video URL..." 
                    className="form-control" 
                    id="media_url" 
                    name="media_url"
                  />
              </div>
              <div className="form-group col-md-4">
                  <label htmlFor="start_time">Start Time (h/m/s)</label>
                  <input 
                    type="time" 
                    value={this.state.start_time} 
                    onChange={this.onChangeStart_Time} 
                    className="form-control" 
                    id="start_time" 
                    name="start_time" 
                    step="1"
                  />
              </div>
          </div>
          {/*
          <button type="submit" className="btn btn-primary">Donate</button>
          */}
        </form>
        <hr/>
        <div class="col-md-4">
        <h2>Pay with Paypal</h2>
          <PayPalButton
          amount={this.state.amount}

          onSuccess={(details, data) => {
            this.onSubmit();

            return fetch("/paypal-transaction-complete", {
              method: "post",
              body: JSON.stringify({
                orderID: data.orderID,
                clientID: 'ARZentNKUBtCx5GLk5mgB8mxWReWmLzO7L57DzN53fs1pM8CrE3TMli_0wF54TYlfcD49FGmbQda0syX'
              })
            });
          }}
          />
        </div>
    </div>
    </div>
    </div>
    )
  }
}