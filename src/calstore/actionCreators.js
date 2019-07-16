import { CHANGE_INPUT,CLEAR_INPUT,RUN_INPUT} from './actionTypes'

export const inputAction = (equation) => ({
    type: CHANGE_INPUT,
    equation
})

export const claerAction = ()=>({
    type: CLEAR_INPUT,
})

export const runAction = (result)=>({
    type: RUN_INPUT,
    result
})