import ActionTypes from './action_types'
import {TOOLS} from "../../config";

const initialState = {buttons:'left',
    tool:TOOLS[0],

    fill:"rgba(223,90,90,1)",
    stroke:"rgba(25,236,163,1)"

} // in /test/Buttons
export default function count(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_BUTTONS:
            return {...state, buttons:action.data}
        case ActionTypes.SET_TOOL:
            return {...state, tool:action.data}
        case ActionTypes.SET_TOOL_COLOR:
            return {...state, [action.data.key]:action.data.color}
        default:
            return state
    }
}
