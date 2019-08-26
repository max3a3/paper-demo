import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import {Container,Button,ButtonGroup} from 'reactstrap'

function ToolButtons() {
return (<Button>tet</Button>)
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
      <Container>
      <ToolButtons/>
        <Hello name={this.state.name} />
        <p>
          Start editing xxto see some magic happe n :)
        </p>
      </Container>
    );
  }
}

render(<App />, document.getElementById('root'));
