import React, { Component } from 'react'
import '../css/point.css'

class Point extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverActive: false,
        }
    }
    handleClick = () => {
        this.props.deletePoint(this.props.ms);
    }
    handleMouseOver = () => {
        this.setState({ hoverActive: true })
    }
    handleMouseLeave = () => {
        this.setState({ hoverActive: false })
    }
    addLoopPoint = () => {
        this.props.addLoopPoint(this.props.ms);
    }
    render() {
        let displayStyle = this.state.hoverActive ? "inline-block" : "none";

        return (
            <div className="point"
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
                style={{ left: this.props.left }}
            >
                <div className="tooltip" style={{ display: displayStyle }}>
                    <button onClick={this.addLoopPoint}>
                        s
                    </button>
                    <button onClick={this.handleClick}>
                        x
                    </button>
                </div>

                <p className="point">
                    |
                </p>
            </div>

        )
    }
}

export default Point;