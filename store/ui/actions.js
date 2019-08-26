import ActionTypes from './action_types'

export function setButtons(data) {
    return {
        type: ActionTypes.SET_BUTTONS,
        data
    }
}

