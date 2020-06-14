import React, { Component } from 'react'

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
            <div>
                <button onClick={() => this.handleBack()}>Last Point</button>
                <button onClick={() => this.handleClick()}>Save Point</button>
                <button onClick={() => this.handleNext()}>Next Point</button>
                <button onClick={() => this.handleToggle()}>Toggle Loop</button>
            </div>
        )
    }
}

export default SavePoint;