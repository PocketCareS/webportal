import React, { Component } from 'react';
import '../css/analyticsPage.css';
import ChartContainer from './chartContainer';
import CloseContactDistribution from '../charts/closeContactDistribution';
import TotalContactDuration from '../charts/totalContactDuration';
import OverviewCard from './overviewCard';
import axios from 'axios';
import moment from 'moment';
import HealthStatusTrend from '../charts/healthStatusTrend';

class AnalyticsPage extends Component {
    state = {}

    constructor(props) {
        super(props);
        const currentDate = new Date()
        let targetStartDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1, 12, 0, 0);
        const targetEndDateTime = targetStartDateTime.getTime();
        targetStartDateTime.setDate(targetStartDateTime.getDate() - 15);
        this.state = {
            startDateEpoch: targetStartDateTime.valueOf(),
            endDateEpoch: targetEndDateTime,
            healthCardData: {
                header: "",
                date: "",
                data: []
            },
            graphs: [
                {
                    title: "Number of Close Encounters (Daily)",
                    graphClass: "CloseContactDistribution",
                },
                {
                    title: "Total Duration of Close Encounters (Daily)",
                    graphClass: "TotalContactDuration"
                },
            ]
        }

    }

    async componentDidMount() {
        const response = await axios.get('https://pcpprd-app.acsu.buffalo.edu/analytics/health?startDate=' + this.state.startDateEpoch + '&endDate=' + this.state.endDateEpoch);
        const latestData = response.data.dateWiseHealthAnalytics[this.state.endDateEpoch]
        console.log(moment(new Date(this.state.endDateEpoch)).format('D MMMM YYYY'))
        const totalUsers = {
            title: "Total Users",
            value: latestData.totalUsers
        }
        const filled = {
            title: "Health Reports Available",
            value: latestData.filled
        }
        const healthy = {
            title: "Healthy",
            value: latestData.healthy
        }
        const unhealthy = {
            title: "Unhealthy",
            value: latestData.notHealthy
        }
        let healthCardData = { ...this.state.healthCardData }
        healthCardData.header = "Overview"
        healthCardData.date = moment(new Date(this.state.endDateEpoch)).format('D MMMM YYYY');
        healthCardData.data.push(totalUsers);
        healthCardData.data.push(filled);
        healthCardData.data.push(healthy);
        healthCardData.data.push(unhealthy);
        this.setState({ healthCardData });
    }

    render() {
        return (
            <React.Fragment>
                <p className="title">Health Status</p>
                <div className="analytics-page-container row">
                    <div className="col-3">
                        <OverviewCard cardData={this.state.healthCardData} />
                    </div>
                    <div className="col-9">
                        <ChartContainer title={"Health Status - Trend"}>
                            <HealthStatusTrend />
                        </ChartContainer>
                    </div>
                </div>
                <p className="title">Analytics</p>
                <div className="analytics-page-container row">
                    {this.state.graphs.map(graph => (
                        <div className="col-6">
                            <ChartContainer title={graph.title}>
                                {this.graphToRender(graph)}
                            </ChartContainer>
                        </div>
                    ))}
                </div>
            </React.Fragment>

        );
    }

    graphToRender = (graph) => {
        if (graph.graphClass === "CloseContactDistribution") return <CloseContactDistribution startDateEpoch={this.state.startDateEpoch} endDateEpoch={this.state.endDateEpoch} />
        else if (graph.graphClass === "TotalContactDuration") return <TotalContactDuration startDateEpoch={this.state.startDateEpoch} endDateEpoch={this.state.endDateEpoch} />
    }
}

export default AnalyticsPage;