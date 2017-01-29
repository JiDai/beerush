import {
    getPathCoordinatesFromCellEdge,
    getAllAdjacentPaths,
    getDefaultAvailablePaths
} from '../helpers/Geometry'
import {
    SET_NEW_GAME,
    SELECT_EDGE,
    UNVALIDATE_PATH,
    VALIDATE_PATH
} from '../actions/game'
import {
    CELL_MATRIX,
    PATH_MATRIX,
    PLAYERS_COUNT
} from '../Constants'
import Cell from '../model/Cell'
import Path from '../model/Path'


const initialState = {
    cells: [],
    paths: [],
    selectedPath: null,
    currentPlayer: 1,
    round: 1
}


function gameReducer (state = initialState, action) {
    switch (action.type) {
        case SET_NEW_GAME: {
            let cells = []
            let paths = []

            CELL_MATRIX.forEach((row, rowIndex) => {
                row.forEach((status, colIndex) => {
                    switch (status) {
                        case 1:
                            cells.push(new Cell(colIndex, rowIndex))
                            break
                        case 2:
                            cells.push(new Cell(colIndex, rowIndex, true))
                            break
                        default:
                            break
                    }
                })
            })

            PATH_MATRIX.forEach((row, rowIndex) => {
                row.forEach((orientation, colIndex) => {
                    if(orientation === 0) {
                        return
                    }
                    const defaults = getDefaultAvailablePaths()
                    const available = defaults.find(path => {
                        return rowIndex === path.row && colIndex === path.column
                    })
                    paths.push(new Path(colIndex, rowIndex, orientation, !!available))
                })
            })

            return {
                ...state,
                cells,
                paths
            }
        }

        case SELECT_EDGE: {
            const coordinates = getPathCoordinatesFromCellEdge(action.colIndex, action.rowIndex, action.direction)
            const selectedPath = state.paths.find(path => {
                return path.isEqualTo({column: coordinates.column, row: coordinates.row})
            })

            // Check if path is availabe
            if(!selectedPath.available) {
                return state
            }

            // Mark path as selected to highlight it
            selectedPath.selected = true

            return {
                ...state,
                selectedPath
            }
        }

        case VALIDATE_PATH: {
            const selectedPath = state.selectedPath
            selectedPath.validatedBy = state.currentPlayer
            selectedPath.available = false

            let currentPlayer, round
            // Next round ?
            if (state.currentPlayer === PLAYERS_COUNT) {
                currentPlayer = 1
                round = state.round + 1
            }
            else {
                currentPlayer = state.currentPlayer + 1
                round = state.round
            }

            let newState = {
                ...state,
                selectedPath: null,
                currentPlayer,
                round
            }

            if (round > 1) {
                // Find last validated path by current player
                const lastValidatedPathsByPlayer = state.paths.filter(function (path) {
                    return currentPlayer === path.validatedBy
                })

                // Update availabe paths
                const adjacentPaths = getAllAdjacentPaths(lastValidatedPathsByPlayer)
                newState.paths = state.paths.map(path => {
                    path.available = false
                    const isAdjacent = !!adjacentPaths.find(function (adjacentPath) {
                        return adjacentPath.isEqualTo(path)
                    })
                    if(isAdjacent && !path.validatedBy) {
                        path.available = true
                    }
                    return path
                })
            }

            return newState
        }
        case UNVALIDATE_PATH:
            return {
                ...state,
                selectedPath: null
            }
        default:
            return state
    }
}


export default gameReducer
