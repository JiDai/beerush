import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import {
    ORIENTATION_OBLIQUE_UP,
    ORIENTATION_OBLIQUE_DOWN,
    ORIENTATION_VERTICAL,
    PATH_WIDTH,
    CELL_WIDTH,
    CELL_SIDE, CELL_EDGES_HEIGHT, PATH_SPACING, PATH_EDGE_HEIGHT,
} from '../Constants';


class PathGrid extends Component {
    static propTypes = {
        paths: PropTypes.array,
    };

    render() {
        let paths = [];
        let top, left, counter, rowCell;

        counter = 0;

        this.props.paths.forEach(path => {
            const rowIndex = path.row;
            const colIndex = path.column;
            rowCell = Math.floor(rowIndex / 2);

            left = PATH_WIDTH / 2 + (colIndex * (CELL_WIDTH / 2 + PATH_WIDTH / 2));
            top = ((CELL_EDGES_HEIGHT + CELL_SIDE + PATH_SPACING) * rowCell);

            const classes = classNames('path__fill', {
                'path__fill--available': path.available,
                'path__fill--selected': path.selected,
                'path__fill--validated': !!path.validatedBy,
                [`path__fill--validated-by-${path.validatedBy}`]: !!path.validatedBy,
            });

            switch (path.orientation) {
                case ORIENTATION_OBLIQUE_DOWN :
                    paths.push(
                        <svg
                            key={'path' + counter}
                            className="path"
                            style={{ top, left }}
                            width={18}
                            height={13.9}
                            viewBox={`0 0 ${18} ${13.9}`}>
                            <polygon
                                className={classes}
                                points="18,12.1 15,13.9 0,5.2 0,1.7 3,0 18,8.7" />
                            {/*<text x={3} y={4} transform="rotate(30)" fontSize={6}>{colIndex},<br />{rowIndex}</text>*/}
                        </svg>);
                    break;
                case ORIENTATION_OBLIQUE_UP :
                    paths.push(
                        <svg
                            key={'path' + counter}
                            className="path"
                            style={{ top, left }}
                            width={18}
                            height={13.9}
                            viewBox={`0 0 ${18} ${13.9}`}>
                            <polygon
                                className={classes}
                                points="0,12.1 0,8.7 15,0 18,1.7 18,5.2 3,13.9" />
                            {/*<text x={-4} y={13} transform="rotate(-30)" fontSize={6}>{colIndex},<br />{rowIndex}</text>*/}
                        </svg>);
                    break;
                case ORIENTATION_VERTICAL:
                    top = top + CELL_EDGES_HEIGHT - PATH_EDGE_HEIGHT + PATH_SPACING;
                    left = left - PATH_WIDTH / 2;
                    paths.push(
                        <svg
                            key={'path' + counter}
                            className="path"
                            style={{ top, left }}
                            width={6}
                            height={20.8}
                            viewBox={`0 0 ${6} ${20.8}`}>
                            <polygon
                                className={classes}
                                points="3,0 6,1.73 6,19.08 3,20.81 0,19.08 0,1.73" />
                            {/*<text x={-18} y={5} transform="rotate(-90)" fontSize={6}>{colIndex},<br />{rowIndex}</text>*/}
                        </svg>);
                    break;
                default:
                    break;
            }
            counter++;
        });
        return (<div>{paths}</div>);
    }
}


export default connect(
    state => {
        return {
            paths: state.game.paths,
        };
    },
)(PathGrid);
