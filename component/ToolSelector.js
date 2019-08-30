import {Button, ButtonGroup} from 'reactstrap'
import PropTypes from 'prop-types'
import React,{Fragment} from 'react';

function RxButton({text, current, setTool}) {
    return (
        <Button active={current === text} onClick={() => setTool(text)}>
            {text}
        </Button>
    )

}
RxButton.propTypes = {
    text: PropTypes.string.isRequired,
    current: PropTypes.string.isRequired,
    setTool:PropTypes.func.isRequired
}

export function ToolSelector(props) {
    const {buttons,...rest} = props
    return (
        <Fragment>
            <ButtonGroup>
                {buttons.map(
                    (t, i) => <RxButton text={t} {...rest} key={i}/>)}
            </ButtonGroup>
        </Fragment>
    );
}

ToolSelector.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
}
