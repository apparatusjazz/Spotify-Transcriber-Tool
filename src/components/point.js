import React, { Component } from 'react'
import '../css/point.css'
import TimeStamp from './timestamp';

class Point extends Component {
    handleClick = () => {
        this.props.deletePoint(this.props.ms);
    }
    addLoopPoint = () => {
        this.props.addLoopPoint(this.props.ms);
    }
    render() {
        let toggleAddLoopPoint = this.props.loopPoints.includes(this.props.ms) ? "-" : "+";
        let pointColor = this.props.loopPoints.includes(this.props.ms) ? "red" : "white";
        return (
            <div className="point"
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
                style={{ left: this.props.left }}
            >
                <div className="tooltip" >
                    <TimeStamp timeStamp={this.props.ms} />
                    <button onClick={this.addLoopPoint}>
                        {toggleAddLoopPoint}
                    </button>
                    <button onClick={this.handleClick}>
                        x
                    </button>
                </div>

                <p className="point" style={{ color: pointColor }}>
                    |
                </p>
            </div>

        )
    }
}

export default Point;