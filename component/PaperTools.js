import {TOOL_TYPE, TOOLS} from "../config";
//import {CircleTool, LineTool, RectangleTool} from "@psychobolt/react-paperjs-editor";
import {LineTool, RectangleTool} from "@max3a3/react-paperjs-editor";
// this is for local execution by downloading from github after doing a *build* and *commit*
// import {CircleTool,LineTool,RectangleTool} from "@psychobolt/react-paperjs/packages/react-paperjs-editor";

import React, {Fragment, useRef,useEffect} from "react";
import {addPath, deselectAll, selectPaths} from "../store/canvas/actions";
import {getCanvas} from "../store/canvas/selectors";
import SelectTool from "./SelectTool";
import CircleTool from "./CircleTool.component"
import PolygonTool from "./PolygonTool.component"
import TransformTool from "./TransformTool";
import {renderWithPaperScope} from "@psychobolt/react-paperjs";
import {setPaper} from "../store/ui/actions";

let getProperty = {} //todo add all tools entry as returning empty object, some tool like pen won't need this

getProperty.LINE = (path) => { // path is paper data, todo use swithc based on object_type param
  const {point: from} = path.firstSegment;
  const {point: to} = path.lastSegment;
  return {
    from: {x: from.x, y: from.y},
    to: {x: to.x, y: to.y},
  };
}
getProperty.CIRCLE = (path) => {
  const {x, y} = path.position;
  return {
    position: {x, y},
    radius: path.bounds.width / 2,
  };
}
getProperty.RECTANGLE = (path) => {
  const {x, y} = path.position;
  const {width, height} = path.bounds;
  return {
    position: {x, y},
    width,
    height,
  };
}
getProperty.POLYGON = (path) => {
  const {x, y} = path.position;
  const {width, height} = path.bounds;
  return {
    position: {x, y},
    points: path.segments.map(segment => ({ x: segment.point.x, y: segment.point.y })),
  };
}

const onPathAdd = (object_type, activeLayer, dispatch) => (paperPath, pathProps) => {


  const pathParam = {
    type: object_type,
    pathData: paperPath.pathData,
    strokeColor: pathProps.strokeColor,
    fillColor: pathProps.fillColor,
    layer: activeLayer,
    properties: getProperty[object_type](paperPath),  // this is optional for paper-js, only if you want property tab to edit the object
  }
  paperPath.remove()
  // assert(this.props.newPath) //todo add as the props param
  dispatch(addPath(pathParam)) // todo: this prop is passed from upstream not yet

}
const onSelect = (selectedPathIds, activeLayer, dispatch) => {
  function doDeselectAll() {
    dispatch(deselectAll())
  }
  return (paperPath, pathProps) => {
    const {project, bounds} = paperPath;  // get paper properties
    const {layers} = project;  // paperjs.layers array

    const items = layers.filter(x => x.data.layerId === activeLayer).reduce((collection, layer) => collection
        .concat(layer.getItems({overlapping: bounds})), [])
        .map(item => item.data.pathId);

    console.log("select tool number selected:", items.length)
    if (items.length) {
      doDeselectAll(true);
      dispatch(selectPaths(items));
    } else if (selectedPathIds.length) doDeselectAll(); // unselect last selection
  }
}



export function PaperTools({store}) {
  // require the redux store to be passed as this is non dom react, different tree

  let refs = {}
  const {tool: current, stroke: strokeColor, fill: fillColor,paper:storePaper} = store.getState().ui
  let dispatch = store.dispatch
  let {activeLayer,selectedPathIds} = getCanvas(store.getState())
  let tool_components = TOOLS.map(function useCallGt(tool) {
    let inputEl = useRef(null)
    refs[tool] = inputEl
    switch (tool) {
      case TOOL_TYPE.LINE: // can curry the param?
        return <LineTool key={tool} ref={inputEl} pathProps={{strokeColor}}
                         onPathAdd={onPathAdd(tool, activeLayer, dispatch)}/>
      case TOOL_TYPE.CIRCLE:
        return <CircleTool key={tool} ref={inputEl} pathProps={{strokeColor, fillColor}}
                           onPathAdd={onPathAdd(tool, activeLayer, dispatch)}/>
      case TOOL_TYPE.POLYGON:
        return <PolygonTool key={tool} ref={inputEl} pathProps={{strokeColor, fillColor,selected:true}}
                           onPathAdd={onPathAdd(tool, activeLayer, dispatch)}/>
      case TOOL_TYPE.RECTANGLE:
        return <RectangleTool key={tool} ref={inputEl} pathProps={{strokeColor, fillColor}}
                              onPathAdd={onPathAdd(tool, activeLayer, dispatch)}/>
      case TOOL_TYPE.SELECT:
        return <SelectTool key={tool} ref={inputEl}
                           onPathAdd={onSelect(selectedPathIds,activeLayer,dispatch)}/>
      case TOOL_TYPE.TRANSFORM:
        return <TransformTool key={tool} ref={inputEl}
                           onPathAdd={onSelect(selectedPathIds,activeLayer,dispatch)}/>
      default:
        debugger
    }
    return null
  })
  // todo  BUG there is a bug that paper only activate the last Tool
  //    and we can't activate here as we don't have the refs? before it is submitted?
  if (refs[current].current)
    refs[current].current.activate()


  // only called once, we install a component as that is the only way scope get passed
  if (!storePaper) {
    // register paper global to use for debugging
    const RegisterPaperComp=()=> {
      return renderWithPaperScope((paper) => {
        dispatch(setPaper(paper))
        return null
      })
    }
    tool_components.push(<RegisterPaperComp key={"RegisterPaperComp"}/>)
  }
  return (
      <Fragment>
        {tool_components}
      </Fragment>
  )

}
