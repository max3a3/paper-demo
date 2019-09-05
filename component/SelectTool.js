// @flow
import  React from 'react';
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
    //instance variable
    mouseDown
    path
    rect

    onMouseDown = (toolEvent) => {
        const {pathProps, onMouseDown, onPathInit, paper} = this.props;
        //toolEvent from paperjs
        if (toolEvent.event.button === MOUSE_LEFT_CODE) {
           this.mouseDown = toolEvent.point
        }
    }

    onMouseDrag = (toolEvent) => {
        //toolEvent from paperjs
        if (toolEvent.event.buttons === 1) {
            const {paper} = this.props;
            this.rect = new paper.Rectangle(this.mouseDown, toolEvent.point);
            // debugger //chck for shift
            if(toolEvent.modifiers.shift) {
                this.rect.height = this.rect.width;
            }

            this.path = new paper.Path.Rectangle(this.rect);
            //todo optimize this with precreated
            this.path.fillColor = new paper.Color(0.9, 0.9, 1, 0.75)
            // if(event.modifiers.alt) {
            //     path.position = mouseDown;
            // }

            // Remove this path on the next drag event:
            this.path.removeOnDrag();
        }
    }

    onMouseUp = (event) => {
        const {path} = this;
        path.remove()
        // const {pathProps, onMouseUp, onPathAdd} = this.props;
        // if (path) {
        //     Object.assign(path, {
        //         selected: false,
        //         ...pathProps,
        //     });
        //     onPathAdd(path);
        //     this.path = null;
        //     this.start = null;
        // }
    }


    render() {
        const {innerRef, ...rest} = this.props;
        return (
            <Tool
                {...rest}
                ref={innerRef}
                onMouseDown={this.onMouseDown}
                onMouseDrag={this.onMouseDrag}
                onMouseUp={this.onMouseUp}
            />
        );
    }
}

// default react scripts don't support @PaperScope decorator
let SelectTool = PaperScope(SelectToolComponent)
export default React.forwardRef((props, ref) => <SelectTool innerRef={ref} {...props} />);
