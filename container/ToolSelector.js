import {ToolSelector as ToolSelectorComp} from "../component/ToolSelector";

import { connect } from 'react-redux'
import {setTool} from '../store/ui/actions'
import {TOOLS} from "../config";
const mapStateToProps = (state) => {
    return {current: state.ui.tool,
        buttons:TOOLS
    }
}

export const ToolSelector =  connect(
    mapStateToProps,
    {setTool}
)(ToolSelectorComp)
