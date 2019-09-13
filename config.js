import keyMirror from "./key-mirror";
export const TOOL_TYPE = keyMirror({
    LINE: null,
    CIRCLE: null,
    RECTANGLE:null,
    SELECT:null,

})
export const TOOLS = Object.keys(TOOL_TYPE)
