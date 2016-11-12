import React from 'react'
import Component from 'react/lib/ReactComponent'
import PropTypes from 'react/lib/ReactPropTypes'
import classNames from 'classnames'

import {
    CELL_WIDTH,
    CELL_HEIGHT
} from '../Constants'

class Cell extends Component {
    constructor () {
        super()
        this.state = {
            edgeSelected: null,
            selected: false
        }
    }

    static propTypes = {
        onEdgeSelection: PropTypes.func,
        validatedPaths: PropTypes.array,
        selectedPaths: PropTypes.array,
        status: PropTypes.string,
        index: PropTypes.number,
        rowIndex: PropTypes.number,
        colIndex: PropTypes.number,
        style: PropTypes.object,
        start: PropTypes.bool
    }

    static getDirection (rect, posX, posY) {
        const distX = posX - rect.left - rect.width / 2
        const distY = posY - rect.top - rect.height / 2
        let a = Math.atan2(distY, distX)
        let edgeIndex
        if (Math.abs(distX) < 10 && Math.abs(distY) < 10) {
            // gesture not enough significant
        }
        const deg = a / Math.PI * 180
        if (deg >= -30 && deg <= 30) {
            edgeIndex = 'e'
        }
        else if (deg > 30 && deg <= 90) {
            edgeIndex = 'se'
        }
        else if (deg > 90 && deg <= 150) {
            edgeIndex = 'sw'
        }
        else if (deg > 150 || deg <= -150) {
            edgeIndex = 'w'
        }
        else if (deg > -150 && deg >= -90) {
            edgeIndex = 'ne'
        }
        else if (deg < -90 && deg < -30) {
            edgeIndex = 'nw'
        }
        return edgeIndex
    }

    onMouseDown = () => {
        this.setState({
            selected: true
        })
    }

    onMouseUp = (event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const direction = Cell.getDirection(rect, event.clientX, event.clientY)
        this.setState({
            selected: false
        })
        if (this.props.onEdgeSelection) {
            this.props.onEdgeSelection(this.props.index, direction)
        }
    }

    onMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const direction = Cell.getDirection(rect, event.clientX, event.clientY)
        if (direction !== this.setState.edgeSelected) {
            this.setState({
                edgeSelected: direction
            })
        }
    }

    render () {
        const cellClassName = classNames({
            'cell': true,
            'cell--selected': this.state.selected,
            'cell--start': this.props.start
        })
        return (
            <div className={cellClassName}
                style={this.props.style}>
                <svg
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseMove={this.onMouseMove}
                    width={CELL_WIDTH + 8}
                    height={CELL_HEIGHT + 8}
                    viewBox={`0 0 ${CELL_WIDTH + 8} ${CELL_HEIGHT + 8}`}>
                    <defs>
                        <radialGradient id="bg" cx="50%" cy="50%" r="55%" gradientUnits="objectBoundingBox">
                            <stop offset="3%" style={{'stopColor': 'rgb(255, 250, 227)', 'stopOpacity': 1}} />
                            <stop offset="97%" style={{'stopColor': 'rgb(222, 185, 105)', 'stopOpacity': 1}} />
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

                    <polygon ref="sw"
                        className={classNames('cell__border', 'cell__border--sw', {'cell__border--selected': this.state.edgeSelected === 'sw'})}
                        points="19 41.75 19 39.42 4 30.42 2 31.62 1.94 33.84 16.94 42.84 19 41.75" />
                    <polygon ref="se"
                        className={classNames('cell__border', 'cell__border--se', {'cell__border--selected': this.state.edgeSelected === 'se'})}
                        points="19 41.75 19 39.42 34 30.42 36 31.62 36.06 33.84 21.06 42.84 19 41.75" />
                    <polygon ref="nw"
                        className={classNames('cell__border', 'cell__border--nw', {'cell__border--selected': this.state.edgeSelected === 'nw'})}
                        points="19 1.1 19 3.43 4 12.43 2 11.23 1.94 9 16.94 0 19 1.1" />
                    <polygon ref="ne"
                        className={classNames('cell__border', 'cell__border--ne', {'cell__border--selected': this.state.edgeSelected === 'ne'})}
                        points="19 1.1 19 3.43 34 12.43 36 11.23 36.06 9 21.06 0 19 1.1" />
                    <polygon ref="w"
                        className={classNames('cell__border', 'cell__border--w', {'cell__border--selected': this.state.edgeSelected === 'w'})}
                        points="2 31.62 4 30.42 4 12.4 2 11.2 0 12.4 0 30.42 2 31.62" />
                    <polygon ref="e"
                        className={classNames('cell__border', 'cell__border--e', {'cell__border--selected': this.state.edgeSelected === 'e'})}
                        points="36 31.62 38 30.42 38 12.4 36 11.2 34 12.4 34 30.42 36 31.62" />

                    <polygon className="cell__fill" fill="url(#bg)" filter="url(#shadow)"
                        points="15,0 30,8.66 30,15 30,25.98 15,34.64 0,25.98 0,8.66" />
                </svg>
            </div>
        )
    }
}

export default Cell
