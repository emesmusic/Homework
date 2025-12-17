import React, { Component } from 'react'

export default class NumberButton extends Component {

  constructor(props) {
    super(props)
    this.value = props.value;
    this.onClick = () => props.onClick(this.value);
    
  }
  render() {
    return (
      <button id={this.value} onClick={this.onClick} value={this.value} className='button' style={{ gridArea: this.props.gridPosition }}>{this.value}</button>
    )
  }
}
