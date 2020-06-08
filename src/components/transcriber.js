import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import { getHashParams } from '../helpers';
import Slider from './playback-slider';
import TrackInfo from './track-info';
import SavePoint from './save-point';
import Point from './point';

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
            trackInfo: {
                artist: '',
                trackName: '',
                albumCover: ''
            }
        }
        this.updateTimeStamp = this.updateTimeStamp.bind(this);
        this.seekPosition = this.seekPosition.bind(this);
        this.setTimeStamp = this.setTimeStamp.bind(this);
        this.savePoint = this.savePoint.bind(this);
        this.skipToPoint = this.skipToPoint.bind(this);
        this.deletePoint = this.deletePoint.bind(this);
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
            }, (err) => console.log("A problem ocurred..."))
    }
    setTimeStamp(ms) {
        this.setState({ timeStamp: ms });
    }
    seekPosition(ms) {
        spotifyApi.seek(ms).then(() => {
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
    savePoint() {
        spotifyApi.getMyCurrentPlaybackState()
            .then(
                (res) => {
                    let points = this.state.savedPoints;
                    if (!points.includes(res.progress_ms)) {
                        points.push(res.progress_ms);
                        points.sort((a, b) => { return a - b });
                        this.setState({ savedPoints: points });
                    }
                },
                (err) => { console.log("An error occured!") }
            )
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
        })
        this.setState({ savedPoints: newPoints });
    }
    getCurrentPosition() {
        spotifyApi.getMyCurrentPlaybackState()
            .then((res) => {
                return res.progress_ms
            })
    }
    getPlayback() {
        spotifyApi.getMyCurrentPlaybackState()
            .then(
                (res) => {
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
                    }
                }, () => console.log("Not logged in!"))

    }
    updateTimeStamp() {
        spotifyApi.getMyCurrentPlaybackState()
            .then(res => {
                this.setState({ timeStamp: res.progress_ms });
            });
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
            }, (err) => console.log("A problem ocurred..."))
    }
    checkCurrent() {
        setInterval(() => {
            if (this.state.active && this.state.playing) {  //temporary for testing
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
            }
        }, CHECK_INTERVAL);
    }
    componentDidMount() {
        const params = getHashParams();
        if (params.access_token) {
            spotifyApi.setAccessToken(params.access_token)
        }
        this.getPlayback();
        this.checkCurrent();
        this.getTrackInfo();
    }
    render() {
        let seconds = Math.floor(this.state.timeStamp / 1000);
        let minutes = Math.floor(seconds / 60);
        let remainingSec = seconds % 60;
        let str = ":";
        if (remainingSec < 10) str = ":0";

        const point = ms => {
            let left = `${((ms - 1000) / this.state.duration) * 100}%`;
            return <Point
                key={ms}
                ms={ms}
                left={left}
                deletePoint={this.deletePoint}
            />
        };
        return (
            <div>
                <div className="saved-points">
                    {this.state.savedPoints.map(ms => {
                        return point(ms);
                    })}
                </div>
                <a href={"http://localhost:8888/"}>Log In</a>
                <button onClick={() => this.seekPosition(0)}>-</button>
                <button onClick={() => this.togglePlay()}>Play</button>
                <button onClick={() => this.skipSeconds(1000)}>Skip forward</button>
                <p>{minutes}{str}{remainingSec}</p>
                <Slider
                    timeStamp={this.state.timeStamp / 1000}
                    trackLength={this.state.duration / 1000}
                    changeTimeStamp={this.seekPosition}
                    setTimeStamp={this.setTimeStamp}
                />
                <SavePoint
                    savePoint={this.savePoint}
                    skipToPoint={this.skipToPoint}
                />
                <TrackInfo info={this.state.trackInfo} />
            </div>
        )
    }
}

export default Transcriber;