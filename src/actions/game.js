export const SELECT_EDGE = 'SELECT_EDGE'
export const UNVALIDATE_PATH = 'UNVALIDATE_PATH'
export const VALIDATE_PATH = 'VALIDATE_PATH'


function selectEdge (colIndex, rowIndex, orientation) {
    return {
        type: SELECT_EDGE,
        colIndex,
        rowIndex,
        orientation
    }
}

function unvalidatePath (colIndex, rowIndex, orientation) {
    return {
        type: UNVALIDATE_PATH,
        colIndex,
        rowIndex,
        orientation
    }
}

function validatePath (colIndex, rowIndex, orientation) {
    return {
        type: VALIDATE_PATH,
        colIndex,
        rowIndex,
        orientation
    }
}


export {
    selectEdge,
    unvalidatePath,
    validatePath
}
