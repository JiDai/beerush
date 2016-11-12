import React from 'react'
import Component from 'react/lib/ReactComponent'
import Link from 'react-router/lib/Link'

class MainMenu extends Component {
    static propTypes = {}

    render () {
        return (<div>
            <Link to={'/'}>Home</Link>
            <Link to={'/game'}>Nouvelle partie</Link>
        </div>)
    }
}

export default MainMenu
