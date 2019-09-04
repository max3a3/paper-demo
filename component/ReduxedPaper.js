import React from 'react';
import {useSelector, ReactReduxContext} from "react-redux";
import {PaperTools} from "./PaperTools";
import {CanvasLayers} from "./CanvasLayers";
import {getCanvas} from "../store/canvas/selectors";
import {PaperContainer} from '@psychobolt/react-paperjs';


export function ReduxedPaper() {

  // need this dummy unused prop so the tree get rerendered
  let currentTool = useSelector(state => state.ui.tool)
  let layers = useSelector(state => getCanvas(state).layers)
  return (
      <ReactReduxContext.Consumer>
        {({store}) =>
            <PaperContainer canvasProps={{className: 'tool_canvas'}}>
              <PaperTools store={store} currentTool={currentTool}/>
              <CanvasLayers store={store} layers={layers}/>
            </PaperContainer>
        }
      </ReactReduxContext.Consumer>
  )

}

