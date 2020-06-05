import React, { Component } from 'react'
import '../css/track-info.css'

class TrackInfo extends Component {
    render() {
        return (
            <div className="track-info">
                <img src={this.props.info.albumCover} alt="album cover" style={{ width: "220px" }} />
                <p>{this.props.info.trackName}</p>
                <p>{this.props.info.artist}</p>
            </div>
        )
    }
}

export default TrackInfo;