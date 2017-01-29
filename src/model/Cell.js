/**
 * Created by jd on 15/01/2017.
 */

export const CELL_ACTIVE_STATUS = 1
// export const CELL_CLOSED_STATUS = 2
import {ReadOnlyPropertyError} from '../Errors'


class Cell {

    /**
     * @type {Number}
     * @private
     */
    _column = null

    /**
     * @type {Number}
     * @private
     */
    _row = null

    /**
     * Id of player who has validate the Cell
     * @type {Number}
     * @private
     */
    _closedBy = null
    /**
     * Is the cell is the central root cell
     * @type {Boolean}
     * @private
     */
    _beginning = false


    constructor (column, row, beginning = false, status = CELL_ACTIVE_STATUS) {
        if(column == null || !Number.isInteger(column)) {
            throw new Error('`column` must be a Number to create `Cell`')
        }
        if(row == null || !Number.isInteger(row)) {
            throw new Error('`row` must be a Number to create `Cell`')
        }
        this._row = row
        this._column = column
        this._beginning = beginning
        this.status = status
        return this
    }


    /**
     *
     * @param anotherCell
     * @returns {boolean}
     */
    isEqualTo(anotherCell) {
        return this.column === anotherCell.column
            && this.row === anotherCell.row
            && this.orientation === anotherCell.orientation
    }

    /**
     *
     * @returns {Number}
     */
    get column () {
        return this._column
    }

    /**
     *
     * @param {*} value
     * @throws {ReadOnlyPropertyError} Inconditionally.
     * @return {void}
     */
    set column (value) {
        throw new ReadOnlyPropertyError('column', value)
    }

    /**
     *
     * @returns {Number}
     */
    get row () {
        return this._row
    }

    /**
     *
     * @param {*} value
     * @throws {ReadOnlyPropertyError} Inconditionally.
     * @return {void}
     */
    set row (value) {
        throw new ReadOnlyPropertyError('row', value)
    }

    /**
     *
     * @returns {Number}
     */
    get orientation () {
        return this._orientation
    }

    /**
     *
     * @param {Number} closedBy playerId who closed th cell
     */
    set closedBy (closedBy) {
        if(!Number.isInteger(closedBy)) {
            throw new Error('Argument provided to `Cell.closedBy` is not a valid integer')
        }
        this._closedBy = closedBy
        return this
    }

    /**
     *
     * @returns {Number}
     */
    get closedBy() {
        return this._closedBy
    }

    isClosed () {
        return this._closedBy !== null
    }

    isBeginning () {
        return this._beginning
    }

    toString() {
        return `column: ${this.column}, row: ${this.row}, closed: ${this.closed}, closedBy: ${this.closedBy}`
    }

    toLog() {
        return this.toString()
    }
}

export default Cell
