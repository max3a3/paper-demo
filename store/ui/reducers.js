import ActionTypes from './action_types'
import {TOOLS} from "../../config";

const initialState = {buttons:'left',
    tool:TOOLS[TOOLS.length-1],

    fill:"rgba(223,90,90,1)",
    stroke:"rgba(25,236,163,1)",

    paper:null // paper global for canvas for debugging
} // in /test/Buttons
export default function count(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_BUTTONS:
            return {...state, buttons:action.data}
        case ActionTypes.SET_TOOL:
            return {...state, tool:action.data}
        case ActionTypes.SET_TOOL_COLOR:
            return {...state, [action.data.key]:action.data.color}
        case ActionTypes.SET_PAPER:
            return {...state, paper:action.data}
        default:
            return state
    }
}
