// @flow
import React from 'react'

export default class PathTool extends React.Component {
  static defaultProps = {
    onKeyDown: () => {},
    onKeyUp: () => {},
    onMouseDown: () => {},
    onMouseDrag: () => {},
    onMouseUp: () => {},
    onPathInit: () => {},
    onPathAdd: () => {},
    onSegmentAdd: () => {},
    onSegmentRemove: () => {},
  }

  path
}
