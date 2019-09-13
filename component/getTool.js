import React from 'react';
import {TOOL_TYPE} from "../config";
import {LineTool,CircleTool, RectangleTool} from "@max3a3/react-paperjs-editor";

// import {LineTool,CircleTool, RectangleTool} from "@psychobolt/react-paperjs/packages/react-paperjs-editor/dist";
import invariant from 'invariant'


// import RectangleTool from './RectangleTool'
// import CircleTool from './CircleTool.component'

export function getTool(tool, k, inputEl, strokeColor, fillColor) {
  let ret = null
  switch (tool) {
    case TOOL_TYPE.LINE:
      ret = <LineTool key={k} ref={inputEl} pathProps={{strokeColor}}/>
      break
    case TOOL_TYPE.CIRCLE:
      ret = <CircleTool key={k} ref={inputEl} pathProps={{strokeColor, fillColor}}/>
      break
    case TOOL_TYPE.RECTANGLE:
      ret = <RectangleTool key={k} ref={inputEl} pathProps={{strokeColor, fillColor}}/>
      break
    default:
  }
  invariant(ret, "tool not found")

  return ret
}
