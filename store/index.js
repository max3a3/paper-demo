import { combineReducers } from 'redux'
import ui from './ui'
import canvas from './canvas'
import swatch from './swatch'

export default combineReducers({
  ui,
  canvas,
  swatch
})
