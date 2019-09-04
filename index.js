import React, {Component} from 'react';

import {render} from 'react-dom';
import './style.css';
import './colorpicker.scss';
import {Container} from 'reactstrap'
import configureStore from './configure-store'
import {Provider} from 'react-redux'
import {ColorPickers} from './component/ColorPickers'
import {CanvasEditor} from './component/CanvasEditor'
import {ToolSelector} from "./container/ToolSelector";
import {TooledPaper} from "./container/TooledPaper";
import {ReduxedEditor} from "./component/ReduxedEditor";
import {DirectPaper} from './component/DirectPaper'

const store = configureStore()


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
            <ToolSelector/>
            <ColorPickers/>
            <TooledPaper/>
          </Container>
        </Provider>
    );
  }
  render()
  // test of ReduxedPaper
  {
    return (
        <Provider store={store}>
          <Container>
            <ToolSelector/>
            <ColorPickers/>
            <ReduxedEditor/>
          </Container>
        </Provider>
    );
  }

  renderx()
  // test of custom object in react-paper
  {
    return <CanvasEditor/>
  }

  render()
  // test of direct paper.js usage
  {
    return <DirectPaper/>
  }
}

render(<App/>, document.getElementById('root'));
