import React, { Component } from 'react';
import MenuItem from './sidenavMenuItem';
import '../css/sidenav.css';

class Sidenav extends Component {
    state = {
        menuItems: [
            { id: 1, icon: 'fa fa-line-chart', text: 'Analytics', link: '/analytics' },
            { id: 2, icon: 'fa fa-map-marker', text: 'Geo Fencing', link: '/geoFencing' }
        ]
    }

    render() {
        return (
            <div className="sidenav-body">
                <div className="menu-logo-container"></div>
                <div className="menu-items-container">
                    {this.state.menuItems.map(item => <MenuItem item={item} />)}
                </div>
            </div>
        );
    }
}

export default Sidenav;