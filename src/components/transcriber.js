import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Transcriber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            playing: false,
            timeStamp: 0,
        }
    }
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    getNowPlaying() {
        spotifyWebApi.getMyCurrentPlaybackState()
            .then((response) => {
                console.log(response);
            })
    }
    togglePlay() {
        if (!this.state.playing) {
            spotifyWebApi.play();
            this.setState({ playing: true });
        } else {
            spotifyWebApi.pause();
            this.setState({ playing: false });
        }
    }
    seekPosition(ms) {
        spotifyWebApi.seek(ms);
    }
    skipSeconds(ms) {
        spotifyWebApi.getMyCurrentPlaybackState()
            .then((response) => {
                spotifyWebApi.seek(response.progress_ms + ms);
            });
    }
    getCurrentPosition() {
        spotifyWebApi.getMyCurrentPlaybackState()
            .then((res) => {
                return res.progress_ms
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount() {
        const params = this.getHashParams();
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token);
        }
        this.getNowPlaying();
    }
    render() {
        return (
            <div>
                <button onClick={() => this.seekPosition(0)}>-</button>
                <button onClick={() => this.togglePlay()}>Play</button>
                <button onClick={() => this.skipSeconds(1000)}>Skip forward</button>

            </div>
        )
    }
}

export default Transcriber;