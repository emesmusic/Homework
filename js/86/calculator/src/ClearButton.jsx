import React, { Component } from 'react'

export default class ClearButton extends Component {

    render() {
        return <button className='button' style={{ gridArea: "clear" }} onClick={this.props.onClick}>C</button>;
    }
}
