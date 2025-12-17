import React, { Component } from 'react'

export default class ResultsBox extends Component {

    changeHandler = (e) => {
     

        if (!isNaN(Number(e.target.value))) {

            console.log(e);
            this.props.updateCurrentNumber(e.target.value);
        }
        else {
            return;
        }
    }
    render() {
        const { updateCurrentNumber,...rest } = this.props;
        return (
            <input {...rest} onChange={this.changeHandler} />
        )
    }
}
