import {
    getPathCoordinatesFromCellEdge,
    getAllAdjacentPaths,
    getDefaultAvailablePaths
} from '../helpers/Geometry'
import {
    SELECT_EDGE,
    UNVALIDATE_PATH,
    VALIDATE_PATH
} from '../actions/game'
import {
    PLAYERS_COUNT
} from '../Constants'


const initialState = {
    validatedPaths: [],
    availablePaths: getDefaultAvailablePaths(),
    selectedPath: null,
    currentPlayer: 1,
    round: 1
}


function gameReducer (state = initialState, action) {
    switch (action.type) {
        case SELECT_EDGE: {
            const selectedPath = getPathCoordinatesFromCellEdge(action.colIndex, action.rowIndex, action.direction)
            const selectedPathAvailable = state.availablePaths.find(path => {
                return path.isEqualTo(selectedPath)
            })

            return {
                ...state,
                selectedPath: selectedPathAvailable
            }
        }
        case VALIDATE_PATH: {
            let availablePaths = state.availablePaths.filter(function (path) {
                return !path.isEqualTo(state.selectedPath)
            })

            const selectedPath = state.selectedPath
            selectedPath.playerId = state.currentPlayer
            let validatedPaths = state.validatedPaths.concat(selectedPath)

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

            if (round > 1) {
                // Find last validated path by current player
                const lastValidatedPathsByPlayer = state.validatedPaths.filter(function (path) {
                    return currentPlayer === path.playerId
                })
                availablePaths = getAllAdjacentPaths(lastValidatedPathsByPlayer)
                availablePaths = availablePaths.filter(availablePath => {
                    return !state.validatedPaths.find(function (path) {
                        return path.isEqualTo(availablePath)
                    })
                })
            }

            return {
                ...state,
                validatedPaths,
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
