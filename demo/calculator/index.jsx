import { View, Render, Window, Text, Image, Dimensions, EAlignType, Button, Textarea } from 'lvgljs-ui';
import React, { useState, useRef, useEffect, useCallback } from 'react';

const { width, height } = Dimensions.window

function evaluate(arrFormula) {
    const arrPostfix = infix2Postfix(arrFormula);
    return evaluatePostfix(arrPostfix);
}
  
function isNotNumber(input) {
    return (
      input === "(" ||
      input === ")" ||
      input === "+" ||
      input === "-" ||
      input === "*" ||
      input === "/" ||
      input === "%"
    );
}
  
function isNumber(input) {
    return !isNotNumber(input);
}
  
function isOperator(input) {
    return (
      input === "+" ||
      input === "-" ||
      input === "*" ||
      input === "/" ||
      input === "%"
    );
}
  
function getPriority(input) {
    if (input === "+" || input === "-") return 1;
    else if (input === "*" || input === "/" || input === "%") return 2;
    return 0;
}
  
function infix2Postfix(arrFormula) {
    let result = [],
      stack = [];
  
    arrFormula.forEach(item => {
      if (isNumber(item)) {
        result.push(item);
      } else if (item === "(") {
        stack.push(item);
      } else if (item === ")") {
        while (stack.length > 0) {
          const pulledItem = stack.pop();
  
          if (pulledItem === "(") break;
          else result.push(pulledItem);
        }
      } else if (isOperator(item)) {
        while (stack.length > 0) {
          const peekedItem = stack[stack.length - 1];
  
          if (
            isOperator(peekedItem) &&
            getPriority(peekedItem) >= getPriority(item)
          ) {
            result.push(peekedItem);
            stack.pop();
          } else break;
        }
  
        stack.push(item);
      } else {
        console.log("Something else!!!");
      }
    });
  
    while (stack.length > 0) {
      result.push(stack.pop());
    }
  
    return result;
}
  
function evaluatePostfix(arrPostfix) {
    let stack = [];
  
    arrPostfix.forEach(item => {
      if (isNumber(item)) {
        stack.push(item);
      } else if (isOperator(item)) {
        const num1 = Number.parseFloat(stack.pop()),
          num2 = Number.parseFloat(stack.pop());
        let result = "";
  
        switch (item) {
          case "+":
            result = num2 + num1;
            break;
          case "-":
            result = num2 - num1;
            break;
          case "*":
            result = num2 * num1;
            break;
          case "/":
            result = num2 / num1;
            break;
          case "%":
            result = num2 % num1;
            break;
          default:
            console.log("Something else!!!");
        }
  
        stack.push(result + "");
      } else {
        console.log("Something else!!!");
      }
    });
  
    return Number.parseFloat(stack[0]);
}

