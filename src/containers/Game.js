import React, {Component} from 'react'

import Cell, {CELL_WIDTH, CELL_HEIGHT} from '../components/Cell'

const SPACING = 4


class Game extends Component {
    constructor () {
        super()
        this.state = {
            selectedCellIndex: null
        }
    }

    static propTypes = {}

    onMouseDown = (event, index) => {
        this.setState({
            selectedCellIndex: index
        })
    }

    onEdgeSelection = (index, rowIndex, colIndex, direction) => {
        let cellIndex
        if(['e', 'sw', 'se'].indexOf(direction) >= 0) {
            cellIndex = index
        }
        else if(direction === 'ne') {
            cellIndex = index - 10
        }
        else if(direction === 'nw') {
            cellIndex = index - 11
        }
        else if(direction === 'w') {
            cellIndex = index - 1
        }
        if('cell' + cellIndex in this.refs) {
            this.refs['cell' + cellIndex].addPath(direction)
        }
        this.setState({
            selectedCellIndex: null
        })
    }

    onMouseMove = (event) => {
    }

    render () {
        let cells = [
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        ]
        let counter = 0

        let h, w, top, left
        let heights
        let heightSpaces
        let topOffset = 0
        let rowOffset
        let cell
        w = CELL_WIDTH + SPACING
        h = CELL_HEIGHT + SPACING

        const cellList = []
        cells.forEach((cellRow, rowIndex) => {
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
                    cell = (<Cell
                        key={counter}
                        index={counter}
                        ref={'cell' + counter}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        style={{top, left}}
                        start
                    />)
                } else if (activeCell) {
                    cell = (<Cell
                        key={counter}
                        ref={'cell' + counter}
                        index={counter}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        style={{top, left}}
                        onMouseDown={this.onMouseDown}
                        onEdgeSelection={this.onEdgeSelection}
                        onMouseMove={this.onMouseMove}
                        selected={this.state.selectedCellIndex === counter}
                        start={false}
                    />)
                }
                cellList.push(cell)
                counter++
            })
        })

        return (
            <div>
                <h1>Jeu</h1>
                <div className="game-area">
                    {cellList}
                </div>
            </div>
        )
    }
}

export default Game;
