// @flow
import React from 'react';
import * as ReactPaperJS from '@psychobolt/react-paperjs';
import PathTool from "./PathTool.component";


const {Tool, PaperScope} = ReactPaperJS;
const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
// @PaperScope   inject this.props.paper
class SelectToolComponent extends React.Component {

  static defaultProps = {
    ...PathTool.defaultProps,

    pathProps: {
      fillColor: 'white',
      strokeColor: 'black',
    },
  }

  constructor(props) {
    super(props)
  }

  //instance variable
  mouseDown
  path
  selectionColor = null
  // static member so this is bound properly
  onMouseDown = (toolEvent) => {
    const {pathProps, onMouseDown, onPathInit, paper} = this.props;
    //toolEvent from paperjs
    if (toolEvent.event.type === 'touchstart' || toolEvent.event.button === MOUSE_LEFT_CODE) {
      this.mouseDown = toolEvent.point
    }
  }

  // static member so this is bound properly
  onMouseDrag = (toolEvent) => {

    //toolEvent from paperjs
    if (toolEvent.event.type === 'touchmove' || toolEvent.event.buttons === 1) {
      const {paper} = this.props;
      if (!this.selectionColor)
        this.selectionColor = new paper.Color(0.9, 0.9, 1, 0.75)

      let rect = new paper.Rectangle(this.mouseDown, toolEvent.point);
      // debugger //chck for shift
      if (toolEvent.modifiers.shift) { //todo still buggy need to look at the custom object creation
        if (rect.width > rect.height)
          rect.height = rect.width;
        else
          rect.width = rect.height;
      }

      this.path = new paper.Path.Rectangle(rect);
      this.path.fillColor = this.selectionColor

      // Remove this path on the next drag event:
      this.path.removeOnDrag();
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


  render() {
    const { innerRef, ...rest } = this.props;
    return (
      <Tool
        {...rest}
        ref={innerRef}
        onMouseDown={this.onMouseDown}
        onTouchMove={this.onMouseDrag}
        onMouseDrag={this.onMouseDrag}
        onMouseUp={this.onMouseUp}
      />
    );
  }
}

// default react scripts don't support @PaperScope decorator
let SelectTool = PaperScope(SelectToolComponent)
export default React.forwardRef((props, ref) => <SelectTool innerRef={ref} {...props} />);
