import React, { Component } from 'react';
import 'antd/dist/antd.css'
import store from './store'
import { changeInputAction, addItemAction, deleteItemAction, getListAction } from './store/actionCreators'
import TodoListUI from './TodoListUI'
import axios from 'axios'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        this.changeInputValue = this.changeInputValue.bind(this)
        this.addItem = this.addItem.bind(this)
        this.storeChange = this.storeChange.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        store.subscribe(this.storeChange)
    }
    changeInputValue(e) {
        const action = changeInputAction(e.target.value)
        store.dispatch(action)
        // console.log(e.target.value)
    }
    addItem() {
        const action = addItemAction();
        store.dispatch(action)
    }
    deleteItem(index) {
        const action = deleteItemAction(index)
        store.dispatch(action)
    }
    storeChange() {
        this.setState(store.getState())
    }
    componentDidMount(){
        axios.get('https://www.easy-mock.com/mock/5d26b4189a15e66a218c3287/reactdemo01/test').then(
            (res)=>{
                const action = getListAction(res.data.data.list)
                store.dispatch(action)
            }
        )
    }
    render() {
        return (
            <TodoListUI
                inputValue={this.state.inputValue}
                changeInputValue={this.changeInputValue}
                addItem={this.addItem}
                list={this.state.list}
                deleteItem={this.deleteItem}
            />
        );
    }
}

export default TodoList;