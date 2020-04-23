import React from 'react';

// using react.memo is signalling that this is a purecomponent, will rerender if  props change via shallow comparison
import {useDrag} from "react-dnd";

const DragCircleButton = React.memo((props) => {
  const { icon } = props;

  const [, drag] = useDrag({
    item: { type: 'DND_CIRCLE' }
  });

  return (
      <button ref={drag}>DragMe</button>
  );
});
export default DragCircleButton
