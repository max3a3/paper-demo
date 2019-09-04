import React from 'react';
import {ReduxedPaper} from "./ReduxedPaper";
import {EditorCommands} from "./EditorCommands";

export function ReduxedEditor() {
  return <div className="flex_container">
    <div className="flex_item">
      <EditorCommands/>
    </div>
    <ReduxedPaper className="flex_item"/>
  </div>

}


