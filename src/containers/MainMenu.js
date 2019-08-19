import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainMenu extends Component {
    static propTypes = {};

    render() {
        return (<div className="main-menu">
            <Link className="main-menu__item" to={'/'}>Home</Link>
            <Link className="main-menu__item" to={'/game'}>Nouvelle partie</Link>
        </div>);
    }
}

export default MainMenu;
