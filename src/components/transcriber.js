import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import { getHashParams } from '../helpers';
import Slider from './playback-slider';

const spotifyApi = new Spotify();
const CHECK_INTERVAL = 200;

class Transcriber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            active: false,
            playing: false,
            timeStamp: 0,
        }
        this.updateTimeStamp = this.updateTimeStamp.bind(this);
    }
    togglePlay() {
        spotifyApi.getMyCurrentPlaybackState()
            .then(res => {
                if (!res.is_playing) {
                    spotifyApi.play();
                    this.setState({ playing: true });
                } else {
                    spotifyApi.pause();
                    this.setState({ playing: false });
                }
            })
    }
    seekPosition(ms) {
        spotifyApi.seek(ms);
    }
    skipSeconds(ms) {
        spotifyApi.getMyCurrentPlaybackState()
            .then(response => { spotifyApi.seek(response.progress_ms + ms) });
    }
    getCurrentPosition() {
        spotifyApi.getMyCurrentPlaybackState()
            .then((res) => {
                return res.progress_ms
            })
    }
    getPlayback() {
        spotifyApi.getMyCurrentPlaybackState()
            .then((res) => {
                if (res.length === 0) {
                    console.log("You must be using an active Spotify session.");
                } else {
                    console.log("Success!");
                    this.setState({
                        active: true,
                        timeStamp: res.progress_ms
                    })
                    setInterval(this.updateTimeStamp, CHECK_INTERVAL);
                }
            })
    }
    updateTimeStamp() {
        spotifyApi.getMyCurrentPlaybackState()
            .then(res => {
                this.setState({ timeStamp: res.progress_ms });
            });
    }
    componentDidMount() {
        const params = getHashParams();
        if (params.access_token) {
            spotifyApi.setAccessToken(params.access_token)
        } else console.log("Not logged in")
        this.getPlayback();
    }
    render() {
        return (
            <div>
                <a href={"http://localhost:8888/"}>Log In</a>
                <button onClick={() => this.seekPosition(0)}>-</button>
                <button onClick={() => this.togglePlay()}>Play</button>
                <button onClick={() => this.skipSeconds(1000)}>Skip forward</button>
                <Slider timeStamp={this.state.timeStamp / 1000} />
            </div>
        )
    }
}

export default Transcriber;