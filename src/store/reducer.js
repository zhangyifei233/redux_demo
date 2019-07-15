import { CHANGE_INPUT, DELETE_ITEM, ADD_ITEM, GET_LIST } from './actionTypes'

const defaultState = {
    inputValue: 'Write Something',
    list: [
        
    ]
}
export default (state = defaultState, action) => {
    console.log(state, action)
    if (action.type === CHANGE_INPUT) {
        //es6 深复制方法
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    } else if (action.type === ADD_ITEM) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue)
        newState.inputValue = ""
        return newState
    } else if (action.type === DELETE_ITEM) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index, 1)
        return newState
    } else if (action.type === GET_LIST) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.list = action.data
        return newState
    }
    return state
};
