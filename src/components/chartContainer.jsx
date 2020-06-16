import React, { Component } from 'react';
import '../css/chartContainer.css';

class ChartContainer extends Component {
    state = {}
    render() {
        return (
            <div className="chart-container">
                <div className="chart-container-title"></div>
                <div className="chart-container-body"></div>
            </div>
        );
    }
}

export default ChartContainer;