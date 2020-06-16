import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class CloseContactDistribution extends Component {
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
                categories: ['May 1', 'May 2', 'May 3', 'May 4', 'May 5', 'May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12', 'May 13', 'May 14']
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
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
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
                name: '0-1',
                data: [5, 3, 4, 7, 2, 3, 8, 5, 3, 4, 7, 2, 3, 8]
            }, {
                name: '1-5',
                data: [2, 2, 3, 2, 2, 5, 6, 5, 3, 4, 7, 2, 3, 8]
            }, {
                name: '5-10',
                data: [3, 4, 4, 2, 5, 4, 2, 5, 3, 4, 7, 2, 3, 8]
            }]
        }
        return (
            <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "395px" } }} options={options} />
        );
    }
}

export default CloseContactDistribution;