/**
 * Checking if we are in a browser or not
 * @type {Boolean}
 */
const isBrowser = !(
    typeof process === 'object' &&
    String(process) === '[object process]' &&
    !process.browser
);

/**
 * BrowserHistory.
 */
// eslint-disable-next-line import/no-mutable-exports
let history;

/* eslint-disable global-require */
if (isBrowser) {
    history = require('history').createBrowserHistory();
} else {
    history = require('history').createMemoryHistory();
}

export default history;
