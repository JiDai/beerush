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
                selectedPath: getPathFromCellEdge(action.index, action.direction)
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

function getPathFromCellEdge (index, direction) {
    let cellIndex

    if (['e', 'sw', 'se'].indexOf(direction) >= 0) {
        cellIndex = index
    } else if (direction === 'ne') {
        cellIndex = index - 10
    } else if (direction === 'nw') {
        cellIndex = index - 11
    } else if (direction === 'w') {
        cellIndex = index - 1
    }

    return {
        cellIndex,
        direction
    }
}


export default gameReducer
