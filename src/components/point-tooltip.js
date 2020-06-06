import React, { Component } from 'react'
// import '../css/point-tooltip.css'

class PointTooltip extends Component {
    handleClick = () => {
        this.props.deletePoint(this.props.key);
    }
    render() {
        return (
            <div className="point-tooltip">
                <button
                    className="dlt-btn"
                    onClick={this.handleClick}
                >
                    x
                </button>
            </div>
        )
    }
}

export default PointTooltip;