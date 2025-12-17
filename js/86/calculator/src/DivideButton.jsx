import React, { Component } from 'react'

export default class DivideButton extends Component {

    divide = (a, b) => Number(a) / Number(b);

    changeOperator = () => {
        this.props.updatePreviousNumber();
        this.props.changeOperator(this.divide);
    }

    render() {
        return <button className='button' style={{ gridArea: "divide" }} onClick={this.changeOperator}>÷</button>;
    }
}
