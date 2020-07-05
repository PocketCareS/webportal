import React, { Component } from 'react';
import '../css/overviewCard.css';

class OverviewCard extends Component {
    state = {
        nyStateData: {}
    }

    render() {
        return (
            <div className="card bg-light mb-3">
                <div className="card-header">{this.props.cardData.header}<span className="date-value">{this.props.cardData.date}</span></div>
                <div className="card-body">
                    {this.props.cardData.data.map(data => (
                        <p className="card-text">{data.title} <span className="data-value">{data.value}</span></p>
                    ))}
                </div>
            </div >
        );
    }
}

export default OverviewCard;