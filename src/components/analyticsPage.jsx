import React, { Component } from 'react';
import '../css/analyticsPage.css';
import ChartContainer from './chartContainer';
import CloseContactDistribution from '../charts/closeContactDistribution';
import TotalContactDuration from '../charts/totalContactDuration';

class AnalyticsPage extends Component {
    state = {}

    constructor(props) {
        super(props);
        const currentDate = new Date()
        let targetStartDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0);
        const targetEndDateTime = targetStartDateTime.getTime();
        targetStartDateTime.setDate(targetStartDateTime.getDate() - 7);
        this.state = {
            graphs: [
                {
                    title: "Close Contact Count Distribution",
                    startDateEpoch: targetStartDateTime.valueOf(),
                    endDateEpoch: targetEndDateTime,
                    graphClass: "CloseContactDistribution",
                },
                {
                    title: "Distribution of Total Contact Duration across all Users",
                    startDateEpoch: targetStartDateTime.valueOf(),
                    endDateEpoch: targetEndDateTime,
                    graphClass: "TotalContactDuration"
                },
            ]
        }

    }
    render() {
        return (
            <React.Fragment>
                <p className="analytics-page-title">Analytics</p>
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
        if (graph.graphClass === "CloseContactDistribution") return <CloseContactDistribution startDateEpoch={graph.startDateEpoch} endDateEpoch={graph.endDateEpoch} />
        else if (graph.graphClass === "TotalContactDuration") return <TotalContactDuration startDateEpoch={graph.startDateEpoch} endDateEpoch={graph.endDateEpoch} />
    }
}

export default AnalyticsPage;