import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { inputAction, claerAction, runAction } from './calstore/actionCreators'
import store from './calstore'
import 'antd/dist/antd.css'
import './Calculator.css'

const KEY = [
    { 'value': '7' },
    { 'value': '8' },
    { 'value': '9' },
    { 'value': '+' },
    { 'value': '4' },
    { 'value': '5' },
    { 'value': '6' },
    { 'value': '-' },
    { 'value': '1' },
    { 'value': '2' },
    { 'value': '3' },
    { 'value': '*' },
    { 'value': '.' },
    { 'value': '0' },
    { 'value': '=' },
    { 'value': '/' },
    { 'value': 'C' }
]
class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }
    storeChange() {
        this.setState(store.getState())
    }
    input(count) {
        var action = null;
        switch (count) {
            case "C": action = claerAction(); break;
            case "=": {
                let result = this.suffixResult(this.suffix(this.stringToArray(this.state.equation)))
                action = runAction(result);
                break;
            }
            default:
                action = inputAction(count)
                break;
        }
        store.dispatch(action)
        this.storeChange()
    }
    //字符串转数组
    stringToArray(str) {
        let data = str.split('')
        var flag = ""
        let result = [];
        data.forEach((data, index) => {
            if (data !== "+" && data !== "-" && data !== "*" && data !== "/") {
                flag = flag + data;
            } else {
                result.push(parseFloat(flag))
                result.push(data)
                flag = ""
            }

        })
        result.push(parseFloat(flag))
        return result
    }
    //  中缀表达式转后缀表达式
    suffix(data) {
        let str = ""
        let operator = []
        data.forEach((a, index) => {
            if (Number(a)) {
                str = str + a + " ";
            } else {
                if (operator.length === 0) {
                    operator.push(a)
                } else {
                    var tmp = operator.pop()
                    if (this.operatorCompare(a, tmp)) {
                        str = str + tmp + " ";
                        operator.push(a)
                    } else {
                        operator.push(tmp)
                        operator.push(a)
                    }
                }
            }
        })
        while (operator.length !== 0) {
            str = str + operator.pop() + " ";
        }
        console.log(str, operator);
        return str;
    }
    //1*2+3-4=1       1 2 * 3 4 - +
    //后缀表达式运算
    suffixResult(str) {
        let data = str.split(' ');
        let result = []
        data.forEach((data) => {
            if (!isNaN(parseFloat(data))) {
                result.push(parseFloat(data))
            } else {
                switch (data) {
                    case "+":
                        result.push(parseFloat(result.pop()) + parseFloat(result.pop()))
                        break;
                    case "-":
                        let a = parseFloat(result.pop()); let b = parseFloat(result.pop())
                        result.push(b - a);
                        break;
                    case "*":
                        result.push(parseFloat(result.pop()) * parseFloat(result.pop()))
                        break;
                    case "/":
                        let aa = parseFloat(result.pop()); let bb = parseFloat(result.pop())
                        result.push(bb / aa);
                        break;
                    default:
                        break;
                }
            }
        })
        return result.pop()
    }
    //运算符比较优先级
    operatorCompare(a, b) {
        var add = "+", minu = "-", multiply = "*", divide = "/"
        var flaga;
        var flagb;
        switch (a) {
            case add: flaga = 1; break;
            case minu: flaga = 1; break;
            case multiply: flaga = 2; break;
            case divide: flaga = 2; break;
            default:
                break;
        }
        switch (b) {
            case add: flagb = 1; break;
            case minu: flagb = 1; break;
            case multiply: flagb = 2; break;
            case divide: flagb = 2; break;
            default:
                break;
        }
        return flaga < flagb
    }
    render() {
        var buttonList = [];
        KEY.forEach((value, index) => {
            if ((index + 1) % 4 === 0) {
                buttonList.push(
                    <span key={index}><Button className="button" onClick={this.input.bind(this, value.value)}>{value.value}</Button><br /></span>
                )
            } else {
                buttonList.push(
                    <span key={index}><Button className="button" onClick={this.input.bind(this, value.value)}>{value.value}</Button></span>
                )
            }
        })

        return (
            <div className="calculator">
                <Input
                    className="input"
                    placeholder={this.state.inputValue}
                    value={this.state.equation}
                />
                <br />
                {buttonList}
            </div>
        );
    }
}

export default Calculator;