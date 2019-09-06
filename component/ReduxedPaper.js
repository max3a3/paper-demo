import React from 'react';
import {useSelector, ReactReduxContext} from "react-redux";
import {PaperTools} from "./PaperTools";
import {CanvasLayers} from "./CanvasLayers";
import {getCanvas} from "../store/canvas/selectors";
import {PaperContainer} from '@psychobolt/react-paperjs';


export function ReduxedPaper() {

  // need this dummy unused prop so the tree get rerendered
  let ui = useSelector(state => state.ui) // for tool colors
  let {currentTool} = ui
  let layers = useSelector(state => getCanvas(state).layers)
  return (
      <ReactReduxContext.Consumer>
        {({store}) =>
            <PaperContainer canvasProps={{className: 'tool_canvas'}}>
              <PaperTools store={store} ui={ui}/>
              <CanvasLayers store={store} layers={layers}/>
            </PaperContainer>
        }
      </ReactReduxContext.Consumer>
  )

}

