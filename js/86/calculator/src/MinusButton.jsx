import React, { Component } from 'react'

export default class MinusButton extends Component {

    minus = (a, b) => Number(a) - Number(b);

    changeOperator = () => {
        // if (this.props.currentOperator) {
        //     this.props.equals();
        // }

        this.props.updatePreviousNumber();
        this.props.changeOperator(this.minus);
    }

    render() {
        return <button className='button' style={{ gridArea: "minus" }} onClick={this.changeOperator}>-</button>;
    }
}
