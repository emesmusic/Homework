import React, { Component } from 'react'

export default class EqualsButton extends Component {
    render() {
        return <button className='button' style={{ gridArea: "equals" }} onClick={this.props.onClick}>=</button>;
    }
}
