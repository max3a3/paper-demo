// @flow
import React from 'react'
// import PathTool from '../shared/PathTool';
const no_op = () => {
}

export default class PathTool extends React.Component {
  static defaultProps = {
    onKeyDown: no_op,
    onKeyUp: no_op,
    onMouseDown: no_op,
    onMouseDrag: no_op,
    onMouseUp: no_op,
    onPathInit: no_op,
    onPathAdd: no_op,
    onSegmentAdd: no_op,
    onSegmentRemove: no_op,
  }

  path
}
