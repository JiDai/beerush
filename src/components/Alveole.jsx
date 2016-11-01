import React, {
    Component,
    PropTypes
} from 'react'

import classNames from 'classnames'


class Alveole extends Component {
    static propTypes = {
        onMouseDown: PropTypes.func,
        onMouseUp: PropTypes.func,
        onMouseMove: PropTypes.func,
        selected: PropTypes.bool
    }

    render () {
        const className = classNames({
            'alveole': true,
            'alveole--selected': this.props.selected
        })
        return (
            <div className={className}>
                <svg width="234px"
                    onMouseDown={this.props.onMouseDown}
                    onMouseUp={this.props.onMouseUp}
                    onMouseMove={this.props.onMouseMove}
                    height="202px"
                    viewBox="0 0 234 202"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                    <g className="alveole__fill" transform="translate(-44.000000, -80.000000)" strokeWidth="1" stroke="#979797" fill="#D8D8D8">
                        <polygon transform="translate(160.851252, 181.000000) rotate(-270.000000) translate(-160.851252, -181.000000) "
                            points="160.851252 70.1487483 256.851252 125.574374 256.851252 236.425626 160.851252 291.851252 64.8512517 236.425626 64.8512517 125.574374"/>
                    </g>
                </svg>
            </div>
        )
    }
}

export default Alveole;
