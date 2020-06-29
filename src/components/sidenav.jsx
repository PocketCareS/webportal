import React, { Component } from 'react';
import MenuItem from './sidenavMenuItem';
import '../css/sidenav.css';

class Sidenav extends Component {
    state = {
        menuItems: [
            {
                title: 'University Data',
                data: [
                    { id: 1, icon: 'fa fa-line-chart', text: 'Analytics', link: '/analytics' },
                    { id: 2, icon: 'fa fa-map-marker', text: 'Geo Fencing', link: '/geoFencing' }
                ]
            }, {
                title: 'State Data',
                data: [
                    { id: 3, icon: 'fa fa-bar-chart', text: 'NY Analytics', link: '/nyAnalytics' }
                ]
            }
        ]
    }

    render() {
        return (
            <div className="sidenav-body">
                <div className="menu-logo-container">
                    <img className="logo" src={require('../images/logo.png')} alt="" loading="lazy" />
                </div>
                <div className="menu-items-container">
                    {this.state.menuItems.map(item => (
                        <React.Fragment>
                            <span className="item-title">{item.title}</span>
                            <span>{item.data.map(data => <MenuItem data={data} />)}</span>
                            <p className="mt-2"></p>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    }
}

export default Sidenav;