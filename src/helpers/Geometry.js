import {MIN_DISTANCE_TO_GET_DIRECTION} from '../Constants'


/**
 * Return an edge direction (cardinal) inside an cell
 * @param {Object} rect Component rect wrapping the cell
 * @param {Number} posX The position X to get direction from (MouseX)
 * @param {Number} posY The position Y to get direction from (MouseY)
 * @returns {String|undefined}
 */
function getDirection (rect, posX, posY) {
    const distX = posX - rect.left - rect.width / 2
    const distY = posY - rect.top - rect.height / 2
    let a = Math.atan2(distY, distX)
    let edgeIndex
    if (Math.abs(distX) < MIN_DISTANCE_TO_GET_DIRECTION && Math.abs(distY) < MIN_DISTANCE_TO_GET_DIRECTION) {
        // gesture not enough significant
        return
    }
    const deg = a / Math.PI * 180
    if (deg >= -30 && deg <= 30) {
        edgeIndex = 'e'
    }
    else if (deg > 30 && deg <= 90) {
        edgeIndex = 'se'
    }
    else if (deg > 90 && deg <= 150) {
        edgeIndex = 'sw'
    }
    else if (deg > 150 || deg <= -150) {
        edgeIndex = 'w'
    }
    else if (deg > -150 && deg >= -90) {
        edgeIndex = 'ne'
    }
    else if (deg < -90 && deg < -30) {
        edgeIndex = 'nw'
    }
    return edgeIndex
}

/**
 *
 * @param {Number} cellColIndex Index in the matrix
 * @param {Number} cellRowIndex Index in the matrix
 * @param {String} direction Cardinal direction
 * @returns {{cellCoordinates: *[], pathCoordinates: number[]}}
 */
function getPathCoordinatesFromCellEdge (cellColIndex, cellRowIndex, direction) {
    let cellCoordinates = {
        column: cellColIndex,
        row: cellRowIndex
    }
    let coordinates = {
        column: 0,
        row: 0
    }

    if (direction === 'ne') {
        direction = 'sw'
        cellCoordinates.column = cellCoordinates.column + (cellCoordinates.row % 2)
        cellCoordinates.row = cellCoordinates.row - 1
    } else if (direction === 'nw') {
        direction = 'se'
        cellCoordinates.column = cellCoordinates.column + (cellCoordinates.row % 2) - 1
        cellCoordinates.row = cellCoordinates.row - 1
    } else if (direction === 'w') {
        direction = 'e'
        cellCoordinates.column = cellCoordinates.column - 1
    }

    const rowEven = cellCoordinates.row % 2
    switch (direction) {
        case 'e':
            coordinates = {
                column: cellCoordinates.column * 2 + (rowEven ? 3 : 2),
                row: cellCoordinates.row * 2 + 1
            }
            break
        case 'se':
            coordinates = {
                column: cellCoordinates.column * 2 + 1 + rowEven,
                row: cellCoordinates.row * 2 + 2
            }
            break
        case 'sw':
            coordinates = {
                column: cellCoordinates.column * 2 + rowEven,
                row: cellCoordinates.row * 2 + 2
            }
            break
        default:
            throw new Error(`Not a valid selected path ${cellColIndex}, ${cellRowIndex}, ${direction}`)
    }

    return {
        ...coordinates,
        direction,
        cellCoordinates
    }
}

/**
 *
 * @param {Object} path
 * @returns {Array}
 */
function getAdjacentPaths (path) {
    let adjacentPaths = []
    switch (path.orientation) {
        case 'vertical':
            adjacentPaths.push({row: path.row - 1, column: path.column - 1})
            adjacentPaths.push({row: path.row - 1, column: path.column})
            adjacentPaths.push({row: path.row + 1, column: path.column - 1})
            adjacentPaths.push({row: path.row + 1, column: path.column})
            break
        case 'oblique-up':
            adjacentPaths.push({row: path.row, column: path.column - 1})
            adjacentPaths.push({row: path.row + 1, column: path.column})
            adjacentPaths.push({row: path.row - 1, column: path.column + 1})
            adjacentPaths.push({row: path.row, column: path.column + 1})
            break
        case 'oblique-down':
            adjacentPaths.push({row: path.row - 1, column: path.column})
            adjacentPaths.push({row: path.row, column: path.column - 1})
            adjacentPaths.push({row: path.row + 1, column: path.column + 1})
            adjacentPaths.push({row: path.row, column: path.column + 1})
            break
    }
    return adjacentPaths
}

export {
    getDirection,
    getPathCoordinatesFromCellEdge,
    getAdjacentPaths
}
