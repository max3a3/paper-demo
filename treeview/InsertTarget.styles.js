import React from "react";

let NormalStyles = {
  insertTarget:
      {
        boxSizing: "border-box",
        width: "100%",
        height: "1em",
        position: "absolute",
        zIndex: 1,
        display: "none",
      },

  insertBeforeTarget: {
    top: "-0.5em",
  },

  insertAfterTarget: {
    bottom: "-0.5em",
  },

  insertTargetCanDrop: {
    display: "flex",
  },

  insertTargetDropping: {},

  insertTargetMarkerDropping: {
    boxSizing: "border-box",
    width: "100%",
    height: "3px",
    borderRadius: "2px",
    background: "linear-gradient(90deg, gray, white)",
    alignSelf: "center",
  },


}

let DebugStyles = {


  insertTarget: {
    opacity: 0.5,
  },

  insertTargetCanDrop: {},

  insertTargetDropping: {
    opacity: 0.9,
  },

  insertBeforeTarget: {
    backgroundColor: "#ffffdd",
  },

  insertAfterTarget: {
    backgroundColor: "#ffddff",
  }
}

const isDebug = false;//true;

export const Styles = {

  insertBeforeTarget: Object.assign(
      {},
      NormalStyles.insertTarget,
      NormalStyles.insertBeforeTarget,
      isDebug ? DebugStyles.insertTarget : {},
      isDebug ? DebugStyles.insertBeforeTarget : {}
  ),

  insertAfterTarget: Object.assign(
      {},
      NormalStyles.insertTarget,
      NormalStyles.insertAfterTarget,
      isDebug ? DebugStyles.insertTarget : {},
      isDebug ? DebugStyles.insertAfterTarget : {}
  ),

  insertTargetCanDrop: Object.assign(
      {},
      NormalStyles.insertTargetCanDrop,
      isDebug ? DebugStyles.insertTargetCanDrop : {}
  ),

  insertTargetDropping: Object.assign(
      {},
      NormalStyles.insertTargetDropping,
      isDebug ? DebugStyles.insertTargetDropping : {}
  ),

  insertTargetMarkerDropping: NormalStyles.insertTargetMarkerDropping,
}
