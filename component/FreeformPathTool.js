// @flow
import * as React from 'react';
import * as ReactPaperJS from '@psychobolt/react-paperjs';
import PathTool from "./PathTool.component";


const { Tool, PaperScope } = ReactPaperJS;
const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
// @PaperScope   inject this.props.paper
class FreeformPathToolComponent extends PathTool {

  static defaultProps = {
    ...PathTool.defaultProps,

    pathProps: {
      strokeColor: 'black',
    },
  }

  onMouseDown = (toolEvent) => {
    const { pathProps, onMouseDown, onPathInit, paper } = this.props;
    if (toolEvent.event.type==='touchstart' || toolEvent.event.button === MOUSE_LEFT_CODE) {
      const path = new paper.Path(pathProps);
      this.path = path;
      onPathInit(path);
    }
    onMouseDown(toolEvent);
  }

  onMouseDrag = (toolEvent) => {
    const { onMouseDrag } = this.props;
    if (toolEvent.event.type==='touchmove'  || toolEvent.event.buttons === 1) {
      this.path.add(toolEvent.point);
    }
    onMouseDrag(toolEvent);

  }

  onMouseUp = (event) => {
    const { path } = this;
    const { pathProps, onMouseUp, onPathAdd } = this.props;
    if (path) {
      onPathAdd(path,pathProps);
      this.path = null;
      this.start = null;
    }
    onMouseUp(event);
  }

  start;

  render() {
    const {
      pathProps, onMouseDown, onMouseDrag, onMouseUp, innerRef, ...rest
    } = this.props;
    return (
      <Tool
        ref={innerRef}
        minDistance={10}
        onMouseDown={this.onMouseDown}
        onMouseDrag={this.onMouseDrag}
        onMouseUp={this.onMouseUp}
        {...rest}
      />
    );

  }
}

// default react scripts don't support @PaperScope decorator
let FreeformTool = PaperScope(FreeformPathToolComponent)
export default React.forwardRef((props, ref) => <FreeformTool innerRef={ref} {...props} />);
