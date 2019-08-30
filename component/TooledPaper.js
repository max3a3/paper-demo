import React, {useEffect, useRef} from 'react';

import {LineTool} from '@psychobolt/react-paperjs-editor'
import RectangleTool from './RectangleTool'
import CircleTool from './CircleTool.component'
import {TOOL_TYPE} from '../config'
import invariant from 'invariant'
import {PaperContainer} from '@psychobolt/react-paperjs';

function getTool(tool, k, inputEl) {
  let ret = null
  switch (tool) {
    case TOOL_TYPE.LINE:
      ret = <LineTool key={k} ref={inputEl}/>
      break
    case TOOL_TYPE.CIRCLE:
      ret = <CircleTool key={k} ref={inputEl}/>
      break
    case TOOL_TYPE.RECTANGLE:
      ret = <RectangleTool key={k} ref={inputEl}/>
      break
    default:
  }
  invariant(ret, "tool not found")

  return ret
}


// see https://www.codebeast.dev/react-memoize-hooks-useRef-useCallback-useMemo/

export function TooledPaper({tools, current}) {
  let refs = {}


  let tool_components = tools.map(function useCallGt(tool, i) {
    //  let ref = useRef(null)
    refs[tool] = useRef(null)
    return getTool(tool, i, refs[tool])
  })

  useEffect(() => {
    refs[current].current.activate()
  })

  return (
      <PaperContainer canvasProps={{className: 'tool_canvas'}}>
        {tool_components}
      </PaperContainer>
  )

}

