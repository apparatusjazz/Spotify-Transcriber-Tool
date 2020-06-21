import React, { Component } from 'react'
import '../css/controls.css'
import Play from './play';
import loop from '../assets/loop.png';
import skipForward from '../assets/skip-forward.png';
import skipBack from '../assets/skip-back.png';
import beginning from '../assets/beginning.png';

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
                <img
                    className="btn to-beginning"
                    src={beginning} alt="beginning"
                    onClick={() => this.seekPosition(0)}
                />
                <img
                    className="btn skip"
                    src={skipBack} alt="skipBack"
                    onClick={() => this.seekPosition(0)}
                />
                <Play togglePlay={this.props.togglePlay} playing={this.props.playing} />
                <img
                    className="btn skip"
                    src={skipForward} alt="skipFoward"
                    onClick={() => this.skipSeconds(1000)}
                />
                <img
                    className="btn"
                    id="loop-img" src={loop}
                    alt="loop"
                    onClick={() => this.handleToggle()}
                />
                <div className="save-ctrls">
                    <button className="to-pnt" onClick={() => this.handleBack()}>&lt;</button>
                    <button className="save-pnt" onClick={() => this.handleClick()}>+</button>
                    <button className="to-pnt" onClick={() => this.handleNext()}>&gt;</button>
                </div>
            </div>

        )
    }
}

export default Controls;