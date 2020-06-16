import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../css/totalContactDuration.css';

class TotalContactDuration extends Component {
    state = {}
    render() {
        const options = {
            chart: {
                type: 'column'
            },
            title: {
                text: null
            },
            xAxis: {
                categories: [
                    'May 1',
                    'May 2',
                    'May 3',
                    'May 4',
                    'May 5',
                    'May 6',
                    'May 7',
                    'May 8',
                    'May 9',
                    'May 10',
                    'May 11',
                    'May 12',
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: 200,
                title: {
                    text: 'User Count'
                }
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
                floating: true,
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
                name: '0-5 mins',
                data: [20, 50, 30, 40, 10, 20, 40, 30, 40, 10, 20, 40]

            }, {
                name: '5-10 mins',
                data: [45, 28, 60, 50, 40, 80, 50, 105, 60, 110, 90, 70]

            }, {
                name: '10-15 mins',
                data: [80, 40, 60, 110, 80, 70, 100, 60, 50, 40, 80, 50]

            }, {
                name: '> 15 mins',
                data: [85, 105, 105, 60, 110, 90, 70, 60, 110, 80, 70, 100]

            }]
        }
        return (
            <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "395px" } }} options={options} />
        );
    }
}

export default TotalContactDuration;