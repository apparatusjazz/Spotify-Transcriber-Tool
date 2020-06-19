import React, { Component } from 'react'
import '../css/controls.css'
import Play from './play';
import loop from '../loop.png';

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
                <button className="to-pnt" onClick={() => this.seekPosition(0)}>&lt;</button>
                <Play togglePlay={this.props.togglePlay} playing={this.props.playing} />
                <button className="to-pnt" onClick={() => this.skipSeconds(1000)}>&gt;</button>
                <div className="save-ctrls">
                    <button className="to-pnt" onClick={() => this.handleBack()}>&lt;</button>
                    <button className="save-pnt" onClick={() => this.handleClick()}>+</button>
                    <button className="to-pnt" onClick={() => this.handleNext()}>&gt;</button>
                    <img style={{ position: 'absolute' }} id="loop-img" src={loop} alt="loop" onClick={() => this.handleToggle()} />
                </div>
            </div>

        )
    }
}

export default Controls;