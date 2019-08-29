import React, {Component} from 'react';

import {render} from 'react-dom';
import Hello from './Hello';
import './style.css';
import {Container, Button, ButtonGroup} from 'reactstrap'
import configureStore from './configure-store'
import {setButtons} from "./store/ui/actions";
import {useSelector, useDispatch} from "react-redux";
import { Provider } from 'react-redux'
import {CanvasEditor} from './component/CanvasEditor'
import {ToolSelector} from "./container/ToolSelector";
import {TOOLS} from "./config";
import {TooledPaper} from "./container/TooledPaper";

const store = configureStore()


class App extends Component {
    constructor() {
        super();
        this.state = {
            name: 'React'
        };
    }

    render() {
        return (
            <Provider store={store}>
                <Container>
                    <ToolSelector />
                    <Hello name={this.state.name}/>
        <TooledPaper />
                    {/*<CanvasEditor/>*/}
                </Container>
            </Provider>
        );
    }
}

render(<App/>, document.getElementById('root'));
