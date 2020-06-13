import React, { Component } from 'react'
import '../css/play.css'

class Play extends Component {

    handleClick(e) {
        this.props.togglePlay(e);
    }
    handleKeyPress(e) {
        if (e.key === "Space") {
            this.props.togglePlay(e);
        }
    }

    render() {
        const playing = this.props.playing ? "button pause" : "button play";
        const play = this.props.playing ? "Pause" : "Play";
        return (

            <button
                className={playing}
                onClick={(e) => this.handleClick(e)}
                onKeyDown={e => this.handleKeyPress(e)}
            ><span></span></button>

        )
    }
}

export default Play;