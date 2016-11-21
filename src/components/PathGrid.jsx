import React from 'react'
import Component from 'react/lib/ReactComponent'
import PropTypes from 'react/lib/ReactPropTypes'
import classNames from 'classnames'
import {connect} from 'react-redux'

import {
    PATH_MATRIX,
    PATH_WIDTH,
    CELL_WIDTH,
    CELL_SIDE, CELL_EDGES_HEIGHT, PATH_SPACING, PATH_EDGE_HEIGHT
} from '../Constants'


class PathGrid extends Component {
    static propTypes = {
        availablePaths: PropTypes.array,
        selectedPath: PropTypes.object,
        validatedPaths: PropTypes.array
    }

    isAvailablePath (colIndex, rowIndex) {
        return this.props.availablePaths.find(path => {
            return path.row === rowIndex && path.column === colIndex
        })
    }

    isSelectedPath (colIndex, rowIndex) {
        if(!this.props.selectedPath) {
            return
        }
        return this.props.selectedPath &&
            this.props.selectedPath.row === rowIndex &&
            this.props.selectedPath.column === colIndex
    }

    validatedPath (colIndex, rowIndex) {
        return this.props.validatedPaths.find(path => {
            return path.row === rowIndex && path.column === colIndex
        })
    }

    render () {
        let paths = []
        let top, left, counter, rowCell

        counter = 0

        PATH_MATRIX.forEach((cellRow, rowIndex) => {
            rowCell = Math.floor(rowIndex / 2)

            cellRow.forEach((pathType, colIndex) => {
                left = PATH_WIDTH / 2 + (colIndex * (CELL_WIDTH / 2 + PATH_WIDTH / 2))
                top = ((CELL_EDGES_HEIGHT + CELL_SIDE + PATH_SPACING) * rowCell)
                const isAvailablePath = this.isAvailablePath(colIndex, rowIndex)
                const isSelectedPath = this.isSelectedPath(colIndex, rowIndex)
                const validatedPath = this.validatedPath(colIndex, rowIndex)
                let validatedPathPlayerId = ''
                if(validatedPath) {
                    validatedPathPlayerId = validatedPath.playerId
                }
                switch (pathType) {
                    case 1 :
                        paths.push(
                            <svg
                                key={'path' + counter}
                                className="path"
                                style={{top, left}}
                                width={18}
                                height={13.9}
                                viewBox={`0 0 ${18} ${13.9}`}>
                                <polygon
                                    className={classNames('path__fill', {
                                        'path__fill--available': isAvailablePath,
                                        'path__fill--selected': isSelectedPath,
                                        'path__fill--validated': validatedPath,
                                        [`path__fill--validated-by-${validatedPathPlayerId}`]: validatedPath
                                    })}
                                    points="18,12.1 15,13.9 0,5.2 0,1.7 3,0 18,8.7" />
                                {/*<text x={3} y={4} transform="rotate(30)" fontSize={6}>{colIndex},<br />{rowIndex}</text>*/}
                            </svg>)
                        break
                    case 2 :
                        paths.push(
                            <svg
                                key={'path' + counter}
                                className="path"
                                style={{top, left}}
                                width={18}
                                height={13.9}
                                viewBox={`0 0 ${18} ${13.9}`}>
                                <polygon
                                    className={classNames('path__fill', {
                                        'path__fill--available': isAvailablePath,
                                        'path__fill--selected': isSelectedPath,
                                        'path__fill--validated': validatedPath,
                                        [`path__fill--validated-by-${validatedPathPlayerId}`]: validatedPath
                                    })}
                                    points="0,12.1 0,8.7 15,0 18,1.7 18,5.2 3,13.9" />
                                {/*<text x={-4} y={13} transform="rotate(-30)" fontSize={6}>{colIndex},<br />{rowIndex}</text>*/}
                            </svg>)
                        break
                    case 3 :
                        top = top + CELL_EDGES_HEIGHT - PATH_EDGE_HEIGHT + PATH_SPACING
                        left = left - PATH_WIDTH / 2
                        paths.push(
                            <svg
                                key={'path' + counter}
                                className="path"
                                style={{top, left}}
                                width={6}
                                height={20.8}
                                viewBox={`0 0 ${6} ${20.8}`}>
                                <polygon
                                    className={classNames('path__fill', {
                                        'path__fill--available': isAvailablePath,
                                        'path__fill--selected': isSelectedPath,
                                        'path__fill--validated': validatedPath,
                                        [`path__fill--validated-by-${validatedPathPlayerId}`]: validatedPath
                                    })}
                                    points="3,0 6,1.73 6,19.08 3,20.81 0,19.08 0,1.73" />
                                {/*<text x={0} y={0} width={6} fontSize={6} style={{'whiteSpace': 'normal'}}><tspan x={0} dy="1.2em">{colIndex}</tspan>,<tspan x={0} dy="1.2em">{rowIndex}</tspan></text>*/}
                            </svg>)
                        break
                }
                counter++
            })
        })
        return (<div>{paths}</div>)
    }
}


export default connect(
    state => {
        return {
            availablePaths: state.game.availablePaths,
            validatedPaths: state.game.validatedPaths,
            selectedPath: state.game.selectedPath
        }
    }
)(PathGrid)
