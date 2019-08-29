import React, {useEffect, useState, useRef} from 'react';

import {CircleTool,LineTool} from '@psychobolt/react-paperjs-editor'
import {TOOL_TYPE} from '../config'
import {renderWithPaperScope, PaperContainer, Path, Rectangle} from '@psychobolt/react-paperjs';
import invariant from 'invariant'

function useGetTool(tool, k) {
  debugger
    let ret = null
    let inputEl = useRef(null)
    console.log('usegettool',tool)
    switch (tool) {
        case TOOL_TYPE.LINE:
            ret = <LineTool key={k} ref={inputEl}/>
            break
        case TOOL_TYPE.CIRCLE:
            ret = <CircleTool key={k} ref={inputEl}/>
            break
    }
    invariant(ret, "tool not found")
    return [inputEl, ret]
}

function useGetTools() {

}

// see https://www.codebeast.dev/react-memoize-hooks-useRef-useCallback-useMemo/

export function TooledPaper({tools, current}) {
    let refs = {}

    // let refs = tools.reduce((result, item) => {
    //     result[item] = useRef(null);
    //     return result;
    // }, {})

    // let tool_components = tools.map((tool, i) => {
    //     let ref = useRef(null)
    //     return get_tool(tool, i, refs[tool])
    // })
    // useGetTool(0,0,0)
    useEffect(() => {
        refs[current].current.activate()
    })

    return (
        <PaperContainer canvasProps={{className: 'tool_canvas'}}>
            {tools.map(function useCallGt(tool, i) {
                let tool_comp
                [refs[tool], tool_comp] = useGetTool(tool, i, refs[tool])
                return tool_comp
            })}
                            <Rectangle
                    width={90}
                    height={60}
                    position={[50,40]}
                    fillColor="green"/>
        </PaperContainer>
    )

}
