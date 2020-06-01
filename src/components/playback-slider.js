import React, { Component } from 'react'
import { Slider } from '@material-ui/core'


class PlaybackSlider extends Component {
    render() {
        return (
            <div>
                <Slider
                    id="playback-slider"
                    value={this.props.timeStamp}
                    aria-labelledby="continuous-slider"
                    min={50}
                    max={350}
                />
            </div>
        )
    }
}

export default PlaybackSlider;