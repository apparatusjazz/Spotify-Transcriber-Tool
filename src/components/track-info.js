import React, { Component } from 'react'
import '../css/track-info.css'

class TrackInfo extends Component {
    render() {
        return (
            <div className="track-info">
                <img className="album-img" src={this.props.info.albumCover} alt="album cover" />
                <div className="text">
                    <p id="track-name">{this.props.info.trackName}</p>
                    <p id="artist-name">{this.props.info.artist}</p>
                </div>
            </div>
        )
    }
}

export default TrackInfo;