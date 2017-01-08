import {getPathCoordinatesFromCellEdge} from '../helpers/Geometry'
import {
    SELECT_EDGE,
    UNVALIDATE_PATH,
    VALIDATE_PATH
} from '../actions/game'
import {
    DEFAULT_AVAILABLE_PATH,
    PLAYERS_COUNT
} from '../Constants'


const initialState = {
    validatedPaths: [],
    availablePaths: DEFAULT_AVAILABLE_PATH,
    selectedPath: null,
    currentPlayer: 1,
    round: 1
}


function gameReducer (state = initialState, action) {
    switch (action.type) {
        case SELECT_EDGE: {
            const selectedPath = getPathCoordinatesFromCellEdge(action.colIndex, action.rowIndex, action.orientation)
            const selectedPathAvailable = state.availablePaths.find(path => {
                return path.row === selectedPath.row && path.column === selectedPath.column
            })

            return {
                ...state,
                selectedPath: selectedPathAvailable
            }
        }
        case VALIDATE_PATH: {
            const availablePaths = state.availablePaths.filter(function (path) {
                return !(path.row === state.selectedPath.row && path.column === state.selectedPath.column)
            })
            let currentPlayer, round
            // Next round ?
            if (state.currentPlayer === PLAYERS_COUNT) {
                currentPlayer = 1
                round = state.round + 1
            }
            else {
                currentPlayer = state.currentPlayer + 1
            }
            if (round > 1) {
                // Select all paths from
            }

            return {
                ...state,
                validatedPaths: state.validatedPaths.concat({...state.selectedPath, playerId: state.currentPlayer}),
                availablePaths,
                selectedPath: null,
                currentPlayer,
                round
            }
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
