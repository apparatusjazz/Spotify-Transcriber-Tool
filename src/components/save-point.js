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
    render() {
        return (
            <div>
                <button onClick={() => this.handleBack()}>Last Point</button>
                <button onClick={() => this.handleClick()}>Save Point</button>
                <button onClick={() => this.handleNext()}>Next Point</button>
            </div>
        )
    }
}

export default SavePoint;