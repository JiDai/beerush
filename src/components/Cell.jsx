import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getDirection } from '../helpers/Geometry';
import {
    PATH_WIDTH,
    CELL_WIDTH,
    CELL_HEIGHT,
} from '../Constants';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edgeSelected: null,
            selected: false,
        };
    }

    static propTypes = {
        onEdgeSelection: PropTypes.func,
        availableOrientations: PropTypes.array,
        status: PropTypes.string,
        index: PropTypes.number,
        colIndex: PropTypes.number,
        rowIndex: PropTypes.number,
        style: PropTypes.object,
        start: PropTypes.bool,
    };

    static defaultProps = {
        availableOrientations: [],
    };

    onMouseDown = () => {
        if (this.props.start) {
            return;
        }
        this.setState({
            selected: true,
        });
    };

    onMouseUp = (event) => {
        if (this.props.start) {
            return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        const direction = getDirection(rect, event.clientX, event.clientY);
        this.setState({
            selected: false,
            edgeSelected: null,
        });
        if (!direction) {
            return;
        }
        if (this.props.onEdgeSelection) {
            this.props.onEdgeSelection(this.props.colIndex, this.props.rowIndex, direction);
        }
    };

    onMouseMove = (event) => {
        if (this.props.start) {
            return;
        }
        if (!this.state.selected) {
            return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        const direction = getDirection(rect, event.clientX, event.clientY);
        if (direction !== this.setState.edgeSelected) {
            this.setState({
                edgeSelected: direction,
            });
        }
    };

    render() {
        const cellClassName = classNames({
            'cell': true,
            'cell--selected': this.state.selected,
            'cell--start': this.props.start,
        });
        return (
            <div className={cellClassName}
                style={this.props.style}>
                <svg
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseMove={this.onMouseMove}
                    width={CELL_WIDTH + PATH_WIDTH * 2}
                    height={CELL_HEIGHT + PATH_WIDTH * 2}
                    viewBox={`0 0 ${CELL_WIDTH + PATH_WIDTH * 2} ${CELL_HEIGHT + PATH_WIDTH * 2}`}>
                    <defs>
                        <radialGradient id="bg" cx="50%" cy="50%" r="55%" gradientUnits="objectBoundingBox">
                            <stop offset="3%" style={{ 'stopColor': 'rgb(255, 250, 227)', 'stopOpacity': 1 }} />
                            <stop offset="97%" style={{ 'stopColor': 'rgb(222, 185, 105)', 'stopOpacity': 1 }} />
                        </radialGradient>

                        <filter id="shadow" primitiveUnits="objectBoundingBox" x="0%" y="0%">
                            <feOffset dx="0" dy="0" />
                            <feGaussianBlur stdDeviation="0.1" result="offset-blur" />
                            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                            <feFlood floodColor="#af8553" floodOpacity="0.7" result="color" />
                            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                        </filter>
                    </defs>

                    <polygon className="cell__fill" fill="url(#bg)" filter="url(#shadow)"
                        points="21,5.2 36,13.9 36,20.2 36,31.2 21,39.8 6,31.2 6,13.9" />

                    {/*<text x="10" y="25" fontSize={10}>{this.props.colIndex},{this.props.rowIndex}</text>*/}

                    <polygon id="w"
                        className={classNames('cell__border', 'cell__border--nw', {
                            'cell__border--selected': this.state.edgeSelected === 'w',
                            'cell__border--available': this.props.availableOrientations.indexOf('w') > -1,
                        })}
                        points="6,31.2 3,32.9 0,31.2 0,13.9 3,12.1 6,13.9" />
                    <polygon id="e"
                        className={classNames('cell__border', 'cell__border--nw', {
                            'cell__border--selected': this.state.edgeSelected === 'e',
                            'cell__border--available': this.props.availableOrientations.indexOf('e') > -1,
                        })}
                        points="42,31.2 39,32.9 36,31.2 36,13.9 39,12.1 42,13.9" />
                    <polygon id="nw"
                        className={classNames('cell__border', 'cell__border--nw', {
                            'cell__border--selected': this.state.edgeSelected === 'nw',
                            'cell__border--available': this.props.availableOrientations.indexOf('nw') > -1,
                        })}
                        points="18,0 21,1.7 21,5.2 6,13.9 3,12.1 3,8.7" />
                    <polygon id="ne"
                        className={classNames('cell__border', 'cell__border--nw', {
                            'cell__border--selected': this.state.edgeSelected === 'ne',
                            'cell__border--available': this.props.availableOrientations.indexOf('ne') > -1,
                        })}
                        points="24,0 21,1.7 21,5.2 36,13.9 39,12.1 39,8.7" />
                    <polygon id="sw"
                        className={classNames('cell__border', 'cell__border--nw', {
                            'cell__border--selected': this.state.edgeSelected === 'sw',
                            'cell__border--available': this.props.availableOrientations.indexOf('sw') > -1,
                        })}
                        points="18,45 21,43.3 21,39.8 6,31.2 3,32.9 3,36.4" />
                    <polygon id="se"
                        className={classNames('cell__border', 'cell__border--nw', {
                            'cell__border--selected': this.state.edgeSelected === 'se',
                            'cell__border--available': this.props.availableOrientations.indexOf('se') > -1,
                        })}
                        points="24,45 21,43.3 21,39.8 36,31.2 39,32.9 39,36.4" />
                </svg>
            </div>
        );
    }
}

export default Cell;
