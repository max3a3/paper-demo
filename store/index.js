import { combineReducers } from 'redux'
import ui from './ui'
import canvas from './canvas'

export default combineReducers({
  ui,
  canvas
})
