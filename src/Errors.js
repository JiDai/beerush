/**
 * Created by jd on 29/01/2017.
 */

export class ReadOnlyPropertyError extends Error {
    constructor(property, value) {
        super(`The ${property} property cannot be written. ${value} was passed.`);
    }
}
