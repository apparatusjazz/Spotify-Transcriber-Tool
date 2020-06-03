import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import { getHashParams } from '../helpers';
import Slider from './playback-slider';

const spotifyApi = new Spotify();
const CHECK_INTERVAL = 500;         // Interval to update timeStamp

class Transcriber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            active: false,
            playing: false,
            timeStamp: 0,
            duration: 0,
            trackInfo: {
                artist: '',
                trackName: '',
                albumCover: ''
            }
        }
        this.updateTimeStamp = this.updateTimeStamp.bind(this);
        this.seekPosition = this.seekPosition.bind(this);
        this.setTimeStamp = this.setTimeStamp.bind(this);
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
    setTimeStamp(ms) {
        this.setState({ timeStamp: ms });
    }
    seekPosition(ms) {
        spotifyApi.seek(ms).then(res => {
            this.setState({ timeStamp: ms });
        })
    }
    skipSeconds(ms) {
        spotifyApi.seek(this.state.timeStamp + ms)
            .then(() => {
                return spotifyApi.getMyCurrentPlaybackState();
            }).then(res => {
                this.setState({ timeStamp: res.progress_ms })
            })

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
                        playing: res.is_playing,
                        timeStamp: res.progress_ms,
                        duration: res.item.duration_ms
                    })
                    //setInterval(this.updateTimeStamp, CHECK_INTERVAL);
                }
            })
    }
    updateTimeStamp() {
        spotifyApi.getMyCurrentPlaybackState()
            .then(res => {
                this.setState({ timeStamp: res.progress_ms });
            });
    }
    checkCurrent() {
        setInterval(() => {
            spotifyApi.getMyCurrentPlaybackState()
                .then(res => {
                    // if (res.progress_ms < this.state.timeStamp + 1000 || res.progress_ms > this.state.timeStamp - 1000) {
                    //     this.setState({ timeStamp: res.progress_ms });
                    // }
                    if (res.is_playing) {
                        this.setState({
                            timeStamp: this.state.timeStamp + CHECK_INTERVAL,
                            playing: res.is_playing
                        });
                    }
                })
        }, CHECK_INTERVAL);
    }
    componentDidMount() {
        const params = getHashParams();
        if (params.access_token) {
            spotifyApi.setAccessToken(params.access_token)
        } else console.log("Not logged in")
        this.getPlayback();
        this.checkCurrent();
    }
    render() {
        return (
            <div>
                <a href={"http://localhost:8888/"}>Log In</a>
                <button onClick={() => this.seekPosition(0)}>-</button>
                <button onClick={() => this.togglePlay()}>Play</button>
                <button onClick={() => this.skipSeconds(1000)}>Skip forward</button>
                <p>{this.state.timeStamp / 1000}</p>
                <Slider
                    timeStamp={this.state.timeStamp / 1000}
                    trackLength={this.state.duration / 1000}
                    changeTimeStamp={this.seekPosition}
                    setTimeStamp={this.setTimeStamp}
                />
            </div>
        )
    }
}

export default Transcriber;