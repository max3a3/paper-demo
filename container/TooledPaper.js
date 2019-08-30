import {TooledPaper as TooledPaperComp} from "../component/TooledPaper";

import {connect} from 'react-redux'
import {TOOLS} from "../config";

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
    null
)(TooledPaperComp)
