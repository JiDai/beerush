import React, {
    Component
}
from 'react'
import {Link} from 'react-router'

class MainMenu extends Component {
    static propTypes = {}

    render () {
        return (<div>
            <Link to={'/'}>Home</Link>
            <Link to={'/game'}>Nouvelle partie</Link>
        </div>)
    }
}

export default MainMenu;
