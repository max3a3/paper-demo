import React, {useEffect, useRef} from 'react';

import {PaperContainer} from '@psychobolt/react-paperjs';
import {getTool} from "./getTool";



// see https://www.codebeast.dev/react-memoize-hooks-useRef-useCallback-useMemo/

export function TooledPaper({tools, current, stroke, fill}) {
  let refs = {}

  // need to name the anonymous function useXxx for es-lint-hook
  let tool_components = tools.map(function useCallGt(tool, i) {
    refs[tool] = useRef(null)
    return getTool(tool, i, refs[tool], stroke, fill)
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

