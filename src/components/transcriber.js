import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import { getHashParams, draw } from '../helpers';
import Slider from './playback-slider';
import TrackInfo from './track-info';
import Point from './point';
import TimeStamp from './timestamp';
import Controls from './controls';
import '../css/transcriber.css';
import Footer from './footer';

const spotifyApi = new Spotify();
const CHECK_INTERVAL = 1000;         // Interval to update timeStamp

class Transcriber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            active: false,
            playing: false,
            timeStamp: 0,
            duration: 0,
            savedPoints: [],
            loopPoints: [],
            loopActive: false,
            trackInfo: {
                artist: '',
                trackName: '',
                albumCover: ''
            }
        }
        this.togglePlay = this.togglePlay.bind(this);
        this.updateTimeStamp = this.updateTimeStamp.bind(this);
        this.seekPosition = this.seekPosition.bind(this);
        this.skipSeconds = this.skipSeconds.bind(this);
        this.setTimeStamp = this.setTimeStamp.bind(this);
        this.savePoint = this.savePoint.bind(this);
        this.skipToPoint = this.skipToPoint.bind(this);
        this.deletePoint = this.deletePoint.bind(this);
        this.addLoopPoint = this.addLoopPoint.bind(this);
        this.toggleLoop = this.toggleLoop.bind(this);
        this.removeLoopPoints = this.removeLoopPoints.bind(this);
        this.point = this.point.bind(this);
    }
    togglePlay() {
        spotifyApi.getMyCurrentPlaybackState()
            .then(res => {
                if (!res.is_playing) {
                    spotifyApi.play().catch(e => { console.log() });
                    this.setState({ playing: true });
                } else {
                    spotifyApi.pause().catch(e => { console.log() });
                    this.setState({
                        playing: false,
                        timeStamp: res.progress_ms
                    });
                }
            })
            .catch(e => { console.log() })
    }
    setTimeStamp(ms) {
        this.setState({ timeStamp: ms });
    }
    seekPosition(ms) {
        spotifyApi.seek(ms).then(() => {
            this.setState({ timeStamp: ms });
        }).catch(e => { console.log() })
    }
    skipSeconds(ms) {
        spotifyApi.seek(this.state.timeStamp + ms)
            .then(() => {
                return spotifyApi.getMyCurrentPlaybackState();
            }).then(res => {
                this.setState({ timeStamp: res.progress_ms })
            })
            .catch(e => { console.log() })

    }
    savePoint() {
        spotifyApi.getMyCurrentPlaybackState()
            .then(
                (res) => {
                    let points = this.state.savedPoints;
                    if (!points.includes(res.progress_ms) && !this.state.playing) {
                        points.push(res.progress_ms);
                    }
                    else if (!points.includes(res.progress_ms - 500) && res.progress_ms > 500) {
                        points.push(res.progress_ms - 500);
                    }
                    points.sort((a, b) => { return a - b });
                    this.setState({ savedPoints: points });
                }
            ).catch(e => { console.log() })
    }
    skipToPoint(val) {
        let current = this.state.timeStamp;
        let points = this.state.savedPoints;
        let seek = 0;

        if (points.length >= 1) {
            if (current <= points[0]) {
                if (val === 0)
                    return;
                else {
                    if (current === points[0]) seek = points[1];
                    else seek = points[0];
                }
            } else if (current >= points[points.length - 1]) {
                if (val === 0) {
                    if (current === points[points.length - 1])
                        seek = points[points.length - 2];
                    else seek = points[points.length - 1];
                }
                else return;
            } else {
                for (let i = 0; i < points.length; i++) {
                    if (points[i] >= current) {
                        if (val === 0) {
                            seek = points[i - 1];
                        } else {
                            if (points[i] > current)
                                seek = points[i];
                            else seek = points[i + 1]
                        }
                        break;
                    }
                }
            }
        } else return;
        this.seekPosition(seek);
    }
    deletePoint(key) {
        let newPoints = this.state.savedPoints.filter(val => {
            return val !== key;
        });
        if (this.state.loopPoints.includes(key)) {
            let newLoopPoints = this.state.loopPoints.filter(el => {
                return el !== key;
            })
            this.setState({ loopPoints: newLoopPoints });
        }
        this.setState({ savedPoints: newPoints });
    }
    addLoopPoint(point) {
        let newPoints = this.state.loopPoints;
        if (this.state.loopPoints.includes(point)) {
            newPoints = this.state.loopPoints.filter(val => {
                return val !== point;
            });
        }
        else if (this.state.loopPoints.length < 2 && this.state.loopPoints[0] !== point) {
            newPoints.push(point);
            if (newPoints.length === 2) {
                newPoints.sort((a, b) => { return a - b });
            }
        }
        this.setState({ loopPoints: newPoints })
    }
    removeLoopPoints() {
        this.setState({ loopPoints: [] });
    }
    toggleLoop() {
        this.setState({ loopActive: !this.state.loopActive });
    }
    getCurrentPosition() {
        spotifyApi.getMyCurrentPlaybackState()
            .then((res) => {
                return res.progress_ms
            }).catch(e => { console.log() })
    }
    getPlayback() {
        spotifyApi.getMyCurrentPlaybackState()
            .then(
                (res) => {
                    if (res.length === 0) {
                        console.log("You must be using an active Spotify session.");
                        this.setState({ active: false });
                    } else {
                        console.log("Success!");
                        this.setState({
                            loggedIn: true,
                            active: true,
                            playing: res.is_playing,
                            timeStamp: res.progress_ms,
                            duration: res.item.duration_ms
                        });
                        this.getTrackInfo();
                    }
                }, () => {
                    console.log("Not logged in!");
                    this.setState({ loggedIn: false })
                }).catch(e => { console.log() })
    }
    updateTimeStamp() {
        spotifyApi.getMyCurrentPlaybackState()
            .then(res => {
                this.setState({ timeStamp: res.progress_ms });
            }).catch(e => { console.log() });
    }
    handKeyPress(e) {
        if (this.state.active && this.state.loggedIn) {
            switch (e.key) {
                case "k":
                    this.togglePlay();
                    break;
                case "j":
                    if (this.state.timeStamp > 3000)
                        this.skipSeconds(-3000);
                    else this.seekPosition(0);
                    break;
                case "l":
                    this.skipSeconds(2000);
                    break;
                case "o":
                    this.skipSeconds(10000);
                    break;
                case "u":
                    if (this.state.timeStamp > 10000)
                        this.skipSeconds(-10000);
                    else this.seekPosition(0);
                    break;
                case "i":
                    if (this.state.timeStamp > 100)
                        this.skipSeconds(-100);
                    else this.seekPosition(0);
                    break;
                case "p":
                    this.skipSeconds(100);
                    break;
                case "h":
                    this.savePoint();
                    break;
                case "m":
                    this.skipToPoint(1);
                    break;
                case "n":
                    this.skipToPoint(0);
                    break;
                case "b":
                    if (this.state.savedPoints.includes(this.state.timeStamp))
                        this.deletePoint(this.state.timeStamp);
                    break;
                default: return;
            }
        }
    }
    getTrackInfo() {
        spotifyApi.getMyCurrentPlayingTrack()
            .then(res => {
                this.setState({
                    trackInfo: {
                        artist: res.item.artists[0].name,
                        trackName: res.item.name,
                        albumCover: res.item.album.images[0].url
                    }
                })
            }).catch(e => { console.log() })
    }
    checkCurrent() {
        setInterval(() => {
            if (this.state.loggedIn && this.state.active && this.state.playing) {
                spotifyApi.getMyCurrentPlaybackState()
                    .then(res => {

                        if (res.is_playing && (res.item.name === this.state.trackInfo.trackName)) {
                            let ts = this.state.timeStamp;  //Handle looping
                            if (this.state.loopActive && this.state.loopPoints.length === 2 &&
                                this.state.timeStamp > this.state.loopPoints[1] - 1500) {

                                ts = this.state.loopPoints[0];
                                spotifyApi.seek(ts);
                                this.setState({ timeStamp: ts });
                            } else {
                                this.setState({
                                    timeStamp: ts + CHECK_INTERVAL,
                                    playing: res.is_playing
                                });
                            }
                        }
                        else if (res.item.name !== this.state.trackInfo.trackName) {
                            this.getTrackInfo();
                            this.getPlayback();
                            this.setState({
                                savedPoints: []
                            });
                        }
                    }).catch(e => { console.log() })
            }
        }, CHECK_INTERVAL);
    }
    componentDidMount() {
        const params = getHashParams();
        if (params.access_token) {
            spotifyApi.setAccessToken(params.access_token);
            this.setState({ loggedIn: true });
        }
        this.getPlayback();
        this.checkCurrent();

        window.addEventListener("keypress", (e) => {
            this.handKeyPress(e);
        });
    }
    point(ms) {
        let left = `${(((ms - 1000) / this.state.duration) * 90) + 5}%`;
        return <Point
            key={ms}
            ms={ms}
            left={left}
            loopPoints={this.state.loopPoints}
            deletePoint={this.deletePoint}
            addLoopPoint={this.addLoopPoint}
        />
    };
    render() {

        if (this.state.loggedIn && this.state.active) {
            return (
                <div
                    className="main"
                >
                    <h1 id="header">Transcribifi</h1>
                    <TrackInfo info={this.state.trackInfo} />
                    <TimeStamp className="timestamp" timeStamp={this.state.timeStamp} />
                    <Slider
                        timeStamp={this.state.timeStamp}
                        trackLength={this.state.duration}
                        changeTimeStamp={this.seekPosition}
                        setTimeStamp={this.setTimeStamp}
                        point={this.point}
                        savedPoints={this.state.savedPoints}
                    />
                    <Controls
                        seekPosition={this.seekPosition}
                        skipSeconds={this.skipSeconds}
                        togglePlay={this.togglePlay}
                        playing={this.state.playing}
                        savePoint={this.savePoint}
                        skipToPoint={this.skipToPoint}
                        toggleLoop={this.toggleLoop}
                        removeLoopPoints={this.removeLoopPoints}
                    />
                    <Footer />
                </div>)
        } else if (this.state.loggedIn && !this.state.active) {
            return (<div>
                <h1 id="header">Transcribifi</h1>
                <h2 id="active" >Spotify must be active to use this tool...</h2>
            </div>)
        }
        else {
            return (<div>
                <h1 id="header">Transcribifi</h1>
                <a id="login-btn" href={"http://localhost:8888/login"}>Login</a>
            </div>)
        }
    }
}

export default Transcriber;