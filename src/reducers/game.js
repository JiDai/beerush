import {getPathCoordinatesFromCellEdge} from '../helpers/Geometry'
import {
    SELECT_EDGE,
    UNVALIDATE_PATH,
    VALIDATE_PATH
} from '../actions/game'


const initialState = {
    validatedPaths: [],
    selectedPath: null
}


function gameReducer (state = initialState, action) {
    switch (action.type) {
        case SELECT_EDGE:
            return {
                ...state,
                selectedPath: getPathCoordinatesFromCellEdge(action.colIndex, action.rowIndex, action.orientation)
            }
        case VALIDATE_PATH:
            return {
                ...state,
                validatedPaths: state.validatedPaths.concat(state.selectedPath),
                selectedPath: null
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
