import React from 'react'
import Component from 'react/lib/ReactComponent'
import {connect} from 'react-redux'

import '../styles/main.scss'


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
export default connect()(App)
