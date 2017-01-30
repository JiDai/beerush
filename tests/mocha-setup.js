/**
 * Created by jd on 29/01/2017.
 */

var path = require('path')

require('babel-core/register')()

// Disable resolution of images path and return a dummy path
function rewireImages (module, filename)  {
    module.exports = '/' + path.basename(filename)
}

require.extensions['.svg'] = rewireImages
require.extensions['.png'] = rewireImages
require.extensions['.jpg'] = rewireImages
require.extensions['.jpeg'] = rewireImages
require.extensions['.gif'] = rewireImages

var jsdom = require('jsdom')

// setup the simplest document possible
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')

// get the window object out of the document
var win = doc.defaultView

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = doc
global.window = win

jsdom.changeURL(window, 'https://www.beerush.com/')

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(win)

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
    for (let key in window) {
        if (!window.hasOwnProperty(key)) continue
        if (key in global) continue

        global[key] = window[key]
    }
}
