import React, { Component } from 'react';
import '../css/chartContainer.css';
import CloseContactDistribution from '../charts/closeContactDistribution';
import TotalContactDuration from '../charts/totalContactDuration';

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
                    {this.graphToRender()}
                </div>
            </div>
        );
    }

    graphToRender = () => {
        if (this.state.graphToDisplay === "CloseContactDistribution") return <CloseContactDistribution />
        else return <TotalContactDuration />
    }
}

export default ChartContainer;