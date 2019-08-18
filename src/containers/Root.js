import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import history from '../AppHistory';
import AppRouting from '../AppRouting';
import initStore from '../store';


/**
 * Root Component.
 */
export default class Root extends Component {
    /**
     * Creates an instance of Root.
     * @param {Object} props Component props
     */
    constructor(props) {
        super(props);

        this.store = initStore({});
    }

    /**
     * React lifecycle.
     */
    render() {
        return (
            <Provider store={this.store}>
                <AppRouting history={history} />
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.shape({}),
};
