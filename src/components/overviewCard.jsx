import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../css/overviewCard.css';

class OverviewCard extends Component {
    state = {
        nyStateData: {}
    }

    async componentDidMount() {
        const response = await axios.get('https://covidtracking.com/api/states/daily');
        const nyData = response.data.filter(data => data.state === "NY")[0];
        this.setState({ nyStateData: nyData });
        console.log(this.state.nyStateData.date)
    }

    render() {
        return (
            <div className="card bg-light mb-3">
                <div className="card-header">Overview<span className="date-value">30 June 2020</span></div>
                <div className="card-body">
                    <p className="card-text">Total Confirmed Cases: <span className="data-value">393762</span></p>
                    <p className="card-text">Total Recovered: <span className="data-value">70487</span></p>
                    <p className="card-text">Daily Increase: <span className="data-value">625</span></p>
                </div>
            </div >
        );
    }
}

export default OverviewCard;