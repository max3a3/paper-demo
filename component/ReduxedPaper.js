import React, {findDOMNode, useRef} from 'react';
import {useSelector, ReactReduxContext} from "react-redux";
import {PaperTools} from "./PaperTools";
import {CanvasLayers} from "./CanvasLayers";
import {getCanvas} from "../store/canvas/selectors";
import {PaperContainer} from '@psychobolt/react-paperjs';
import {useDrop} from "react-dnd";


export function ReduxedPaper() {

  let accept = ['DND_CIRCLE']
  let dropHandler = (item, monitor) => {  // handler
    debugger

    // create default object at origin and transform it to x, y

  }
  let canDropHandler = (item, monitor) => {
    const offset = monitor.getClientOffset()
    let canvasOffset = {
      x: containerRef.current.canvas.current.offsetLeft,
      y: containerRef.current.canvas.current.offsetTop
    }
    offset.x -= canvasOffset.x
    offset.y -= canvasOffset.y
    console.log("offset", offset.x, offset.y)
    if (offset.x > 50 || offset.x < 10) return true // demo of cursor change in  the small range
    return false
  }
  const [collectedProps, dropRef] = useDrop({
    accept,
    drop: dropHandler,
    canDrop: canDropHandler,
  })

  // need this dummy unused prop so the tree get rerendered
  let ui = useSelector(state => state.ui)
  // need paths as dummy variable to get rerender
  let {layers, paths} = useSelector(state => getCanvas(state))
  let containerRef = useRef(null)

  //pass the canvas dom to the ref function, called by papercontainer
  let paperMount = (paper) => dropRef(paper.project.view.element)


  // usage of ReactReduxContext.Consumer for react paper as it can not use hook
  //   component under PaperContainer are not dom component, so need to get the store manually
  //    and pass it to them

  // there is another way to get the store using   useContext  var reduxContext = useContext(ReactReduxContext);  const globalStore = () => reduxContext.store.getState()
  return (
      <ReactReduxContext.Consumer>
        {({store}) =>
            <PaperContainer onMount={paperMount} ref={containerRef} canvasProps={{className: 'tool_canvas'}}>
              <PaperTools store={store} ui={ui}/>
              <CanvasLayers store={store} layers={layers} paths={paths}/>
            </PaperContainer>
        }
      </ReactReduxContext.Consumer>
  )

}

