import React, { Component } from 'react';
import { connect } from 'react-redux';


class Home extends Component {
    render() {
        return (
            <div>
                Bienvenue.
            </div>
        );
    }
}

// Link state to props
export default connect()(Home);
