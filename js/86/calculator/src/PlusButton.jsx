import React, { Component } from 'react'

export default class PlusButton extends Component {
    plus = (a, b) => Number(a) + Number(b);

    changeOperator = () => {
        this.props.updatePreviousNumber();
        this.props.changeOperator(this.plus);
    }




    render() {
        return <button className='button' style={{ gridArea: "plus" }} onClick={this.changeOperator}>+</button>;
    }
}
