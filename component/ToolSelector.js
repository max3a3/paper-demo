import {Button, ButtonGroup} from 'reactstrap'
import PropTypes from 'prop-types'
import React from 'react';
import {setTool} from "../store/ui/actions";
const noop = () => {};

function RxButton({text, current = 'notyet', setTool = noop}) {
    return (
        <Button active={current === text} onClick={() => setTool(text)}>
            {text}
        </Button>
    )

}
RxButton.propTypes = {
    text: PropTypes.string.isRequired,
    current: PropTypes.string,
    setTool:PropTypes.func
}

export function ToolSelector(props) {
    const {buttons,...rest} = props
    return (
        <div>
            <ButtonGroup>
                {buttons.map(
                    (t, i) => <RxButton text={t} {...rest} key={i}/>)}
            </ButtonGroup>
        </div>
    );
}

ToolSelector.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
}
