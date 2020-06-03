import React, { Component } from 'react'


class TrackInfo extends Component {
    render() {
        return (
            <div>
                <img src={this.props.info.albumCover} style={{ width: "200px" }} />
                <p>{this.props.info.artist}</p>
                <p>{this.props.info.trackName}</p>
            </div>
        )
    }
}

export default TrackInfo;