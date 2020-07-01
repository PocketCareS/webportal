import React, { Component } from 'react';
import Highcharts from 'highcharts';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';

class CloseContactDistribution extends Component {
    state = {
        data: {
            LESS_THAN_5: [],
            GREATER_THAN_5_LESS_THAN_10: [],
            GREATER_THAN_10: []
        }
    }

    async componentDidMount() {
        console.log(this.props.startDateEpoch);
        console.log(this.props.endDateEpoch)
        const response = await axios.get('https://pcpdev-app.acsu.buffalo.edu/analytics/contactDataAll?startDate=' + this.props.startDateEpoch + '&endDate=' + this.props.endDateEpoch + '&contactType=close&graphType=wwed');
        let less_than_5 = [];
        let greater_than_5_less_than_10 = [];
        let greater_than_10 = [];
        Object.entries(response.data.aggregatedResponse).map(([key, value]) => {
            const currDate = new Date(key * 1);
            console.log(currDate);
            const LESS_THAN_5 = {
                'x': Date.UTC(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()),
                'y': value.totalContacts.LESS_THAN_5 !== undefined ? value.totalContacts.LESS_THAN_5 : 0
            }
            const GREATER_THAN_5_LESS_THAN_10 = {
                'x': Date.UTC(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()),
                'y': value.totalContacts.GREATER_THAN_5_LESS_THAN_10 !== undefined ? value.totalContacts.GREATER_THAN_5_LESS_THAN_10 : 0
            }
            const GREATER_THAN_10 = {
                'x': Date.UTC(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()),
                'y': value.totalContacts.GREATER_THAN_10 !== undefined ? value.totalContacts.GREATER_THAN_10 : 0
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

        console.log(this.state.data)
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
                allowDecimals: false,
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Person Count'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        ' <b>Date:</b> ' + Highcharts.dateFormat('%e %b, %Y',
                            new Date(this.x))
                        + ' <br/> <b>User Count:</b> ' + this.y;
                },
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    // pointStart: Date.UTC(startDateEpoch.getFullYear(), startDateEpoch.getMonth(), startDateEpoch.getDate()),
                    // pointInterval: 24 * 3600 * 1000,
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: "#000000",
                        style: {
                            textOutline: false
                        }
                    }
                }
            },
            colors: [
                '#FFCC00',
                '#E98901',
                '#DC133D'
            ],
            series: [{
                name: 'Less than 5',
                data: less_than_5
            },
            {
                name: 'Greater than 5, Less than 10',
                data: greater_than_5_less_than_10
            }, {
                name: 'Greater than 10',
                data: greater_than_10
            }]
        }
        return (
            <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "395px" } }} options={options} />
        );
    }
}

export default CloseContactDistribution;