function App () {
    const [formula, setFormula] = useState([])
    const [history, setHistory] = useState([])
    const [input, setInput] = useState("")
    const [afterCalculation, setAfterCalculation] = useState(false)

    const onDigit = (e) => {
        const digit = e.target.dataset?.value;
    
        if (afterCalculation) {
            setInput(digit)
            setAfterCalculation(false)
        } else if (input === "0") {
            setInput(digit)
        } else if (isNotNumber(input)) {
            setInput(digit)
            setFormula(formula.concat(input))
        } else {
            setInput(input.concat(digit))
        }
    }

    const onDecimal = ({ target }) => {
        const decimal = target.dataset.value;
        if (afterCalculation) {
            setInput(`0${decimal}`)
            setAfterCalculation(false)
        } else if (isNotNumber(input)) {
            setInput(`0${decimal}`)
            setFormula(formula.concat(input))
        } else if (!input.includes(decimal)) {
            setInput(input.concat(decimal))
        }
    }

    const onOperator = ({ target }) => {
        const operator = target.dataset.value;
        if (isOperator(input)) {
            setInput(operator)
            setAfterCalculation(false)
        } else if (input !== "(") {
            setInput(operator)
            setFormula(formula.concat(input))
            setAfterCalculation(false)
        }
    }

    const onClear = () => {
        setFormula([])
        setInput("0")
        setAfterCalculation(false)
    }

    const onParenthesis = ({ target }) => {
        const parenthesis = target.dataset.value;
    
        if (parenthesis === "(") {
          if (
            (isNumber(input) && input !== "0") ||
            (isNumber(input) &&
              input === "0" &&
              formula.length > 0) ||
            input === ")"
          ) {
            setInput(parenthesis)
            setFormula(formula.concat([input, "*"]))
            setAfterCalculation(false)
          } else if (isOperator(input) || input === "(") {
            setInput(parenthesis)
            setFormula(formula.concat(input))
            setAfterCalculation(false)
          } else if (
            isNumber(input) &&
            input === "0" &&
            formula.length === 0
          ) {
            setInput(parenthesis)
            setAfterCalculation(false)
          }
        } else {
          const arrayOpenParenthesis = formula.join("").match(/\(/g);
          const numOpenParenthesis = arrayOpenParenthesis
            ? arrayOpenParenthesis.length
            : 0;
    
          const arrayCloseParenthesis = formula.join("").match(/\)/g);
          const numCloseParenthesis = arrayCloseParenthesis
            ? arrayCloseParenthesis.length
            : 0;
    
          if (
            (isNumber(input) || input === ")") &&
            numOpenParenthesis > 0 &&
            numOpenParenthesis > numCloseParenthesis
          ) {
            setInput(parenthesis)
            setAfterCalculation(false)
            setFormula(formula.concat(input))
          }
        }
    }

    const onBackspace = () => {
        const currentInputLength = input.length;
    
        if (input === "Infinity" || input === "-Infinity" || input === "NaN") {
            setInput("0")
            setAfterCalculation(false)
        } else if (currentInputLength > 1) {
            setInput(input.slice(0, currentInputLength - 1))
            setAfterCalculation(false)
        } else if (input !== "0") {
            setInput("0")
            setAfterCalculation(false)
        } else if (formula.length > 0) {
            setInput(formula[formula.length - 1])
            setFormula(formula.slice(0, formula.length - 1))
            setAfterCalculation(false)
        }
    }

    const onEqual = () => {
        const finalFormula = formula.concat(input);
        const result = evaluate(finalFormula);
    
        if (!Number.isNaN(result)) {
          const newHistoryItem = {
            formula: finalFormula,
            result: result
          };

          setInput(result + "")
          setFormula([])
          setHistory([].concat(history, newHistoryItem))
          setAfterCalculation(true)
        }
    }

    let historyStr = ''

    history.forEach(item => {
        historyStr += item.formula.join("")
        historyStr += "\n"
        historyStr += `=${item.result}`
        historyStr += "\n"
    })
    return (
        <Window style={style.window}>
            <Textarea 
                style={style.textarea}
                value={`${historyStr}\n${formula.join("")}${input}`}
            >
            </Textarea>
            <View style={style.buttonWrapper}>
                <Button 
                    style={[style.button, style.button1]}
                    onClick={onParenthesis}
                    data-value="("
                >
                    <Text style={style.buttonText}>{"("}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button2]}
                    onClick={onParenthesis}
                    data-value=")"
                >
                    <Text style={style.buttonText}>{")"}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button3]}
                    onClick={onClear}
                    data-value="AC"
                >
                    <Text style={style.buttonText}>{"AC"}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button4]}
                    onClick={onBackspace}
                >
                    <Text style={style.buttonText}>{"CE"}</Text>
                </Button>

                {/* line2 */}
                
                <Button 
                    style={[style.button, style.button5]}
                    onClick={onDigit}
                    data-value="1"
                >
                    <Text style={style.buttonText}>{"1"}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button6]}
                    onClick={onDigit}
                    data-value="2"
                >
                    <Text style={style.buttonText}>{"2"}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button7]}
                    onClick={onDigit}
                    data-value="3"
                >
                    <Text style={style.buttonText}>{"3"}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button8]}
                    onClick={onOperator}
                    data-value="*"
                >
                    <Text style={style.buttonText}>{"*"}</Text>
                </Button>

                {/* line3 */}

                <Button 
                    style={[style.button, style.button9]}
                    onClick={onDigit}
                    data-value="4"
                >
                    <Text style={style.buttonText}>{"4"}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button10]}
                    onClick={onDigit}
                    data-value="5"
                >
                    <Text style={style.buttonText}>{"5"}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button11]}
                    onClick={onDigit}
                    data-value="6"
                >
                    <Text style={style.buttonText}>{"6"}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button12]}
                    onClick={onOperator}
                    data-value="/"
                >
                    <Text style={style.buttonText}>{"/"}</Text>
                </Button>

                {/* line4 */}

                <Button 
                    style={[style.button, style.button13]}
                    onClick={onDigit}
                    data-value="7"
                >
                    <Text style={style.buttonText}>{"7"}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button14]}
                    onClick={onDigit}
                    data-value="8"
                >
                    <Text style={style.buttonText}>{"8"}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button15]}
                    onClick={onDigit}
                    data-value="9"
                >
                    <Text style={style.buttonText}>{"9"}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button16]}
                    onClick={onOperator}
                    data-value="-"
                >
                    <Text style={style.buttonText}>{"-"}</Text>
                </Button>

                {/* line5 */}

                <Button 
                    style={[style.button, style.button17]}
                    onClick={onDigit}
                    data-value="0"
                >
                    <Text style={style.buttonText}>{"0"}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button18]}
                    onClick={onDecimal}
                    data-value="."
                >
                    <Text style={style.buttonText}>{"."}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button19]}
                    onClick={onEqual}
                >
                    <Text style={style.buttonText}>{"="}</Text>
                </Button>
                <Button 
                    style={[style.button, style.button20]}
                    onClick={onOperator}
                    data-value="+"
                >
                    <Text style={style.buttonText}>{"+"}</Text>
                </Button>
            </View> 
        </Window>
    )
};

