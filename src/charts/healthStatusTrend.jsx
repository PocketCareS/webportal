import React, { Component } from 'react';
import Highcharts from 'highcharts';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

class HealthStatusTrend extends Component {
    state = {
    }

    constructor(props) {
        super(props);
        const currentDate = new Date()
        let targetStartDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0);
        const targetEndDateTime = targetStartDateTime.getTime();
        targetStartDateTime.setDate(targetStartDateTime.getDate() - 30);
        this.state = {
            startDateEpoch: targetStartDateTime.valueOf(),
            endDateEpoch: targetEndDateTime,
            data: {
                total: [],
                healthy: [],
                unhealthy: []
            }
        }
    }

    async componentDidMount() {
        console.log('https://pcpprd-app.acsu.buffalo.edu/analytics/health?startDate=' + this.state.startDateEpoch + '&endDate=' + this.state.endDateEpoch)
        const response = await axios.get('https://pcpprd-app.acsu.buffalo.edu/analytics/health?startDate=' + this.state.startDateEpoch + '&endDate=' + this.state.endDateEpoch);
        let total = [];
        let healthy = [];
        let unhealthy = [];
        Object.entries(response.data.dateWiseHealthAnalytics).map(([key, value]) => {
            const currDate = new Date(key * 1);
            const totalUsers = {
                'x': Date.UTC(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()),
                'y': value.filled
            }
            const healthyUsers = {
                'x': Date.UTC(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()),
                'y': value.healthy
            }
            const unhealthyUsers = {
                'x': Date.UTC(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()),
                'y': value.notHealthy
            }
            total.push(totalUsers);
            healthy.push(healthyUsers);
            unhealthy.push(unhealthyUsers)
        })
        let data = { ...this.state.data }
        data.total = total;
        data.healthy = healthy;
        data.unhealthy = unhealthy;
        this.setState({ data });
        console.log(this.state.data)
    }

    render() {
        const total = this.state.data.total;
        const healthy = this.state.data.healthy;
        const unhealthy = this.state.data.unhealthy;
        const options = {
            chart: {
                type: 'line'
            }, title: {
                text: null
            },

            yAxis: {
                offset: -10,
                title: {
                    text: 'User Count'
                },
                endOnTick: false,
            },

            xAxis: {
                type: 'datetime',
                allowDecimals: false,
            },
            legend: {
                enabled: false
            },

            plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    }
                },
                series: {
                    label: {
                        connectorAllowed: true
                    }
                }
            },

            series: [
                {
                    name: 'Healthy',
                    data: healthy
                },
                {
                    name: 'Unhealthy',
                    data: unhealthy
                }
            ],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    }
                }]
            }
        }
        return (
            <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "395px" } }} options={options} />
        );
    }
}

export default HealthStatusTrend;