import React, {Fragment, useRef, useEffect} from 'react';
import {Button} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";
import {loadCanvasData, newCanvas} from "../store/canvas/actions";
import initial_data from "../data/initial_data.json"
import config from '../data/config.json'
import {CursorTest} from '../test-component/CursorTest'
export function EditorCommands() {
  let textAreaRef = useRef(null)
  let canvas = useSelector(state => state.canvas)
  let paper = useSelector(state => state.ui.paper)
  const dispatch = useDispatch();
  useEffect(() => {
    if (config.load_initial_data) {

      textAreaRef.current.value = JSON.stringify(initial_data, undefined, 4)
      dispatch(loadCanvasData(initial_data))
    }
  }, [])


  function onSave() {
    let canvas_json = JSON.stringify(canvas, undefined, 4)
    textAreaRef.current.value = canvas_json
  }

  function onDumpPaper() {
    let value = paper.project.exportJSON({asString: false})
    textAreaRef.current.value = JSON.stringify(value, undefined, 2)
  }

  function onLoad() {
    dispatch(loadCanvasData(JSON.parse(textAreaRef.current.value)))
  }

  function onNew() {
    dispatch(newCanvas())
  }

  return (
      <Fragment>
        <Button onClick={onNew}>new</Button>
        <Button onClick={onSave}>save</Button>
        <Button onClick={onLoad}>load</Button>
        <Button onClick={onDumpPaper}>paper.js dump</Button>
        <textarea className="save_area" ref={textAreaRef}></textarea>
        <CursorTest/>

      </Fragment>
  )

}
