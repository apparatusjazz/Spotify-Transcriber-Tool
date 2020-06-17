import React, { Component } from 'react'
import '../css/controls.css'
import Play from './play';

class Controls extends Component {
    handleBack() {
        this.props.skipToPoint(0);
    }
    handleClick() {
        this.props.savePoint();
    }
    handleNext() {
        this.props.skipToPoint(1);
    }
    handleToggle() {
        this.props.toggleLoop();
    }
    seekPosition(ms) {
        this.props.seekPosition(ms);
    }
    skipSeconds(ms) {
        this.props.skipSeconds(ms);
    }
    render() {
        return (
            <div>
                <button className="prev" onClick={() => this.seekPosition(0)}>-</button>
                <Play togglePlay={this.props.togglePlay} playing={this.props.playing} />
                <button onClick={() => this.skipSeconds(1000)}>Skip forward</button>
                <div className="save-ctrls">
                    <button className="to-pnt" onClick={() => this.handleBack()}>&lt;</button>
                    <button className="save-pnt" onClick={() => this.handleClick()}>+</button>
                    <button className="to-pnt" onClick={() => this.handleNext()}>&gt;</button>
                    <button onClick={() => this.handleToggle()}>Toggle Loop</button>
                </div>
            </div>

        )
    }
}

export default Controls;