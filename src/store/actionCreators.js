import { CHANGE_INPUT, DELETE_ITEM, ADD_ITEM, GET_LIST } from './actionTypes'
import axios from 'axios'

export const changeInputAction = (value) => ({
    type: CHANGE_INPUT,
    value
})

export const addItemAction = () => ({
    type: ADD_ITEM
})

export const deleteItemAction = (index) => ({
    type: DELETE_ITEM,
    index
})

export const getListAction = (data) => ({
    type: GET_LIST,
    data
})

export const getTodoList = () => {
    return () => {
        axios.get('http://localhost:8888/aaa').then(
                (res)=>{
                    console.log(res);
                    
                }
            )

        // axios.get('https://www.easy-mock.com/mock/5d26b4189a15e66a218c3287/reactdemo01/test').then(
        //     (res)=>{
        //         const data = res.data.data.list
        //         const action = getListAction(data)
        //         dispath(action)
        //     }
        // )
    }
}