/**
 * Created by jd on 15/01/2017.
 */

import {
    ORIENTATION_VERTICAL,
    ORIENTATION_OBLIQUE_UP,
    ORIENTATION_OBLIQUE_DOWN,
} from '../Constants';

import {
    ReadOnlyPropertyError,
} from '../Errors';


class Path {
    /**
     * Id of player who has validate the path
     * @type {Number}
     * @private
     */
    _validatedBy = null;

    /**
     * @type {Number}
     * @private
     */
    _column = null;

    /**
     * @type {Number}
     * @private
     */
    _row = null;

    /**
     * @type {Number}
     * @private
     */
    _orientation = null;

    /**
     * @type {Boolean}
     */
    available = false;

    /**
     * @type {Boolean}
     */
    selected = false;


    constructor(column, row, orientation, available = false) {
        if (column == null || !Number.isInteger(column)) {
            throw new Error('`column` must be a Number to create `Path`');
        }
        if (row == null || !Number.isInteger(row)) {
            throw new Error('`row` must be a Number to create `Path`');
        }
        if (orientation === null
            || !Number.isInteger(orientation)
            || [ORIENTATION_VERTICAL, ORIENTATION_OBLIQUE_UP, ORIENTATION_OBLIQUE_DOWN].indexOf(orientation) === -1) {
            throw new Error('`orientation` must be a valid Number to create `Path`, given : ' + orientation);
        }
        this._column = column;
        this._row = row;
        this._orientation = orientation;
        this.available = available;
        return this;
    }

    /**
     *
     * @param anotherPath
     * @returns {boolean}
     */
    isEqualTo(anotherPath) {
        return this._column === anotherPath.column
            && this._row === anotherPath.row;
    }

    /**
     *
     * @returns {Number}
     */
    get column() {
        return this._column;
    }

    /**
     *
     * @param {*} value
     * @throws {ReadOnlyPropertyError} Inconditionally.
     * @return {void}
     */
    set column(value) {
        throw new ReadOnlyPropertyError('column', value);
    }

    /**
     *
     * @returns {Number}
     */
    get row() {
        return this._row;
    }

    /**
     *
     * @param {*} value
     * @throws {ReadOnlyPropertyError} Inconditionally.
     * @return {void}
     */
    set row(value) {
        throw new ReadOnlyPropertyError('row', value);
    }

    /**
     *
     * @returns {Number}
     */
    get orientation() {
        return this._orientation;
    }

    /**
     *
     * @param {*} value
     * @throws {ReadOnlyPropertyError} Inconditionally.
     * @return {void}
     */
    set orientation(value) {
        throw new ReadOnlyPropertyError('orientation', value);
    }

    /**
     *
     * @param {Number} validatedBy
     */
    set validatedBy(validatedBy) {
        if (isNaN(validatedBy)) {
            throw new Error('Argument provided to `Path.validatedBy` is not a valid integer');
        }
        this._validatedBy = validatedBy;
        return this;
    }

    /**
     *
     * @returns {Number}
     */
    get validatedBy() {
        return this._validatedBy;
    }

    toString() {
        return `column: ${this._column}, row: ${this._row}, orientation: ${this._orientation}, validatedBy: ${this._validatedBy}`;
    }

    toLog() {
        return this.toString();
    }
}

export default Path;
