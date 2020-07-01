import React, { Component } from 'react';
import '../css/analyticsPage.css';
import ChartContainer from './chartContainer';
import CloseContactDistribution from '../charts/closeContactDistribution';
import TotalContactDuration from '../charts/totalContactDuration';

class AnalyticsPage extends Component {
    state = {}

    constructor(props) {
        super(props);
        let targetDate = new Date()
        targetDate.setDate(targetDate.getDate() - 7);
        this.state = {
            graphs: [
                {
                    title: "Close Contact Count Distribution",
                    startDateEpoch: new Date(1592236800000),
                    graphClass: "CloseContactDistribution",
                },
                {
                    title: "Distribution of Total Contact Duration across all Users",
                    startDateEpoch: new Date(1592236800000),
                    graphClass: "TotalContactDuration"
                },
            ]
        }

    }
    render() {
        return (
            <React.Fragment>
                <p className="pl-4 pb-1 analytics-page-title">Analytics</p>
                <div className="analytics-page-container row">
                    {this.state.graphs.map(graph => (
                        <div className="col-6">
                            <ChartContainer title={graph.title} startDateEpoch={graph.startDateEpoch}>
                                {this.graphToRender(graph)}
                            </ChartContainer>
                        </div>
                    ))}
                </div>
            </React.Fragment>

        );
    }

    graphToRender = (graph) => {
        if (graph.graphClass === "CloseContactDistribution") return <CloseContactDistribution startDateEpoch={graph.startDateEpoch} />
        else if (graph.graphClass === "TotalContactDuration") return <TotalContactDuration startDateEpoch={graph.startDateEpoch} />
    }
}

export default AnalyticsPage;