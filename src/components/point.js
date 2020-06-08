import React, { Component } from 'react'
import '../css/point.css'

class Point extends Component {

    handleClick = () => {
        this.props.deletePoint(this.props.ms);
    }
    render() {
        let style = {};
        let handleMouseOver = () => {
            style = { display: "fixed" }
        }
        return (
            <div className="point"
                onMouseOver={handleMouseOver}
                style={{ left: this.props.left }} >
                <button
                    className="dlt-btn"
                    onClick={this.handleClick}
                    style={style}
                >
                    x
                </button>
                <p
                    className="point"
                >|
                </p>
            </div>

        )
    }
}

export default Point;