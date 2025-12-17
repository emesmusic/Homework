import React from 'react'
import PlusButton from './PlusButton'
import MinusButton from './MinusButton'
import MultiplyButton from './MultiplyButton'
import DivideButton from './DivideButton'
import EqualsButton from './EqualsButton'
import ClearButton from './ClearButton'
import NumberButton from './NumberButton'
import ResultsBox from './ResultsBox'
export default class Calculator extends React.Component {
    state = { previousNumber: 0, currentNumber: '', operator: null, currentDisplayNumber: '' };


    clear = () => {
        this.setState({ previousNumber: 0, currentNumber: '', operator: null, currentDisplayNumber: '' })
    }

    updateCurrentNumber = (number) => {
        this.setState({ currentNumber: number, currentDisplayNumber: number })
    }
    updatePreviousNumber = () => {
        this.setState({ previousNumber: this.state.currentNumber, currentNumber: '' })
    }

    addToCurrentNumber = (number) => {
        let temp;
        if (this.state.currentNumber) {
            temp = this.state.currentNumber + number;
            this.setState({ currentNumber: temp, currentDisplayNumber: temp })
        }
        else {
            this.setState({ currentNumber: number, currentDisplayNumber: number })
        }
    }
    changeOperator = (operator) => {
        this.setState({ operator })
    }
    equals = () => {
        const result = this.state.operator?.(Number(this.state.previousNumber), Number(this.state.currentNumber))
        const prev = this.state.currentNumber;
        this.setState({
            currentNumber: result, currentDisplayNumber: result, previousNumber: prev
        })
    }

    render() {

        return (

            <div className="calculator">
                <ResultsBox type="text" style={{ gridArea: "results" }} value={this.state.currentDisplayNumber} updateCurrentNumber={this.updateCurrentNumber} />
                <NumberButton value="7" gridPosition="seven" onClick={this.addToCurrentNumber} />
                <NumberButton value="8" gridPosition="eight" onClick={this.addToCurrentNumber} />
                <NumberButton value="9" gridPosition="nine" onClick={this.addToCurrentNumber} />
                <NumberButton value="4" gridPosition="four" onClick={this.addToCurrentNumber} />
                <NumberButton value="5" gridPosition="five" onClick={this.addToCurrentNumber} />
                <NumberButton value="6" gridPosition="six" onClick={this.addToCurrentNumber} />
                <NumberButton value="1" gridPosition="one" onClick={this.addToCurrentNumber} />
                <NumberButton value="2" gridPosition="two" onClick={this.addToCurrentNumber} />
                <NumberButton value="3" gridPosition="three" onClick={this.addToCurrentNumber} />
                <NumberButton value="0" gridPosition="zero" onClick={this.addToCurrentNumber} />
                <PlusButton changeOperator={this.changeOperator} updatePreviousNumber={this.updatePreviousNumber} />
                <MinusButton changeOperator={this.changeOperator} updatePreviousNumber={this.updatePreviousNumber} />
                <MultiplyButton changeOperator={this.changeOperator} updatePreviousNumber={this.updatePreviousNumber} />
                <DivideButton changeOperator={this.changeOperator} updatePreviousNumber={this.updatePreviousNumber} />
                <EqualsButton onClick={this.equals} changeOperator={this.changeOperator} updatePreviousNumber={this.updatePreviousNumber} />
                <ClearButton onClick={this.clear} />

            </div>
        )

    }
}