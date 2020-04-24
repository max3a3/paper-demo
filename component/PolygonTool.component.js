//from react-paper editor package
import * as React from 'react';

import * as ReactPaperJS from '@psychobolt/react-paperjs';


import PathTool from './PathTool.component';

const { Tool, PaperScope } = ReactPaperJS;


const MOUSE_LEFT_CODE = 0;

class PolygonToolComponent extends PathTool {
  static defaultProps = {
    ...PathTool.defaultProps,
    pathProps: {
      strokeColor: 'black',
      selected: true,
    },
  };

  componentDidUpdate() {
    const { path, points, props } = this;
    const { pathProps, pathData } = props;
    if (path) {
      this.setPathData(pathData);
      Object.assign(path, pathProps);
    } else if (points) {
      this.pathInit();
    }
  }

  onMouseDown = (toolEvent) => {
    if (toolEvent.event.button === MOUSE_LEFT_CODE) {
      const { path } = this;
      if (!path) {
        this.pathInit();
        this.props.onPathInit(path);
      }
      if (this.selectedSegment == null) {
        this.onSegmentAdd(toolEvent);
      } else {
        this.onPathAdd();
      }
    }
    this.props.onMouseDown(toolEvent);
  }

  pathInit() {
    const { pathProps, pathData, paper } = this.props;
    const { Path } = paper;
    const path = new Path(pathProps);
    this.path = path;
    this.setPathData(pathData);
  }

  setPathData(pathData) {
    const { path } = this;
    this.removeBounds();
    path.pathData = pathData;
    path.segments.forEach(segment => this.createBounds(segment));
  }

  onSegmentAdd(toolEvent) {
    const { path } = this;
    path.add(toolEvent.point);
    const segment = path.lastSegment;
    this.createBounds(segment);
    this.props.onSegmentAdd(segment, path);
  }

  onPathAdd() {
    const { selectedSegment, path, points } = this;
    const { onSegmentRemove, onPathAdd,pathProps } = this.props;
    const { index } = selectedSegment;
    const segments = path.removeSegments(0, index);
    if (segments.length) {
      onSegmentRemove(segments, path);
    }
    path.closed = true;
    path.selected = false;

    onPathAdd(path,pathProps);//prop

    this.path = null;
    this.selectedSegment = null;
    if (points) {
      points.remove();
    }
  }

  createBounds(segment)
  // create the circle for the point with mousedown handler to close the path
  {
    const { paper } = this.props;
    const { Path, Group, project } = paper;
    const { path, points } = this;
    if (!points) {
      this.points = new Group();
      project.layers.$$metadata.addChild(this.points);
    }
    const bounds = new Path.Circle({
      center: segment.point,
      radius: 7,
      fillColor: 'white',
      opacity: 0,   // set it to remove display
    });
    bounds.on('mousedown', () => {
      if (!path.closed
          && !path.lastSegment.point.equals(bounds.position)
          && path.contains(bounds.position)) {
        this.selectedSegment = segment;    // set the building path
      }
    });
    this.points.addChild(bounds);
  }

  removeBounds() {
    if (this.points) {
      this.points.remove();
      this.points = null;
    }
  }

  points;  // array of points

  selectedSegment; //building path

  render() {
    const {
      pathProps, onMouseDown, onPathAdd, onSegmentAdd, onSegmentRemove, paper, innerRef, ...rest
    } = this.props;
    return (
        <Tool
            ref={innerRef}
            onMouseDown={this.onMouseDown}
            {...rest}
        />
    );
  }
}


// default react scripts don't support @PaperScope decorator
let PolygonTool = PaperScope(PolygonToolComponent)

export default React.forwardRef((props, ref) => <PolygonTool innerRef={ref} {...props} />);

