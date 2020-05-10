import React from "react";
import {
  DropTarget, useDrop
} from "react-dnd";


import {TYPE,} from "./DraggedNode";
import {Styles} from "./InsertTarget.styles";


const TreeViewInsertTarget = (props) =>
    props.connectDropTarget(
        <div
            style={
              Object.assign(
                  {},
                  props.insertBefore ? Styles.insertBeforeTarget : Styles.insertAfterTarget,
                  props.canDrop ? Styles.insertTargetCanDrop : {},
                  props.isDropping ? Styles.insertTargetDropping : {}
              )
            }
        >
          x
          <div style={props.isDropping ? Styles.insertTargetMarkerDropping : {}}/>
        </div>
    );

const handleCanDrop = (
    props,
    monitor,
    item
) => (
    !(
        props.parentNode === item.parentNode &&
        (
            props.parentChildIndex === item.parentChildIndex ||
            props.parentChildIndex === item.parentChildIndex + 1
        )
    ) &&
    !item.allSourceIDs.contains(props.parentNode ? props.parentNode.id : null)
);

export const handleDrop = (
    props,
    item,
    onItem=false
) => (
    props.onMoveNode({
      oldParentNode: item.parentNode,
      oldParentChildIndex: item.parentChildIndex,
      oldPrecedingNode: item.precedingNode,
      node: item.node,
      newParentNode: onItem?props.node:props.parentNode,
      newParentChildIndex:onItem?0: props.parentChildIndex,
      newPrecedingNode:onItem?null: props.precedingNode,
    }),
        ({
          parentNode: props.parentNode,
          parentChildIndex: props.parentChildIndex,
        })
);

// todo test that we do have nested? [moved in useDrop drop: func()] i thought it is all linear?
const nodeTarget = {
  drop: (props, monitor, component) => monitor.didDrop()
      ? undefined // we have nested drop target, this indicate some child already handled drop
      : handleDrop(props,  monitor.getItem()),
  canDrop: (props, monitor) => handleCanDrop(props, monitor, monitor.getItem()),
};

const collectNodeDropProps =
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      canDrop: monitor.canDrop(),
      isDropping: monitor.isOver({shallow: true}) && monitor.canDrop(),
    });

export const DroppableTreeViewInsertTargetX =
    DropTarget([TYPE], nodeTarget, collectNodeDropProps)(TreeViewInsertTarget);

export function DroppableTreeViewInsertTarget(props) {
  // first param is what is returned from the collect
  const [{canDrop, isDropping}, drop] = useDrop({
    accept: TYPE,
    drop: (item, monitor) => monitor.didDrop()
        ? undefined // we have nested drop target, this indicate some child already handled drop
        : handleDrop(props,  item),
    canDrop: (item, monitor) => (
        !(
            props.parentNode === item.parentNode &&
            (
                props.parentChildIndex === item.parentChildIndex ||
                props.parentChildIndex === item.parentChildIndex + 1
            )
        ) &&
        !item.allSourceIDs.contains(props.parentNode ? props.parentNode.id : null)
    ),


    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isDropping: monitor.isOver({shallow: true}) && monitor.canDrop(),
    })


  })
  return (<div
          ref={drop}
          style={
            Object.assign(
                {},
                props.insertBefore ? Styles.insertBeforeTarget : Styles.insertAfterTarget,
                canDrop ? Styles.insertTargetCanDrop : {},
                isDropping ? Styles.insertTargetDropping : {}
            )
          }
      >
        <div style={isDropping ? Styles.insertTargetMarkerDropping : {}}/>
      </div>
  )
}
