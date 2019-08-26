import React, {Component} from 'react';

import {render} from 'react-dom';
import Hello from './Hello';
import './style.css';
import {Container, Button, ButtonGroup} from 'reactstrap'
import configureStore from './configure-store'
import {setButtons} from "./store/ui/actions";
import {useSelector, useDispatch} from "react-redux";
import { Provider } from 'react-redux'

const store = configureStore()

function RxButton({text}) {
    const dispatch = useDispatch();
    const current = useSelector(state => state.ui.buttons);
    return (
        <Button active={current === text} onClick={() => dispatch(setButtons(text))}>
            {text}
        </Button>
    )

}

function ToolButtons() {
    let buttons = ['left', 'middle', 'right'];
    return (
        <div>
            <ButtonGroup>
                {buttons.map(
                    (t, i) => <RxButton text={t} key={i}/>)}
            </ButtonGroup>
        </div>
    );
}

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
                    <ToolButtons/>
                    <Hello name={this.state.name}/>
                </Container>
            </Provider>
        );
    }
}

render(<App/>, document.getElementById('root'));
