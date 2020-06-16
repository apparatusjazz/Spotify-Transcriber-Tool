import React, { Component } from 'react'
import '../css/save-point.css'

class SavePoint extends Component {
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
    render() {
        return (
            <div className="save-ctrls">
                <button className="to-pnt" onClick={() => this.handleBack()}>&lt;</button>
                <button className="save-pnt" onClick={() => this.handleClick()}>+</button>
                <button className="to-pnt" onClick={() => this.handleNext()}>&gt;</button>
                <button onClick={() => this.handleToggle()}>Toggle Loop</button>
            </div>
        )
    }
}

export default SavePoint;