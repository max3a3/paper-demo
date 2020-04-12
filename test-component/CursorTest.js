import {Button} from "reactstrap";
import React, {Fragment, useRef, useEffect} from 'react';

export function CursorTest() {
  return (
      <div>
        change cursor<br/>
        <Button onClick={() => document.body.style.cursor = "default"}>
          default</Button>
        <Button onClick={() => document.body.style.cursor = "move"}>
          move</Button>
        <Button onClick={() => document.body.style.cursor = "n-resize"}>
          n-resize</Button>
        <Button onClick={() => document.body.style.cursor = "ne-resize"}>
          ne-resize</Button>

      </div>
  )


}
