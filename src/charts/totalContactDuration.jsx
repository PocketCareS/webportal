import React, { Component } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../css/totalContactDuration.css';

class TotalContactDuration extends Component {
    state = {
        data: {
            LESS_THAN_5: [],
            GREATER_THAN_5_LESS_THAN_10: [],
            GREATER_THAN_10: []
        }
    }

    async componentDidMount() {
        const response = await axios.get('https://pcpprd-app.acsu.buffalo.edu/analytics/contactDataAll?startDate=' + this.props.startDateEpoch + '&endDate=' + this.props.endDateEpoch + '&contactType=close&graphType=wwed');
        let less_than_5 = [];
        let greater_than_5_less_than_10 = [];
        let greater_than_10 = [];
        Object.entries(response.data.aggregatedResponse).map(([key, value]) => {
            const currDate = new Date(key * 1);
            console.log(currDate);
            const LESS_THAN_5 = {
                'x': Date.UTC(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()),
                'y': value.totalContactsDuration.LESS_THAN_5 !== undefined ? value.totalContactsDuration.LESS_THAN_5 : 0
            }
            const GREATER_THAN_5_LESS_THAN_10 = {
                'x': Date.UTC(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()),
                'y': value.totalContactsDuration.GREATER_THAN_5_LESS_THAN_10 !== undefined ? value.totalContactsDuration.GREATER_THAN_5_LESS_THAN_10 : 0
            }
            const GREATER_THAN_10 = {
                'x': Date.UTC(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()),
                'y': value.totalContactsDuration.GREATER_THAN_10 !== undefined ? value.totalContactsDuration.GREATER_THAN_10 : 0
            }
            less_than_5.push(LESS_THAN_5);
            greater_than_5_less_than_10.push(GREATER_THAN_5_LESS_THAN_10);
            greater_than_10.push(GREATER_THAN_10)
        })
        let data = { ...this.state.data }
        data.LESS_THAN_5 = less_than_5;
        data.GREATER_THAN_5_LESS_THAN_10 = greater_than_5_less_than_10;
        data.GREATER_THAN_10 = greater_than_10;
        this.setState({ data });
    }

    render() {
        const less_than_5 = this.state.data.LESS_THAN_5;
        const greater_than_5_less_than_10 = this.state.data.GREATER_THAN_5_LESS_THAN_10;
        const greater_than_10 = this.state.data.GREATER_THAN_10;
        const options = {
            chart: {
                type: 'column'
            },
            title: {
                text: null
            },
            xAxis: {
                type: 'datetime',
                crosshair: true
            },
            yAxis: {
                min: 0,
                offset: -10,
                title: {
                    text: 'User Count'
                },
                endOnTick: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: false,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            series: [{
                name: 'Less than 5 mins',
                data: less_than_5

            }, {
                name: 'Greater than 5 mins, Less than 10 mins',
                data: greater_than_5_less_than_10

            }, {
                name: 'Greater than 10 mins',
                data: greater_than_10

            }]
        }
        return (
            <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "395px" } }} options={options} />
        );
    }
}

export default TotalContactDuration;