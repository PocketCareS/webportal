import React, { Component } from 'react';
import '../css/analyticsPage.css';
import ChartContainer from './chartContainer';
import CloseContactDistribution from '../charts/closeContactDistribution';
import TotalContactDuration from '../charts/totalContactDuration';

class AnalyticsPage extends Component {
    state = {
        graphs: [
            {
                title: "Close Contact Count Distribution",
                graphClass: <CloseContactDistribution />
            },
            {
                title: "Distribution of Total Contact Duration across all Users",
                graphClass: <TotalContactDuration />
            },
        ]
    }
    render() {
        return (
            <React.Fragment>
                <p className="pt-4 pl-4 pb-1 analytics-page-title">Analytics</p>
                <div className="analytics-page-container row">
                    {this.state.graphs.map(graph => (
                        <div className="col-6">
                            <ChartContainer title={graph.title}>
                                {graph.graphClass}
                            </ChartContainer>
                        </div>
                    ))}
                </div>
            </React.Fragment>

        );
    }
}

export default AnalyticsPage;