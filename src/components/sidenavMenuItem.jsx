import React, { Component } from 'react';
import '../css/sidenavMenuItem.css';
import { Link, NavLink } from 'react-router-dom';

class MenuItem extends Component {
    state = {
        icon: this.props.item.icon,
        text: this.props.item.text,
        link: this.props.item.link
    }
    render() {
        return (
            <div>
                <NavLink to={this.state.link} activeClassName="menu-item-container-selected" className="menu-item-container" style={{ textDecoration: 'none' }}>
                    <i className={'m-2 menu-item-icon ' + this.state.icon}></i>
                    <span className="m-2 menu-item-text">{this.state.text}</span>
                </NavLink>
            </div>
        );
    }
}

export default MenuItem;