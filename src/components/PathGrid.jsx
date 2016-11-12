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
        validatedPaths: PropTypes.array,
        selectedPath: PropTypes.object
    }

    render () {
        let paths = []
        const selectedPath = this.props.selectedPath
        const validatedPaths = this.props.validatedPaths

        let top, left, counter, rowCell
        counter = 0

        PATH_MATRIX.forEach((cellRow, rowIndex) => {
            rowCell = Math.floor(rowIndex / 2)

            cellRow.forEach((pathType, colIndex) => {
                left = PATH_WIDTH / 2 + (colIndex * (CELL_WIDTH / 2 + PATH_WIDTH / 2)) - PATH_WIDTH
                top = ((CELL_EDGES_HEIGHT + CELL_SIDE + PATH_SPACING) * rowCell) - PATH_SPACING
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
                                        'path__fill--selected': selectedPath && selectedPath.direction === 'sw',
                                        'path__fill--validated': validatedPaths.indexOf('sw') >= 0
                                    })}
                                    points="18,12.1 15,13.9 0,5.2 0,1.7 3,0 18,8.7" />
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
                                        'path__fill--selected': selectedPath && selectedPath.direction === 'se',
                                        'path__fill--validated': validatedPaths.indexOf('se') >= 0
                                    })}
                                    points="0,12.1 0,8.7 15,0 18,1.7 18,5.2 3,13.9" />
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
                                        'path__fill--selected': selectedPath && selectedPath.cellIndex === counter && selectedPath.direction === 'e',
                                        'path__fill--validated': validatedPaths.indexOf('e') >= 0
                                    })}
                                    points="3,0 6,1.73 6,19.08 3,20.81 0,19.08 0,1.73" />
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
            validatedPaths: state.game.validatedPaths,
            selectedPath: state.game.selectedPath
        }
    }
)(PathGrid)