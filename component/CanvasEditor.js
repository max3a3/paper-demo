import { PaperContainer, PaperRenderer } from '@psychobolt/react-paperjs';
import React from 'react';

// custom type creator
function StarCreate(paper, props) {
  var num_points = 32
  var group = new paper.Group()
  var i = 9
  var path = new paper.Path({
    fillColor: props.fillColor || 'red',
    strokeColor: props.strokeColor || 'black',
    closed: true
  });
  var offset = new paper.Point(20 + 10 * i, 0);
  var l = offset.length;
  for (var j = 0; j < num_points * 2; j++) {
    offset.angle += 360 / num_points;
    var vector = offset.normalize(l * (j % 2 ? 0.1 : -0.1));
    path.add(offset.add(vector));
  }
  path.smooth({ type: 'continuous' });
  group.addChild(path)
  group.position = props.position
  return group
}

let Type = 'CustomStar'  //match the custom type registered in renderer

// register custom type here
class MyPaperRenderer extends PaperRenderer { 
  getInstanceFactory() {
    return {
      ...this.defaultTypes,
      [Type]: (props, paper) => StarCreate(paper, props),

    };
  }
}

/* if you have several custom type this is more efficient
// need to transform the type as React object, have to do so it can handle ref
let customType = { MyCustomStencil: 'MyCustomStencil' }
let customComp = Object.entries(customType).reduce((types, [key, Type]) => {
  return ({
    ...types,
    // $FlowFixMe
    [key]: React.forwardRef((props, ref) => <Type ref={ref} {...props} />),
  })
}, {})
// let MyCustomStencilComp = customComp.MyCustomStencil
*/


//this is the component
// create the React wrapper with a Type variable so compile time can pass
let StarComponent = React.forwardRef((props, ref) => <Type ref={ref} {...props} />)



export function CanvasEditor() {
  return <div className="flex_container">
    <div className="flex_item">
      layer1<br />
      layer2<br />
      <br />
    </div>
    <PaperContainer className="flex_item" canvasProps={{ className: 'tool_canvas' }} renderer={MyPaperRenderer}>
      <StarComponent position={[90, 60]} width={43}
        height={60}
        strokeColor="red"
        fillColor="green"
      />

    </PaperContainer>
  </div>

}
