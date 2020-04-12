import paper from 'paper'
import React, { useRef, useEffect } from 'react'

function lines() {
  paper.project.clear()

  function drawLine(start_pt, stle) {
    //Point data structure has methods for other operation, so it is good
    //  to use instead of rewriting in react
    //  how to store this in redux?

    let start = new paper.Point(start_pt);
    // Move to start and draw a line from there
    let path = new paper.Path();
    path.moveTo(start);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add([200, 30]));
    path.style = style

  }

  let style = {
    fillColor: new paper.Color(1, 0, 0),
    // strokeColor: 'black',
    strokeColor: new paper.Color(0, 0.9, 0.5),
    strokeWidth: 2
  };
  drawLine([10, 5], style)
  drawLine([70, 5], style)
}
function rectangle() {
  paper.project.clear()
  let [x, y, width, height] = [30, 10, 80, 30]
  let rectPath = new paper.Path.Rectangle(x, y, width, height)
  rectPath.strokeColor = new paper.Color(0, 0.5, 0.9)
  rectPath.fillColor = new paper.Color(0, 0.5, 0.9)
  console.log('pathdata', rectPath.pathData)
  debugger
  rectPath.bounds = new paper.Rectangle(30, 10, 40, 20)
  console.log('pathdata after transform', rectPath.pathData)

  rectPath.applyMatrix=false
  rectPath.bounds = new paper.Rectangle(30,10,360,220)
  console.log('pathdata with false applymatrix transform',rectPath.pathData)

}
export function DirectPaper() {
  let canvas_ref = useRef(null)
  let textAreaRef = useRef(null)
  useEffect(() => {

    paper.setup(canvas_ref.current);
    getdrawing()

  },[])
  function onSave() {
    let value = paper.project.exportJSON({ asString: false })
    textAreaRef.current.value = JSON.stringify(value, undefined, 2)
  }
  function onLoad() {
    let json_str = textAreaRef.current.value
    paper.project.clear()
    paper.project.importJSON(JSON.parse(json_str))
  }
  function onClear() {
    paper.project.clear()
  }
  function onObject1() {
    paper.project.clear()
    let [x, y, width, height] = [30, 10, 80, 30]
    let rect = new paper.Path.Rectangle(x, y, width, height)
    rect.strokeColor = new paper.Color(0, 0.5, 0.9)
    rect.fillColor = new paper.Color(0, 0.5, 0.9)

  }
  return (
    <div className="flex_container">
      <div className="flex_item">
        <button onClick={onClear}>clear</button><br />
        <button onClick={rectangle}>rectangle</button><br />
        <button onClick={lines}>lines</button><br />
        <button onClick={onSave}>save</button><br />
        <button onClick={onLoad}>load</button><br />
        <br />
        <textarea ref={textAreaRef} className="save_area"></textarea>

      </div>

      <canvas className='tool_canvas flex_item' ref={canvas_ref}>
      </canvas>

      )
</div>
  )
}
