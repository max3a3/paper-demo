// @flow
import React from 'react';
import * as ReactPaperJS from '@psychobolt/react-paperjs';
import PathTool from "./PathTool.component";
import invariant from "invariant"

const {Tool, PaperScope} = ReactPaperJS;
const MOUSE_LEFT_CODE = 0;


// Updated through zoom  todo not yet
var transformBoxSize = 7//7  /view.zoom;
var transformBoxWidth = 2//2  /view.zoom;
var transformBoxStroke = 1 // 0.5/view.zoom;

// paper class cache for cleaner code


let  Point,Path,Rectangle  // it need the same scope as paper used to be init with default data

// $FlowFixMe
// @PaperScope   inject this.props.paper
class TransformToolComponent extends React.Component {

  static defaultProps = {
    ...PathTool.defaultProps,

    pathProps: {
      fillColor: 'white',
      strokeColor: 'black',
    },
  }

  constructor(props) {
    super(props)
    invariant(props.paper,"need the scope")
    this.paper = props.paper

    Point = props.paper.Point
    Path = props.paper.Path
    Rectangle = props.paper.Rectangle
  }

  //instance variable
  mouseDown
  path
  selectionColor = null
  paper   // scope to get object selected from paper internal data
  lastTransformRect  // the bound of current selection
  transformRect // the path

  transformPoints = {
    topLeft: null,
    topMiddle: null,
    topRight: null,

    leftCenter: null,
    rightCenter: null,

    bottomLeft: null,
    bottomMiddle: null,
    bottomRight: null
  }
  transform = {
    // Scaling
    hover: false,
    scaling: false,
    pivot: null,
    dir: '', // topLeft, topMiddle, ...

    scale_facH: null,
    scale_facW: null,

    // Dragging
    hoverDrag: false,
    dragging: false
  };
  // static member so this is bound properly
  onMouseDown = (toolEvent) => {

    /*

     */

    const {pathProps, onMouseDown, onPathInit, paper} = this.props;
    //toolEvent from paperjs
    if (toolEvent.event.type === 'touchstart' || toolEvent.event.button === MOUSE_LEFT_CODE) {
      this._lastMousePos = toolEvent.point;

      if(this.transform.hoverDrag) {  // this flag is set in mouseMove
        // action.move = new Action('move', {
        //   paths: localSelect,
        //   startPos: toolEvent.point,
        //   endPos: null
        // });

        this.transform.dragging = true;
        return;//-------------------->
      }

    }
  }

  // static member so this is bound properly
  onMouseDrag = (e) => {
    let mouseDelta = e.point.subtract(this._lastMousePos);
    this._lastMousePos = e.point;

    //e from paperjs
    if (e.event.type === 'touchmove' || e.event.buttons === 1) {
      if(this.transform.dragging) {
        // todo transform the item
        // for(var i=0; i<localSelect.length; i++) {
        //   localSelect[i].translate(mouseDelta);
        // }

        this.transformRect.translate(mouseDelta);
        this.lastTransformRect = this.transformRect.bounds;

        // the scale handle  todo change to .entries
        Object.keys(this.transformPoints).forEach((point, index)=> {
          this.transformPoints[point].translate(mouseDelta);
        });
        return;
      }
      if(this.transform.scaling) {
        return this.mouseScale(e)
      }
      // User is scaling the selection
    }
  }

