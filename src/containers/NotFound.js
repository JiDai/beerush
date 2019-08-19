import React, { Component } from 'react';
import { connect } from 'react-redux';


class NotFound extends Component {
    render() {
        return (
            <div>
                Personne ici.
            </div>
        );
    }
}

// Link state to props
export default connect()(NotFound);
