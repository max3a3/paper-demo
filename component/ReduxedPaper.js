import React from 'react';
import {useSelector, ReactReduxContext} from "react-redux";
import {PaperTools} from "./PaperTools";
import {CanvasLayers} from "./CanvasLayers";
import {getCanvas} from "../store/canvas/selectors";
import {PaperContainer} from '@psychobolt/react-paperjs';


export function ReduxedPaper() {

  // need this dummy unused prop so the tree get rerendered
  let ui = useSelector(state => state.ui)
  // need paths as dummy variable to get rerender
  let {layers,paths} = useSelector(state => getCanvas(state))

  return (
      <ReactReduxContext.Consumer>
        {({store}) =>
            <PaperContainer canvasProps={{className: 'tool_canvas'}}>
              <PaperTools store={store} ui={ui}/>
              <CanvasLayers store={store} layers={layers} paths={paths}/>
            </PaperContainer>
        }
      </ReactReduxContext.Consumer>
  )

}

