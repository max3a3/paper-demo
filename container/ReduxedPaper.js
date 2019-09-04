import {ReduxedPaper as ReduxedPaperComp} from "../component/ReduxedPaper";

import {connect} from 'react-redux'
import {TOOLS} from "../config";
import {addPath, deselectAll, selectPaths, updatePaths} from "../store/canvas/actions";

const mapStateToProps = (state) => {
  return {
    current: state.ui.tool,
    tools: TOOLS,
    stroke: state.ui.stroke,
    fill: state.ui.fill,
  }
}

export const TooledPaper = connect(
    mapStateToProps,
    {addPath, deselectAll, selectPaths, updatePaths}
)(ReduxedPaperComp)
