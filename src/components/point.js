import React, { Component } from 'react'
import '../css/point.css'

class Point extends Component {
    render() {

        return (
            <div>
                <p
                    className="point"
                    style={{ left: this.props.left }} >|</p>
            </div>
        )
    }
}

export default Point;