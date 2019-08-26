import ActionTypes from './action_types'

const initialState = {buttons:'left'} // in /test/Buttons
export default function count(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_BUTTONS:
            return {...state, buttons:action.data}
        default:
            return state
    }
}
