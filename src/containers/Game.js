import React from 'react'
import Component from 'react/lib/ReactComponent'
import PropTypes from 'react/lib/ReactPropTypes'
import {connect} from 'react-redux'

import {validatePath, unvalidatePath} from '../actions/game'
import CellGrid from '../components/CellGrid'
import PathGrid from '../components/PathGrid'


class Game extends Component {
    static propTypes = {
        selectedPath: PropTypes.object
    }

    constructor () {
        super()
        this.state = {
            selectedCellIndex: null,
            pathValidating: null,
            waitForPathValidation: false,
        }
    }

    confirmPath = () => {
        this.props.dispatch(validatePath())
    }

    cancelPath = () => {
        this.props.dispatch(unvalidatePath())
    }

    render () {
        return (
            <div>
                <h1>BeeRush</h1>
                <div className="game-area">
                    <CellGrid />
                    <PathGrid />
                </div>
                {this.props.selectedPath && <div>
                    <button onClick={this.confirmPath}>OK ?</button>
                    <button onClick={this.cancelPath}>No, wait!</button>
                </div>}
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            selectedPath: state.game.selectedPath
        }
    }
)(Game)
