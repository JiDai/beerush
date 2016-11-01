/**
 * Created by jd on 26/07/16.
 */
import React, {
    Component,
    PropTypes
} from 'react'

import {connect} from 'react-redux'


class App extends Component {
    render () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

// Link state to props
export default connect(
    state => {
        return {
        }
    }
)(App)
