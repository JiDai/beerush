export const SELECT_EDGE = 'SELECT_EDGE'
export const UNVALIDATE_PATH = 'UNVALIDATE_PATH'
export const VALIDATE_PATH = 'VALIDATE_PATH'
export const SET_NEW_GAME = 'SET_NEW_GAME'


function setNewGame () {
    return {
        type: SET_NEW_GAME
    }
}

function selectEdge (colIndex, rowIndex, direction) {
    return {
        type: SELECT_EDGE,
        colIndex,
        rowIndex,
        direction
    }
}

function unvalidatePath (colIndex, rowIndex, direction) {
    return {
        type: UNVALIDATE_PATH,
        colIndex,
        rowIndex,
        direction
    }
}

function validatePath () {
    return {
        type: VALIDATE_PATH
    }
}


export {
    setNewGame,
    selectEdge,
    unvalidatePath,
    validatePath
}
