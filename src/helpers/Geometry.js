import {
    MIN_DISTANCE_TO_GET_DIRECTION,
    DEFAULT_AVAILABLE_PATH,
    ORIENTATION_VERTICAL,
    ORIENTATION_OBLIQUE_UP,
    ORIENTATION_OBLIQUE_DOWN,
} from '../Constants';
import Path from '../model/Path';


/**
 * Return an edge direction (cardinal) inside an cell
 * @param {Object} rect Component rect wrapping the cell
 * @param {Number} posX The position X to get direction from (MouseX)
 * @param {Number} posY The position Y to get direction from (MouseY)
 * @returns {String|undefined}
 */
function getDirection(rect, posX, posY) {
    const distX = posX - rect.left - rect.width / 2;
    const distY = posY - rect.top - rect.height / 2;
    let a = Math.atan2(distY, distX);
    let edgeIndex;
    if (Math.abs(distX) < MIN_DISTANCE_TO_GET_DIRECTION && Math.abs(distY) < MIN_DISTANCE_TO_GET_DIRECTION) {
        // gesture not enough significant
        return;
    }
    const deg = a / Math.PI * 180;
    if (deg >= -30 && deg <= 30) {
        edgeIndex = 'e';
    } else if (deg > 30 && deg <= 90) {
        edgeIndex = 'se';
    } else if (deg > 90 && deg <= 150) {
        edgeIndex = 'sw';
    } else if (deg > 150 || deg <= -150) {
        edgeIndex = 'w';
    } else if (deg > -150 && deg >= -90) {
        edgeIndex = 'ne';
    } else if (deg < -90 && deg < -30) {
        edgeIndex = 'nw';
    }
    return edgeIndex;
}

/**
 *
 * @param {Number} cellColIndex Index in the matrix
 * @param {Number} cellRowIndex Index in the matrix
 * @param {String} direction Cardinal direction
 * @returns {Path}
 */
function getPathCoordinatesFromCellEdge(cellColIndex, cellRowIndex, direction) {
    let cellCoordinates = {
        column: cellColIndex,
        row: cellRowIndex,
    };
    let coordinates = {
        column: 0,
        row: 0,
    };

    if (direction === 'ne') {
        direction = 'sw';
        cellCoordinates.column = cellCoordinates.column + (cellCoordinates.row % 2);
        cellCoordinates.row = cellCoordinates.row - 1;
    } else if (direction === 'nw') {
        direction = 'se';
        cellCoordinates.column = cellCoordinates.column + (cellCoordinates.row % 2) - 1;
        cellCoordinates.row = cellCoordinates.row - 1;
    } else if (direction === 'w') {
        direction = 'e';
        cellCoordinates.column = cellCoordinates.column - 1;
    }

    const rowEven = cellCoordinates.row % 2;
    switch (direction) {
        case 'e':
            coordinates = {
                column: cellCoordinates.column * 2 + (rowEven ? 3 : 2),
                row: cellCoordinates.row * 2 + 1,
            };
            break;
        case 'se':
            coordinates = {
                column: cellCoordinates.column * 2 + 1 + rowEven,
                row: cellCoordinates.row * 2 + 2,
            };
            break;
        case 'sw':
            coordinates = {
                column: cellCoordinates.column * 2 + rowEven,
                row: cellCoordinates.row * 2 + 2,
            };
            break;
        default:
            throw new Error(`Not a valid selected path ${cellColIndex}, ${cellRowIndex}, ${direction}`);
    }

    const path = { column: coordinates.column, row: coordinates.row };
    return path;
}

/**
 *
 * @param path
 * @returns {Array}
 */
function getAllAdjacentCells(path) {
    return [{
        row: Math.round(path.row / 4),
        column: Math.round(path.column / 2),
    }];
}

/**
 *
 * @param paths
 * @returns {Array}
 */
function getAllAdjacentPaths(paths) {
    if (!Array.isArray(paths)) {
        throw new Error('`paths` must be an array in `getAllAdjacentPaths`');
    }
    let allPaths = [];
    paths.forEach(path => {
        allPaths = allPaths.concat(getAdjacentPaths(path));
    });
    return allPaths;
}

/**
 *
 * @param {Object} path
 * @returns {Array}
 */
function getAdjacentPaths(path) {
    let adjacentPaths = [];
    switch (path.orientation) {
        case ORIENTATION_VERTICAL:
            adjacentPaths.push(new Path(path.column - 1, path.row - 1, ORIENTATION_OBLIQUE_DOWN));
            adjacentPaths.push(new Path(path.column, path.row - 1, ORIENTATION_OBLIQUE_UP));
            adjacentPaths.push(new Path(path.column - 1, path.row + 1, ORIENTATION_OBLIQUE_UP));
            adjacentPaths.push(new Path(path.column, path.row + 1, ORIENTATION_OBLIQUE_DOWN));
            break;
        case ORIENTATION_OBLIQUE_UP:
            adjacentPaths.push(new Path(path.column - 1, path.row, ORIENTATION_OBLIQUE_DOWN));
            adjacentPaths.push(new Path(path.column, path.row + 1, ORIENTATION_VERTICAL));
            adjacentPaths.push(new Path(path.column + 1, path.row - 1, ORIENTATION_VERTICAL));
            adjacentPaths.push(new Path(path.column + 1, path.row, ORIENTATION_OBLIQUE_DOWN));
            break;
        case ORIENTATION_OBLIQUE_DOWN:
            adjacentPaths.push(new Path(path.column, path.row - 1, ORIENTATION_VERTICAL));
            adjacentPaths.push(new Path(path.column - 1, path.row, ORIENTATION_OBLIQUE_UP));
            adjacentPaths.push(new Path(path.column + 1, path.row + 1, ORIENTATION_VERTICAL));
            adjacentPaths.push(new Path(path.column + 1, path.row, ORIENTATION_OBLIQUE_UP));
            break;
        default:
            throw new Error('`path.orientation` is not valid : ' + path.orientation);
    }
    return adjacentPaths;
}

function getDefaultAvailablePaths() {
    return DEFAULT_AVAILABLE_PATH.map(path => new Path(path.column, path.row, path.orientation));
}


export {
    getDirection,
    getPathCoordinatesFromCellEdge,
    getDefaultAvailablePaths,
    getAllAdjacentPaths,
    getAdjacentPaths,
    getAllAdjacentCells,
};
