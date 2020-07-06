import React, { Component } from 'react';
import axios from 'axios';
import '../alertbox.css';
import Speech from 'speak-tts';
import ReactPlayer from 'react-player';
import Donation_Alert from '../donation-alert.mp3'

export default class Alertbox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            tts_finished: false,
            playing: false
        };
    }

    componentDidMount() {
        setInterval(() => {
            if(!this.state.playing){
                axios.get((process.env.baseURL || 'http://localhost:5000') + '/donations/queue')
                .then(response => {
                this.setState({ donations: response.data, loaded: true, tts_finished: false })
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }, 10000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.donations[0] != null){
            console.log(this.state.donations[0]);
        } else {
            console.log('No donation found.')
        }

        if(prevState.donations != this.state.donations){
            if(this.state.donations[0] != null){
                const donation = {
                    id: this.state.donations[0]._id,
                    username: this.state.donations[0].username,
                    message: this.state.donations[0].message,
                    amount: this.state.donations[0].amount,
                    media_url: this.state.donations[0].media_url,
                    start_time: this.state.donations[0].start_time,
                    played: true
                }
    
                this.setState({playing: true});
    
                axios.post((process.env.baseURL || 'http://localhost:5000') + '/donations/update/' + donation.id, donation)
                .then(res => console.log(res.data));
        
                const donation_alert_file = document.getElementsByClassName("donation-alert")[0];
                donation_alert_file.play();
        
                const speech = new Speech();
        
                speech.setLanguage('en-GB');
                speech.setPitch(1);
                speech.setRate(0.8);
        
                
                setTimeout(() => speech.speak({
                        text: `${donation.username} donated $${donation.amount} ${donation.message}`,
                        listeners: {
                            onend: () => {
                                this.setState({ tts_finished: true });
                                if(donation.media_url){
                                setTimeout(() => {
                                    this.setState({playing: false});
                                }, 30000);
                                } else {
                                    this.setState({playing: false});
                                }
                            }
                        }
                }), 5800);
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="alertbox">
                    { this.state.tts_finished && this.state.donations[0].media_url ? 
                    <ReactPlayer
                        url={this.state.donations[0].media_url} 
                        width='0'
                        height='0' 
                        config={{
                            youtube: {
                            playerVars: { start: this.state.donations[0].start_time, end: this.state.donations[0].start_time + 30 }
                            }
                        }}
                        playing
                    />
                    : <div></div>
                    }

                    {this.state.loaded && this.state.donations[0] ? 
                    <div>
                        <audio className="donation-alert">
                            <source src={Donation_Alert}></source>
                        </audio>
                        <div id="alert">
                        <div className="donation"><span className="alert-color">{ this.state.donations[0].username ? this.state.donations[0].username : 'Anonymous'}</span> donated <span className="alert-color">${this.state.donations[0].amount}</span>!</div>
                        <div className="message">{this.state.donations[0].message ? this.state.donations[0].message : '' }</div>
                        </div>
                        <div id="player"></div>
                    </div>
                    : <div></div>
                    }

                </div>
            </div>
        );

    }

    
}
