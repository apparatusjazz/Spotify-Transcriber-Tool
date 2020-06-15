import React, { Component } from 'react'
import '../css/timestamp.css'

class TimeStamp extends Component {

    render() {
        let seconds = Math.floor(this.props.timeStamp / 1000);
        let minutes = Math.floor(seconds / 60);
        let remainingSec = seconds % 60;
        let str = ":";
        if (remainingSec < 10) str = ":0";
        return (
            <div className="timestamp">
                {minutes}{str}{remainingSec}
            </div>
        )
    }
}

export default TimeStamp;