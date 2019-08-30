import ActionTypes from './action_types'

export function setButtons(data) {
  return {
    type: ActionTypes.SET_BUTTONS,
    data
  }
}

export function setTool(data) {
  return {
    type: ActionTypes.SET_TOOL,
    data
  }
}

export function setToolColor(key, color) {
  return {
    type: ActionTypes.SET_TOOL_COLOR,
    data: {key, color}
  }
}
