import React, { Component } from 'react'
import '../css/point.css'

class Point extends Component {
    render() {

        return (
            <p
                className="point"
                style={{ left: this.props.left }} >|
            </p>
        )
    }
}

export default Point;