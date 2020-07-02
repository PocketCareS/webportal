import React, { Component } from 'react';
import '../css/nyAnalyticsPage.css';
import OverviewCard from './overviewCard';
import ChartContainer from './chartContainer';
import NYDailyCases from '../charts/nyDailyCases';

class NYAnalytics extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <p className="ny-analytics-page-title">New York State - Analytics</p>
                <div className="ny-analytics-page-container row">
                    <div className="col-3">
                        <OverviewCard />
                    </div>
                    <div className="col-9">
                        <ChartContainer title={"Daily Trend"}>
                            <NYDailyCases />
                        </ChartContainer>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NYAnalytics;