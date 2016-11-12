export const SELECT_EDGE = 'SELECT_EDGE'
export const UNVALIDATE_PATH = 'UNVALIDATE_PATH'
export const VALIDATE_PATH = 'VALIDATE_PATH'


function selectEdge (index, direction) {
    return {
        type: SELECT_EDGE,
        index,
        direction
    }
}

function unvalidatePath (index, direction) {
    return {
        type: UNVALIDATE_PATH,
        index,
        direction
    }
}

function validatePath (index, direction) {
    return {
        type: VALIDATE_PATH,
        index,
        direction
    }
}


export {
    selectEdge,
    unvalidatePath,
    validatePath
}
