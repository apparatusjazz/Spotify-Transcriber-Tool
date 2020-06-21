import React, { Component } from 'react'
import '../css/controls.css'
import Play from './play';
import loop from '../assets/loop.png';
import skipForward from '../assets/skip-forward.png';
import skipBack from '../assets/skip-back.png';
import beginning from '../assets/beginning.png';
import backPoint from '../assets/back-point.png';
import nextPoint from '../assets/next-point.png';
import plus from '../assets/plus.png';

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
                    onClick={() => this.skipSeconds(-2000)}
                />
                <Play togglePlay={this.props.togglePlay} playing={this.props.playing} />
                <img
                    className="btn skip"
                    src={skipForward} alt="skipFoward"
                    onClick={() => this.skipSeconds(3000)}
                />
                <img
                    className="btn"
                    id="loop-img"
                    src={loop}
                    alt="loop"
                    onClick={() => this.handleToggle()}
                />
                <div className="save-ctrls">
                    <img
                        className="btn skip-point"
                        src={backPoint}
                        alt="backPoint"
                        onClick={() => this.handleBack()}
                    />
                    <img
                        className="btn plus"
                        src={plus}
                        alt="plus"
                        onClick={() => this.handleClick()}
                    />
                    <img
                        className="btn skip-point"
                        src={nextPoint}
                        alt="nextPoint"
                        onClick={() => this.handleNext()}
                    />
                </div>
            </div>

        )
    }
}

export default Controls;