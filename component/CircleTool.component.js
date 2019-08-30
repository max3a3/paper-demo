import * as React from 'react';
import * as ReactPaperJS from '@psychobolt/react-paperjs';



import PathTool from './PathTool.component';

const {Tool, PaperScope} = ReactPaperJS;


const MOUSE_LEFT_CODE = 0;

class CircleToolComponent extends PathTool {
    static defaultProps = {
        ...PathTool.defaultProps,
        pathProps: {
            fillColor: 'white',
            strokeColor: 'black',
        },
    }

    onMouseDown = (toolEvent) => {
        const {pathProps, onMouseDown, onPathInit, paper} = this.props;
        if (toolEvent.event.button === MOUSE_LEFT_CODE) {
            const {Path, Color} = paper;
            const path = new Path.Circle({
                center: toolEvent.point,
                radius: 3,
                fillColor: pathProps.selectedFillColor || new Color(0.9, 0.9, 1, 0.75),
                selected: true,
            });
            this.path = path;
            onPathInit(path);
        }
        onMouseDown(toolEvent);
    }

    onMouseDrag = (toolEvent) => {
        const {onMouseDrag} = this.props;
        if (toolEvent.event.buttons === 1) {
            const {path} = this;
            let distance = toolEvent.point.getDistance(path.position)
            if (distance > 0.5) {

                if (path.bounds.width < 0)
                    path.scale(toolEvent.point.getDistance(path.position) / (1 / 2.0));
                else
                    path.scale(toolEvent.point.getDistance(path.position) / (path.bounds.width / 2.0));
            }
        }
        onMouseDrag(toolEvent);
    }

    onMouseUp = (event) => {
        const {path} = this;
        const {pathProps, onMouseUp, onPathAdd} = this.props;
        if (path) {
            Object.assign(path, {
                selected: false,
                ...pathProps,
            });
            onPathAdd(path);
            this.path = null;
        }
        onMouseUp(event);
    }

    render() {
        const {innerRef, ...rest} = this.props;
        return (
            <Tool
                ref={innerRef}
                {...rest}
                onMouseDown={this.onMouseDown}
                onMouseDrag={this.onMouseDrag}
                onMouseUp={this.onMouseUp}
            />
        );
    }
}
// default react scripts don't support @PaperScope decorator
let CircleTool = PaperScope(CircleToolComponent)

export default React.forwardRef((props, ref) => <CircleTool innerRef={ref} {...props} />);
