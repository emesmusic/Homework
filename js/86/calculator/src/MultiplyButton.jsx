import React, { Component } from 'react'

export default class MultiplyButton extends Component {


    multiply = (a, b) => Number(a) * Number(b);

    changeOperator = () => {
        this.props.updatePreviousNumber();
        this.props.changeOperator(this.multiply);
    }
    render() {
        return <button className='button' style={{ gridArea: "multiply" }} onClick={this.changeOperator}>×</button>;
    }
}