const style = {
    window: {
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'space-between',
        'height': height,
        'width': width,
        'padding': 0,
        'border-radius': 0,
        'border-width': 0,
    },
    textarea: {
        'font-size': '34px',
        'background-color': 'black',
        'text-color': 'white',
        'border-radius': 0,
        'height': Math.floor(height / 4),
        'width': width,
        'left': 0,
        'top': 0,
        'flex-grow': 0
    },
    buttonWrapper: {
        'background-color': 'white',
        'padding': '8px',
        'row-spacing': '8px',
        'column-spacing': '8px',
        'width': width,
        'height': Math.floor(height * 3 / 4),
        'border-radius': 0,
        'display': 'grid',
        'grid-template-columns': '1fr 1fr 1fr 1fr',
        'grid-template-rows': '1fr 1fr 1fr 1fr 1fr',
    },
    button: {
        'grid-child': true,
        'justify-self': 'stretch',
        'align-self': 'stretch',
    },
    buttonText: {
        'font-size': 26,
    },
    button1: { 'grid-column-pos': 0, 'grid-row-pos': 0 },
    button2: { 'grid-column-pos': 1, 'grid-row-pos': 0 },
    button3: { 'grid-column-pos': 2, 'grid-row-pos': 0 },
    button4: { 'grid-column-pos': 3, 'grid-row-pos': 0 },

    button5: { 'grid-column-pos': 0, 'grid-row-pos': 1 },
    button6: { 'grid-column-pos': 1, 'grid-row-pos': 1 },
    button7: { 'grid-column-pos': 2, 'grid-row-pos': 1 },
    button8: { 'grid-column-pos': 3, 'grid-row-pos': 1 },

    button9: { 'grid-column-pos': 0, 'grid-row-pos': 2 },
    button10: { 'grid-column-pos': 1, 'grid-row-pos': 2 },
    button11: { 'grid-column-pos': 2, 'grid-row-pos': 2 },
    button12: { 'grid-column-pos': 3, 'grid-row-pos': 2 },

    button13: { 'grid-column-pos': 0, 'grid-row-pos': 3 },
    button14: { 'grid-column-pos': 1, 'grid-row-pos': 3 },
    button15: { 'grid-column-pos': 2, 'grid-row-pos': 3 },
    button16: { 'grid-column-pos': 3, 'grid-row-pos': 3 },

    button17: { 'grid-column-pos': 0, 'grid-row-pos': 4 },
    button18: { 'grid-column-pos': 1, 'grid-row-pos': 4 },
    button19: { 'grid-column-pos': 2, 'grid-row-pos': 4 },
    button20: { 'grid-column-pos': 3, 'grid-row-pos': 4 },
}

Render.render(<App />);