  onMouseUp = (event) => {
    const {path} = this;
    const {onPathAdd} = this.props;
    if (path) {
      path.remove()
      onPathAdd(path);
    }

  }
  drawTransformBox(rect) {
    let lastTransformRect=null
    let transformRect // this is the local cache to keep code simple, will transfer to this.transformRect
    if(rect) {
      lastTransformRect = rect;
      this.lastTransformRect = rect
    }

    if(!lastTransformRect)
      return;

    // Draw rect
    transformRect = Path.Rectangle(lastTransformRect);
    transformRect.strokeColor = 'black';
    transformRect.selectable = false;
    transformRect.strokeWidth = transformBoxStroke

    // Calculate the positions
    var topLeftPt = lastTransformRect.point.subtract(transformBoxSize/2);
    var topMiddlePt = new Point(lastTransformRect.point.x + lastTransformRect.width/2, lastTransformRect.point.y).subtract(transformBoxSize/2);
    var topRightPt = new Point(lastTransformRect.point.x + lastTransformRect.width, lastTransformRect.point.y).subtract(transformBoxSize/2);

    var middleLeftPt = new Point(lastTransformRect.point.x, lastTransformRect.point.y + lastTransformRect.height/2).subtract(transformBoxSize/2);
    var middleRightPt = new Point(lastTransformRect.point.x + lastTransformRect.width, lastTransformRect.point.y + lastTransformRect.height/2).subtract(transformBoxSize/2);

    var bottomLeftPt = new Point(lastTransformRect.point.x, lastTransformRect.point.y + lastTransformRect.height).subtract(transformBoxSize/2);
    var bottomMiddlePt = new Point(lastTransformRect.point.x + lastTransformRect.width/2, lastTransformRect.point.y + lastTransformRect.height).subtract(transformBoxSize/2);
    var bottomRightPt = new Point(lastTransformRect.point.x + lastTransformRect.width, lastTransformRect.point.y + lastTransformRect.height).subtract(transformBoxSize/2);

    // Calculate the boxes
    var topLeftRect = new Rectangle(topLeftPt, transformBoxSize);
    var topMiddleRect = new Rectangle(topMiddlePt, transformBoxSize);
    var topRightRect = new Rectangle(topRightPt, transformBoxSize);

    var middleLeftRect = new Rectangle(middleLeftPt, transformBoxSize);
    var middleRightRect = new Rectangle(middleRightPt, transformBoxSize);

    var bottomLeftRect = new Rectangle(bottomLeftPt, transformBoxSize);
    var bottomMiddleRect = new Rectangle(bottomMiddlePt, transformBoxSize);
    var bottomRightRect = new Rectangle(bottomRightPt, transformBoxSize);

    // Assign the boxes
    this.transformPoints.topLeft = Path.Rectangle(topLeftRect);
    this.transformPoints.topMiddle = Path.Rectangle(topMiddleRect);
    this.transformPoints.topRight = Path.Rectangle(topRightRect);

    this.transformPoints.leftCenter = Path.Rectangle(middleLeftRect);
    this.transformPoints.rightCenter = Path.Rectangle(middleRightRect);

    this.transformPoints.bottomLeft = Path.Rectangle(bottomLeftRect);
    this.transformPoints.bottomMiddle = Path.Rectangle(bottomMiddleRect);
    this.transformPoints.bottomRight = Path.Rectangle(bottomRightRect);

    // Set type
    Object.keys(this.transformPoints).forEach((point, index)=> {
      if(this.transformPoints[point]) {
        this.transformPoints[point].type = 'transformPoint';   // additional field todo?
      }
    });
/*
    // Set cursor type
    transformPoints.topLeft.cursorType = "nw-resize";
    transformPoints.bottomRight.cursorType = "nw-resize";

    transformPoints.topMiddle.cursorType = "n-resize";
    transformPoints.bottomMiddle.cursorType = "n-resize";

    transformPoints.topRight.cursorType = "ne-resize";
    transformPoints.bottomLeft.cursorType = "ne-resize";

    transformPoints.leftCenter.cursorType = "e-resize";
    transformPoints.rightCenter.cursorType = "e-resize";

    // Set names
    transformPoints.topLeft.name = "topLeft";
    transformPoints.topRight.name = "topRight";
    transformPoints.topMiddle.name = "topCenter";

    transformPoints.leftCenter.name = "leftCenter";
    transformPoints.rightCenter.name = "rightCenter";

    transformPoints.bottomLeft.name = "bottomLeft";
    transformPoints.bottomMiddle.name = "bottomCenter";
    transformPoints.bottomRight.name = "bottomRight";
 */

    // Set the box colors
    Object.keys(this.transformPoints).forEach((point, index) =>{
      if(this.transformPoints[point]) {
        this.transformPoints[point].selectable = false;
        this.transformPoints[point].strokeColor = 'blue';
        this.transformPoints[point].fillColor = 'white';
        this.transformPoints[point].strokeWidth = transformBoxWidth;
      }
    });

    this.transformRect = transformRect
  }
/* not yet
  mouseScale = () => {
    // User is scaling the selection
      var bounds = this.transformRect.bounds;
      let relH,relW
      if(!lockScaleY) {
        relH = e.point.subtract(point).y;
        transform.scale_facH = Math.abs(relH)/bounds.height;
      }
      else {
        transform.scale_facH = 1;
      }
      if(!lockScaleX) {
        relW = e.point.subtract(point).x;
        transform.scale_facW = Math.abs(relW)/bounds.width;
      }
      else {
        transform.scale_facW = 1;
      }

      if(Math.abs(transform.scale_facH) < 0.1 && !lockScaleY) {
        return;
      }

      if(Math.abs(transform.scale_facW) < 0.1 && !lockScaleX) {
        return;
      }

      if(!e.modifiers.shift) {
        checkScaleFlip();
      }

      if(e.modifiers.shift) {
        var min = Math.min(Math.abs(transform.scale_facH), Math.abs(transform.scale_facW));

        if(lockScaleY) {
          min = Math.abs(transform.scale_facW);
        }
        else if(lockScaleX) {
          min = Math.abs(transform.scale_facH);
        }

        transform.scale_facH = min;
        transform.scale_facW = min;
      }

      if(e.modifiers.control) {
        if(!lockScaleX) {
          transform.scale_facW *= 2;
        }
        if(!lockScaleY) {
          transform.scale_facH *= 2;
        }
      }

      // Scale all the selected items
      for(var i=0; i<localSelect.length; i++) {
        localSelect[i].scale(transform.scale_facW, transform.scale_facH, point)
      }

      transformRect.scale(transform.scale_facW, transform.scale_facH, point);

      // Don't show the points while scaling
      Object.keys(transformPoints).forEach((point, index) => {
        transformPoints[point].remove();
      });
  }

 */
  onActivate = ()=>{
    if (!this.paper.project) return // react-paper call this when being rendered


    // need the items here, check paper internal?
    // debugger

    // todo hack it for now
    let boundRect = new Rectangle(10,30,70,50)
    this.drawTransformBox(boundRect)
  }
  onDeactivate= () => {
    if(this.transformRect) {
      this.transformRect.remove()
      Object.entries(this.transformPoints).map(([k,p])=>p.remove())
    }
    this.transformRect = null
  }
  onMouseMove= (e) => {
    document.body.style.cursor = "default";
    this.transform.hover = false;

    /* remove mouse hover highlight */
    // if (this.hoverItem) {
    //   this.hoverItem = null;
    //   this.hoverSelection.remove();
    // }



    /* check if mouse in scale corner */
    if (e.item) {
      let hoverItem = e.item;
      // draw selection over, this is not in transformtool but in select tool
      // if(hoverItem.selectable && !hoverItem.selected) {
      //   hoverSelection = hoverItem.clone();
      //   hoverSelection.strokeColor = '#33b5ff';
      //   hoverSelection.strokeWidth = 2 / paper.view.zoom;
      //
      //   hoverSelection.selectable = false;
      // }
      // else {
      console.log("hover item type", e.item.type) // shoudl use data instead of type
      if(hoverItem.type == 'transformPoint') {
        document.body.style.cursor = hoverItem.cursorType;

        this.transform.hover = true;
        this.transform.pivot = hoverItem.opposite;

      return //------------>
      }

    }

    /* check if mouse in the selection rectangle */

    // if(self.SELECTED.length != 0)
    {
      if(e.point.isInside(this.lastTransformRect) && !this.transform.hover && !this.transform.scaling) {
        document.body.style.cursor = "move";
        this.transform.hoverDrag = true;
      }
    }



  }

  render() {
    const {innerRef, ...rest} = this.props;
    return (
        <Tool
            {...rest}
            ref={innerRef}
            onMouseDown={this.onMouseDown}
            onMouseDrag={this.onMouseDrag}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            onActivate={this.onActivate}
            onDeactivate={this.onDeactivate}
        />
    );
  }
}

// default react scripts don't support @PaperScope decorator
let TransformTool = PaperScope(TransformToolComponent)
export default React.forwardRef((props, ref) => <TransformTool innerRef={ref} {...props} />);
