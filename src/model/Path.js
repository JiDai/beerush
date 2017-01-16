/**
 * Created by jd on 15/01/2017.
 */

import {
    ORIENTATION_VERTICAL,
    ORIENTATION_OBLIQUE_UP,
    ORIENTATION_OBLIQUE_DOWN,
} from '../Constants'


class Path {
    /**
     * Id of player who has validate the path
     * @type {Number}
     * @private
     */
    _playerId = null

    constructor (column, row, orientation) {
        if(column == null || !Number.isInteger(column)) {
            throw new Error('`column` must be a Number to create `Path`')
        }
        if(row == null || !Number.isInteger(row)) {
            throw new Error('`row` must be a Number to create `Path`')
        }
        if(!orientation
            || typeof orientation !== 'string'
            || [ORIENTATION_VERTICAL, ORIENTATION_OBLIQUE_UP, ORIENTATION_OBLIQUE_DOWN].indexOf(orientation) === -1) {
            throw new Error('`orientation` must be a valid String to create `Path`, given : ' + orientation)
        }
        this.row = row
        this.column = column
        this.orientation = orientation
        return this
    }

    /**
     *
     * @param playerId
     */
    set playerId (playerId) {
        this._playerId = Number(playerId)
        return this
    }

    get playerId() {
        return this._playerId
    }


    /**
     *
     * @param anotherPath
     * @returns {boolean}
     */
    isEqualTo(anotherPath) {
        return this.column === anotherPath.column
            && this.row === anotherPath.row
            && this.orientation === anotherPath.orientation
    }

    toString() {
        return `column: ${this.column}, row: ${this.row}, orientation: ${this.orientation}, playerId: ${this.playerId}`
    }

    toLog() {
        return `column: ${this.column}, row: ${this.row}, orientation: ${this.orientation}, playerId: ${this.playerId}`
    }
}

export default Path
