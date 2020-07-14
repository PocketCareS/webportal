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
        const response = await axios.get('https://pcpprd-app.acsu.buffalo.edu/pocketCare-0.0.1-SNAPSHOT/analytics/contactDataAll?startDate=' + this.props.startDateEpoch + '&endDate=' + this.props.endDateEpoch + '&contactType=close&graphType=wwed');
        let less_than_5 = [];
        let greater_than_5_less_than_10 = [];
        let greater_than_10 = [];
        Object.entries(response.data.aggregatedResponse).map(([key, value]) => {
            const currDate = new Date(key * 1);
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
                offset: -10,
                title: {
                    text: 'User Count',
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
                },
                endOnTick: false
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
            // tooltip: {
            //     formatter: function () {
            //         return '<b>' + this.series.name + '</b><br/>' +
            //             ' <b>Date:</b> ' + Highcharts.dateFormat('%e %b, %Y',
            //                 new Date(this.x))
            //             + ' <br/> <b>User Count:</b> ' + this.y;
            //     },
            //     headerFormat: '<b>{point.x}</b><br/>',
            //     pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
            //     crosshairs: true
            // },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0"><b>{series.name}: </b></td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    minPointLength: 0,
                    dataLabels: {
                        enabled: true,
                        color: "#000000",
                        formatter: function () {
                            var val = this.y;
                            if (val < 1) {
                                return '';
                            }
                            return val;
                        },
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