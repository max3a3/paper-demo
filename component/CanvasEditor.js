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


// register custom type here
class MyPaperRenderer extends PaperRenderer {
  getInstanceFactory() {
    return {
      ...this.defaultTypes,
      MyCustomStencil: (props, paper) => StarCreate(paper, props),

    };
  }
}

// need to transform the type as React object, have to do this so it can handle ref
let customType = { MyCustomStencil: 'MyCustomStencil' }
let customComp = Object.entries(customType).reduce((types, [key, Type]) => {
  return ({
    ...types,
    // $FlowFixMe
    [key]: React.forwardRef((props, ref) => <Type ref={ref} {...props} />),
  })
}, {})

let MyCustomStencil = customComp.MyCustomStencil


//this is the component
// let MyCustomStencil = React.forwardRef((props, ref) => <MyCustomStencil ref={ref} {...props} />)



export function CanvasEditor() {
  return <div className="flex_container">
    <div className="flex_item">
      layer1<br />
      layer2<br />
      <br />
    </div>
    <PaperContainer className="flex_item" canvasProps={{ className: 'tool_canvas' }} renderer={MyPaperRenderer}>
      <MyCustomStencil position={[90, 60]} width={90}
        height={60}
        strokeColor="red"
        fillColor="green"
      />

    </PaperContainer>
  </div>

}
