import React from 'react'
import Component from 'react/lib/ReactComponent'
import PropTypes from 'react/lib/ReactPropTypes'
import {connect} from 'react-redux'

import {getPathCoordinatesFromCellEdge} from '../helpers/Geometry'
import {selectEdge} from '../actions/game'
import Cell from '../components/Cell'
import {
    CELL_MATRIX,
    PATH_WIDTH,
    CELL_WIDTH,
    CELL_HEIGHT,
    CELL_Y_SPACING
} from '../Constants'


class CellGrid extends Component {
    static propTypes = {
        validatedPaths: PropTypes.array,
        availablePaths: PropTypes.array,
        selectedPath: PropTypes.object
    }

    constructor () {
        super()
        this.state = {}
    }

    onEdgeSelection = (colIndex, rowIndex, direction) => {
        this.props.dispatch(selectEdge(colIndex, rowIndex, direction))
    }

    availableOrientations (cellColIndex, cellRowIndex) {
        const directions = ['e', 'se', 'sw', 'w', 'nw', 'ne']
        let availableOrientations = []
        directions.forEach(direction => {
            const cellPath = getPathCoordinatesFromCellEdge(cellColIndex, cellRowIndex, direction)
            this.props.availablePaths.map((path) => {
                if (path.row === cellPath.row && path.column === cellPath.column) {
                    availableOrientations.push(direction)
                }
            })
        })
        return availableOrientations
    }

    render () {
        let counter = 0

        let h, w, top, left
        let heights
        let heightSpaces
        let topOffset = 0
        let rowOffset
        let cell
        w = CELL_WIDTH + PATH_WIDTH
        h = CELL_HEIGHT + CELL_Y_SPACING

        const cellList = []
        CELL_MATRIX.forEach((cellRow, rowIndex) => {
            const rowEven = rowIndex % 2 // 0 ou 1
            rowOffset = rowEven * w / 2

            cellRow.forEach((activeCell, colIndex) => {
                if (activeCell === 0) {
                    return
                }
                const colEven = colIndex % 2 // 0 ou 1
                if (colEven) {
                    heightSpaces = ((rowIndex + 1) / 2) * (h / 2)
                    heights = ((rowIndex - 1) / 2) * h
                    topOffset = colEven * (h / 4)
                } else {
                    heightSpaces = (rowIndex / 2) * (h / 2)
                    heights = (rowIndex / 2) * h
                    topOffset = 0
                }
                top = heights + heightSpaces + topOffset
                left = (colIndex * w) + rowOffset

                if (activeCell === 2) {
                    cell = <Cell
                        key={counter}
                        index={counter}
                        ref={'cell' + counter}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        style={{top, left}}
                        start
                    />
                } else if (activeCell) {
                    cell = <Cell
                        key={counter}
                        ref={'cell' + counter}
                        index={counter}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        style={{top, left}}
                        onEdgeSelection={this.onEdgeSelection}
                        availableOrientations={this.availableOrientations(colIndex, rowIndex)}
                        validatedPaths={this.props.validatedPaths}
                        selectedPath={this.props.selectedPath}
                        start={false}
                    />
                }
                cellList.push(cell)
                counter++
            })
        })

        return <div>
            {cellList}
        </div>
    }
}


export default connect(
    state => {
        return {
            validatedPaths: state.game.validatedPaths,
            selectedPath: state.game.selectedPath,
            availablePaths: state.game.availablePaths
        }
    }
)(CellGrid)
