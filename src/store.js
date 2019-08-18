import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as reducers from './reducers';


const history = createBrowserHistory();


export default function initStore(initialData) {
    // Add the reducer to your store on the `routing` key
    const store = createStore(
        // We need outerReducer to replace full state as soon as it loaded
        combineReducers({
            ...reducers,
            router: connectRouter(history),
        }),
        initialData,
        composeWithDevTools(
            applyMiddleware(routerMiddleware(history)),
        ),
    );

    return store;
}
