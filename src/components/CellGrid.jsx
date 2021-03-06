import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPathCoordinatesFromCellEdge } from '../helpers/Geometry';
import { selectEdge } from '../actions/game';
import Cell from '../components/Cell';
import {
    PATH_WIDTH,
    CELL_WIDTH,
    CELL_HEIGHT,
    CELL_Y_SPACING,
} from '../Constants';


class CellGrid extends Component {
    static propTypes = {
        cells: PropTypes.array,
        paths: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    onEdgeSelection = (colIndex, rowIndex, direction) => {
        this.props.dispatch(selectEdge(colIndex, rowIndex, direction));
    };

    availableOrientations(cellColIndex, cellRowIndex) {
        const directions = ['e', 'se', 'sw', 'w', 'nw', 'ne'];
        let availableOrientations = [];

        directions.forEach(direction => {
            const cellPath = getPathCoordinatesFromCellEdge(cellColIndex, cellRowIndex, direction);
            this.props.paths.forEach((path) => {
                if (path.isEqualTo(cellPath) && path.available) {
                    availableOrientations.push(direction);
                }
            });
        });
        return availableOrientations;
    }

    render() {
        let counter = 0;

        let h, w, top, left;
        let heights;
        let heightSpaces;
        let topOffset = 0;
        let rowOffset;
        w = CELL_WIDTH + PATH_WIDTH;
        h = CELL_HEIGHT + CELL_Y_SPACING;

        const cellList = [];
        this.props.cells.forEach(cell => {
            const colIndex = cell.column;
            const rowIndex = cell.row;
            const rowEven = rowIndex % 2; // 0 ou 1
            rowOffset = rowEven * w / 2;

            const colEven = colIndex % 2; // 0 ou 1
            if (colEven) {
                heightSpaces = ((rowIndex + 1) / 2) * (h / 2);
                heights = ((rowIndex - 1) / 2) * h;
                topOffset = colEven * (h / 4);
            } else {
                heightSpaces = (rowIndex / 2) * (h / 2);
                heights = (rowIndex / 2) * h;
                topOffset = 0;
            }
            top = heights + heightSpaces + topOffset;
            left = (colIndex * w) + rowOffset;
            if (cell.isBeginning()) {
                cell = <Cell
                    key={counter}
                    index={counter}
                    ref={'cell' + counter}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    style={{ top, left }}
                    start
                />;
            } else {
                cell = <Cell
                    key={counter}
                    ref={'cell' + counter}
                    index={counter}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    style={{ top, left }}
                    onEdgeSelection={this.onEdgeSelection}
                    availableOrientations={this.availableOrientations(colIndex, rowIndex)}
                    start={false}
                />;
            }
            cellList.push(cell);
            counter++;
        });

        return <div>
            {cellList}
        </div>;
    }
}


export default connect(
    state => {
        return {
            cells: state.game.cells,
            paths: state.game.paths,
        };
    },
)(CellGrid);
