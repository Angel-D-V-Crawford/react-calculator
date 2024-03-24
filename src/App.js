import './App.css';
import { useState } from 'react';

function Display(props) {
  return(
    <div id="display">
      <i id="display-text">{props.displayText}</i>
    </div>
  );
}

function Calculator() {
  const [display, setDisplay] = useState('0');

  const handleConcatExpression = (event) => {
    const symbols = ['/','+','-','*','.'];
    const numberReg = /\d+/;

    if(numberReg.test(event.target.innerText)) {
      setDisplay((prevDisplay) => prevDisplay === '0' ? event.target.innerText : prevDisplay + event.target.innerText);
      return;
    }

    switch(event.target.id) {
      case 'divide':
        setDisplay((prevDisplay) => prevDisplay + '/');
        break;
      case 'add':
        setDisplay((prevDisplay) => prevDisplay + '+');
        break;
      case 'subtract':
        setDisplay((prevDisplay) => prevDisplay + '-');
        break;
      case 'multiply':
        setDisplay((prevDisplay) => prevDisplay + '*');
        break;
      case 'decimal':
        const lastNumber = display.split(/[-+/*]/g).pop();
        if (!lastNumber) return;
        if (lastNumber.includes(".")) return;
        setDisplay((prevDisplay) => prevDisplay + '.');
        break;
      default:
        return;
    }
    /*
    switch(event.target.id) {
      case 'divide':
        setDisplay((prevDisplay) => symbols.includes(prevDisplay.slice(-1)) ? prevDisplay : prevDisplay + '/');
        break;
      case 'add':
        setDisplay((prevDisplay) => symbols.includes(prevDisplay.slice(-1)) ? prevDisplay : prevDisplay + '+');
        break;
      case 'subtract':
        setDisplay((prevDisplay) => symbols.includes(prevDisplay.slice(-1)) ? prevDisplay : prevDisplay + '-');
        break;
      case 'multiply':
        setDisplay((prevDisplay) => symbols.includes(prevDisplay.slice(-1)) ? prevDisplay : prevDisplay + '*');
        break;
      case 'decimal':
        setDisplay((prevDisplay) => symbols.includes(prevDisplay.slice(-1)) ? prevDisplay : prevDisplay + '.');
        break;
      default:
        return;
    }
    */
  }

  const evaluateExpression = () => {
    const operationExp = /[-+/*]/g;
    const displayArr = display.split('');
    const newExpressionArr = [];

    //if(operationExp.test(display.charAt(display.length-1))) return;
    //operators.splice(-1);
    //operators.shift();

    // THINK FOR AN ALGORITHM

    let operatorsCount = 0;
    let indexFirstOperator = -1;
    let indexLastOperator = 0;
    let isLastOperatorMinus = false;

    console.log(displayArr);
    console.log(newExpressionArr);

    for(let i = 0; i < displayArr.length; i++) {
      console.log('operationExp.test ' + displayArr[i] + ' = ' + operationExp.test(displayArr[i]));

      //if(operationExp.test(displayArr[i])) {
      if(['+','-','*','/'].includes(displayArr[i])) {
        if(indexFirstOperator < 0) indexFirstOperator = i;
        indexLastOperator = i;
        operatorsCount += 1;
        //console.log('displayArr[i]: ' + displayArr[i]);
        //console.log('operatorsCount: ' + operatorsCount);
      } else {
        if(operatorsCount > 1) {
          isLastOperatorMinus = displayArr[indexLastOperator] === '-' ? true : false;

          //console.log('indexFirstOperator: ' + displayArr[indexFirstOperator]);
          //console.log('indexLastOperator: ' + displayArr[indexLastOperator]);
          //console.log('operatorsCount: ' + operatorsCount);
          //console.log('displayArr[i]: ' + displayArr[i]);

          if(isLastOperatorMinus && operatorsCount === 2) {
            newExpressionArr.push(displayArr[indexFirstOperator]);
          } else if(isLastOperatorMinus && operatorsCount > 2) {
            newExpressionArr.push(displayArr[indexLastOperator - 1]);
          }
          newExpressionArr.push(displayArr[indexLastOperator]);
        } else {
          if(i > 0 && ['+','-','*','/'].includes(displayArr[i - 1])) {
            newExpressionArr.push(displayArr[i - 1]);
          }
        }
        newExpressionArr.push(displayArr[i]);
        operatorsCount = 0;
        indexFirstOperator = -1;

        console.log('Loop: ' + i);
        console.log('Element: ' + displayArr[i]);
        console.log('operatorsCount: ' + operatorsCount);
        console.log(newExpressionArr);
      }
    }

    const expression = newExpressionArr.join('');
    console.log(expression);

    let result = operationExp.test(expression.charAt(0)) ? eval(display + expression) : eval(expression);
    console.log(result);

    if(isFinite(result)) {
      setDisplay(result.toString());
    } else { 
      setDisplay('0');
    }
  }

  return(
    <div id="calculator">
      <Display displayText={display} />
      <div id="buttons">
        <button className="calculator-button" id="clear" onClick={() => {setDisplay('0');}}>AC</button>
        <button className="calculator-button operation-button" id="divide" onClick={handleConcatExpression}>÷</button>

        <button className="calculator-button number-button" id="seven" onClick={handleConcatExpression}>7</button>
        <button className="calculator-button number-button" id="eight" onClick={handleConcatExpression}>8</button>
        <button className="calculator-button number-button" id="nine" onClick={handleConcatExpression}>9</button>
        <button className="calculator-button operation-button" id="add" onClick={handleConcatExpression}>+</button>

        <button className="calculator-button number-button" id="four" onClick={handleConcatExpression}>4</button>
        <button className="calculator-button number-button" id="five" onClick={handleConcatExpression}>5</button>
        <button className="calculator-button number-button" id="six" onClick={handleConcatExpression}>6</button>
        <button className="calculator-button operation-button" id="subtract" onClick={handleConcatExpression}>-</button>

        <button className="calculator-button number-button" id="one" onClick={handleConcatExpression}>1</button>
        <button className="calculator-button number-button" id="two" onClick={handleConcatExpression}>2</button>
        <button className="calculator-button number-button" id="three" onClick={handleConcatExpression}>3</button>
        <button className="calculator-button operation-button" id="multiply" onClick={handleConcatExpression}>X</button>

        <button className="calculator-button number-button" id="zero" onClick={handleConcatExpression}>0</button>
        <button className="calculator-button number-button" id="decimal" onClick={handleConcatExpression}>.</button>
        <button className="calculator-button operation-button" id="equals" onClick={evaluateExpression}>=</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;
