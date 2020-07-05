import React, { Component } from 'react';
import '../css/nyAnalyticsPage.css';
import OverviewCard from './overviewCard';
import ChartContainer from './chartContainer';
import NYDailyCases from '../charts/nyDailyCases';
import axios from 'axios';
import moment from 'moment';

class NYAnalytics extends Component {
    state = {
        cardData: {
            header: "",
            date: "",
            data: []
        }
    }

    async componentDidMount() {
        const response = await axios.get('https://covidtracking.com/api/states/daily');
        const nyData = response.data.filter(data => data.state === "NY")[0];
        const confirmedCases = {
            title: "Total Confirmed Cases",
            value: nyData.positive
        }
        const recovered = {
            title: "Total Recovered",
            value: nyData.recovered
        }
        const dailyIncrease = {
            title: "Daily Increase",
            value: nyData.positiveIncrease
        }
        let cardData = { ...this.state.cardData }
        cardData.header = "Overview";
        cardData.date = moment(nyData.date.toString()).subtract(1, "days").format("D MMMM YYYY");
        cardData.data.push(confirmedCases);
        cardData.data.push(recovered);
        cardData.data.push(dailyIncrease);
        this.setState({ cardData });
    }

    render() {
        return (
            <React.Fragment>
                <p className="ny-analytics-page-title">New York State - Analytics</p>
                <div className="ny-analytics-page-container row">
                    <div className="col-3">
                        <OverviewCard cardData={this.state.cardData} />
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