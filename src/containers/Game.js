import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { validatePath, unvalidatePath, setNewGame } from '../actions/game';
import CellGrid from '../components/CellGrid';
import PathGrid from '../components/PathGrid';


class Game extends Component {
    static propTypes = {
        selectedPath: PropTypes.object,
        currentPlayer: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedCellIndex: null,
            pathValidating: null,
            waitForPathValidation: false,
        };
    }

    componentWillMount() {
        this.props.dispatch(setNewGame());
    }

    confirmPath = () => {
        this.props.dispatch(validatePath());
    };

    cancelPath = () => {
        this.props.dispatch(unvalidatePath());
    };

    render() {
        return (
            <div>
                <h1>BeeRush</h1>
                <p>Joueur : {this.props.currentPlayer}</p>
                <div className="game-area">
                    <CellGrid />
                    <PathGrid />
                </div>
                {this.props.selectedPath && <div>
                    <button onClick={this.confirmPath}>OK ?</button>
                    <button onClick={this.cancelPath}>No, wait!</button>
                </div>}
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            currentPlayer: state.game.currentPlayer,
            selectedPath: state.game.selectedPath,
        };
    },
)(Game);
