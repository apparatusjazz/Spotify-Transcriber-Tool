import React, { Component } from 'react'
import '../css/footer.css'


class Footer extends Component {

    render() {
        return (
            <div className="footer">
                <p id="credit" >Created by Maui Arcuri</p>
                <div id="info">
                    <p>Keyboard Controls
                    <div className="controls-layer">
                            <div className="row">
                                <span className="key-letter">U</span>
                                <span className="description"> : Skip back 10s</span>
                            </div>

                            <div className="row">
                                <span className="key-letter">I</span>
                                <span className="description"> : Skip back 100ms</span>
                            </div>

                            <div className="row">
                                <span className="key-letter">O</span>
                                <span className="description"> : Skip forward 10s</span>
                            </div>

                            <div className="row">
                                <span className="key-letter">P</span>
                                <span className="description"> : Skip forward 100ms</span>
                            </div>

                            <div className="row">
                                <span className="key-letter">H</span>
                                <span className="description"> : Place marker at current timestamp</span>
                            </div>

                            <div className="row">
                                <span className="key-letter">J</span>
                                <span className="description"> : Skip back 2s</span>
                            </div>

                            <div className="row">
                                <span className="key-letter">K</span>
                                <span className="description"> : Pause | Play</span>
                            </div>

                            <div className="row">
                                <span className="key-letter">L</span>
                                <span className="description"> : Skip forward 2s</span>
                            </div>

                            <div className="row">
                                <span className="key-letter">B</span>
                                <span className="description"> : Delete marker at current timestamp</span>
                            </div>

                            <div className="row">
                                <span className="key-letter">N</span>
                                <span className="description"> : Skip back to previous marker</span>
                            </div>

                            <div className="row">
                                <span className="key-letter">M</span>
                                <span className="description"> : Skip forward to next marker</span>
                            </div>

                        </div>
                    </p>
                </div>
            </div>
        )
    }
}

export default Footer;