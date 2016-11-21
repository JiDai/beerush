import {MIN_DISTANCE_TO_GET_ORIENTATION} from '../Constants'


/**
 * Return an edge orientation (cardinal) inside an cell
 * @param {Object} rect Component rect wrapping the cell
 * @param {Number} posX The position X to get orientation from (MouseX)
 * @param {Number} posY The position Y to get orientation from (MouseY)
 * @returns {String|undefined}
 */
function getOrientation (rect, posX, posY) {
    const distX = posX - rect.left - rect.width / 2
    const distY = posY - rect.top - rect.height / 2
    let a = Math.atan2(distY, distX)
    let edgeIndex
    if (Math.abs(distX) < MIN_DISTANCE_TO_GET_ORIENTATION && Math.abs(distY) < MIN_DISTANCE_TO_GET_ORIENTATION) {
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
 * @param {String} orientation Carinal orientation
 * @returns {{cellCoordinates: *[], pathCoordinates: number[]}}
 */
function getPathCoordinatesFromCellEdge (cellColIndex, cellRowIndex, orientation) {
    let cellCoordinates = {
        column: cellColIndex,
        row: cellRowIndex
    }
    let coordinates = {
        column: 0,
        row: 0
    }

    if (orientation === 'ne') {
        orientation = 'sw'
        cellCoordinates.column = cellCoordinates.column + (cellCoordinates.row % 2)
        cellCoordinates.row = cellCoordinates.row - 1
    } else if (orientation === 'nw') {
        orientation = 'se'
        cellCoordinates.column = cellCoordinates.column + (cellCoordinates.row % 2) - 1
        cellCoordinates.row = cellCoordinates.row - 1
    } else if (orientation === 'w') {
        orientation = 'e'
        cellCoordinates.column = cellCoordinates.column - 1
    }

    const rowEven = cellCoordinates.row % 2
    switch (orientation) {
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
            throw new Error(`Not a valid selected path ${cellColIndex}, ${cellRowIndex}, ${orientation}`)
    }

    return {
        ...coordinates,
        cellCoordinates
    }
}


export {
    getOrientation,
    getPathCoordinatesFromCellEdge
}
