import React, { Component } from 'react'
import { Slider } from '@material-ui/core'


class PlaybackSlider extends Component {
    handleMouseUp(event) {
        let time = parseInt(event.target.getAttribute("aria-valuenow"));
        this.props.changeTimeStamp(time);
    }
    handleChange(e, value) {
        this.props.setTimeStamp(value);
    }
    render() {
        return (
            <div>
                <Slider
                    id="playback-slider"
                    onChange={(e, val) => this.handleChange(e, val)}
                    onMouseUp={(e) => this.handleMouseUp(e)}
                    value={this.props.timeStamp}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={this.props.trackLength}
                />
            </div>
        )
    }
}

export default PlaybackSlider;
