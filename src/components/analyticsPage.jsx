import React, { Component } from 'react';
import '../css/analyticsPage.css';
import ChartContainer from './chartContainer';
import CloseContactDistribution from '../charts/closeContactDistribution';

class AnalyticsPage extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <p className="pt-4 pl-4 pb-1 analytics-page-title">Analytics</p>
                <div className="analytics-page-container row">
                    <div className="col-6">
                        <ChartContainer title={"Close Contact Count Distribution"} graphToDisplay={"CloseContactDistribution"} />
                    </div>
                    <div className="col-6">
                        <ChartContainer title={"Duration of Total Contact Duration across all Users"} />
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default AnalyticsPage;