import React, { Component } from 'react'
import '../css/track-info.css'
import spotifyLogo from "../assets/Spotify_Icon_RGB_Green.png"

class TrackInfo extends Component {
    render() {
        return (
            <div className="track-info">
                <img className="album-img" src={this.props.info.albumCover} alt="album cover" />
                <div className="text">
                    <a href={`https://open.spotify.com/track/${this.props.info.trackId}`} target="_blank" rel="noopener noreferrer">
                        <img id="spotify-link" src={spotifyLogo} alt="Spotify Track"></img>
                    </a>
                    <p id="track-name">{this.props.info.trackName}</p>
                    <p id="artist-name">{this.props.info.artist}</p>
                </div>
            </div>
        )
    }
}

export default TrackInfo;