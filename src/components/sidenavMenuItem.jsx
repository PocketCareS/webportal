import React, { Component } from 'react';
import '../css/sidenavMenuItem.css';

class MenuItem extends Component {
    state = {
        icon: this.props.icon,
        text: this.props.text
    }
    render() {
        return (
            <div className="menu-item-container">
                <i className={'m-2 menu-item-icon ' + this.state.icon}></i>
                <span className="m-2 menu-item-text">{this.state.text}</span>
            </div>
        );
    }
}

export default MenuItem;