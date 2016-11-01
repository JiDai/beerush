import React, {Component, PropTypes} from 'react';

import Alveole from '../components/Alveole'


class Game extends Component {
    constructor () {
        super()
        this.state = {
            selectedAlveoleIndex: null
        }
    }

    static propTypes = {}

    onMouseDown = (event) => {
        this.setState({
            selectedAlveoleIndex: 0
        })
    }

    onMouseUp = (event) => {
        const rect = event.target.getBoundingClientRect()
        console.log("center : ", rect);
        console.log(event.clientX + rect.left - rect.width / 2)
        console.log(event.clientY + rect.top - rect.height / 2)
        this.setState({
            selectedAlveoleIndex: null
        })
    }

    onMouseMove = (event) => {
    }

    render () {
        return (<div>
            <h1>Jeu</h1>
            <Alveole
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseMove={this.onMouseMove}
                selected={this.state.selectedAlveoleIndex === 0}
            />
        </div>)
    }
}

export default Game;
