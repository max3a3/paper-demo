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

  // usage of ReactReduxContext.Consumer for react paper as it can not use hook
  //   component under PaperContainer are not dom component, so need to get the store manually
  //    and pass it to them

  // there is another way to get the store using   useContext  var reduxContext = useContext(ReactReduxContext);  const globalStore = () => reduxContext.store.getState()
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

