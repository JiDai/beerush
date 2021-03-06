import React, { Component } from 'react';
import { connect } from 'react-redux';

import MainMenu from './MainMenu';
import '../styles/main.scss';


class App extends Component {
    render() {
        return (
            <div>
                <MainMenu />
                {this.props.children}
            </div>
        );
    }
}

// Link state to props
export default connect()(App);
