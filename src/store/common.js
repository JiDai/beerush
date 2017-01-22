/**
 * Created by jd on 22/01/2017.
 */

import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

export function getReducers (reducers) {
    return combineReducers(Object.assign(reducers, {
        routing: routerReducer
    }))
}