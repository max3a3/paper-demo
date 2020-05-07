import React, { Component } from 'react';

import { render } from 'react-dom';
import './style.css';
import './colorpicker.scss';
import { Container } from 'reactstrap'
import configureStore from './configure-store'
import {Provider} from 'react-redux'
import {ColorPickers} from './component/ColorPickers'
import {CanvasEditor} from './component/CanvasEditor'
import {ToolSelector} from "./container/ToolSelector";
import {TooledPaper} from "./container/TooledPaper";
import {ReduxedEditor} from "./component/ReduxedEditor";
import {DirectPaper} from './component/DirectPaper'
import SwatchButtons from "./component/SwatchButtons";
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {createDragDropManager} from 'dnd-core'
import DragCircleButton from "./component/DragCircleButton";
import HTML5BackendExt from "./HTML5BackendExt";

const store = configureStore()


let _HTML5BackendExt = (
    manager,
    context,
) => new HTML5BackendExt(manager, context)

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  renderT()
  // test of tool TooledPaper
  {
    return (
      <Provider store={store}>
        <Container>
          <ToolSelector />
          <ColorPickers />
          <TooledPaper />
        </Container>
      </Provider>
    );
  }
  render()
  // test of ReduxedPaper
  {
    return (
        <Provider store={store}>
          <DndProvider backend={_HTML5BackendExt}>
          {/*<DndProvider backend={HTML5Backend}>*/}
          <Container>
            <ToolSelector/>
            <DragCircleButton/>
            <ColorPickers/>
            <SwatchButtons/>
            <ReduxedEditor/>
          </Container>
          </DndProvider>
        </Provider>
    );
  }

  renderx()
  // test of custom object in react-paper
  {
    return <CanvasEditor />
  }

  renderD()
  // test of direct paper.js usage
  {
    return <DirectPaper />
  }
}

render(<App />, document.getElementById('root'));
