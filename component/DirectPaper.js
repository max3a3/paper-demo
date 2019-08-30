import paper from 'paper'
import React ,{useRef,useEffect} from 'react'

function getdrawing() {

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
            strokeColor: 'black',
            strokeWidth: 2
        };
        drawLine([10, 5], style)
        drawLine([70, 5], style)
}
export function DirectPaper() {
  let canvas_ref =useRef(null)
    useEffect(() => {

        paper.setup(canvas_ref.current);
        getdrawing()

    })
  return(   <canvas className='tool_canvas' ref={canvas_ref}>
            </canvas>)
}
         