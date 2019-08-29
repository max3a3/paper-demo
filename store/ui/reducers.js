import ActionTypes from './action_types'
import {TOOLS} from "../../config";

const initialState = {buttons:'left',tool:TOOLS[0]} // in /test/Buttons
export default function count(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_BUTTONS:
            return {...state, buttons:action.data}
        case ActionTypes.SET_TOOL:
            return {...state, tool:action.data}
        default:
            return state
    }
}
