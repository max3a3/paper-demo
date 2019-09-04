import React, {Fragment,useRef} from 'react';
import {Button} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";
import {loadCanvasData, newCanvas} from "../store/canvas/actions";

export function EditorCommands() {
    let textAreaRef = useRef(null)
    let canvas = useSelector(state => state.canvas)
    const dispatch = useDispatch();
    function onSave()  {
        let canvas_json = JSON.stringify(canvas, undefined, 4)
        textAreaRef.current.value = canvas_json
    }
    function onLoad() {
        dispatch(loadCanvasData(JSON.parse(textAreaRef.current.value)))
    }
    function onNew() {
        dispatch(newCanvas())

    }
    return (
        <Fragment>
            layer1<br/>
            <Button onClick={onNew}>new</Button>
            <Button onClick={onSave}>save</Button>
            <Button onClick={onLoad}>load</Button>
            <textarea className="save_area" ref={textAreaRef}></textarea>
        </Fragment>
    )

}
