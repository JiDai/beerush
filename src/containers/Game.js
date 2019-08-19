import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { validatePath, unvalidatePath, setNewGame } from '../actions/game';
import CellGrid from '../components/CellGrid';
import PathGrid from '../components/PathGrid';
import Bee from '../components/svg/Bee';
import { PLAYERS_COUNT } from '../Constants';


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
        const players = Array(PLAYERS_COUNT).fill().map((x, i) => 'Joueur ' + (i+1));
        return (
            <div>
                <h1>BeeRush</h1>
                <div className="flex">
                    <div>
                    {players.map((player, i) =>
                        <div className="flex flex-center margin-bottom" key={`BeePlayer${i}`}>
                            <Bee width={24} colorClass={`player-${i+1}-color`} />
                            <div className="margin-left">{player}</div>
                            {this.props.currentPlayer === (i + 1) && <div className="margin-left">(en cours)</div>}
                        </div>
                    )}
                    </div>
                    <div className="game-area">
                        <CellGrid />
                        <PathGrid />
                    </div>
                </div>
                {this.props.selectedPath && <div className="text-center margin-top-double">
                    <button className="button button--large margin-right" onClick={this.confirmPath}>OK ?</button>
                    <button className="button" onClick={this.cancelPath}>No, wait!</button>
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
