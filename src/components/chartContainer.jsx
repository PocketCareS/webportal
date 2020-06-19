import React, { Component } from 'react';
import '../css/chartContainer.css';

class ChartContainer extends Component {
    state = {
        title: this.props.title,
        graphToDisplay: this.props.graphToDisplay
    }
    render() {
        return (
            <div className="chart-container">
                <div className="chart-container-title">{this.state.title}</div>
                <div className="chart-container-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ChartContainer;