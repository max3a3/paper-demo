import React, {Fragment} from "react";
import ColorPicker from "react-simple-colorpicker";
import {Button, UncontrolledPopover, PopoverBody} from 'reactstrap';
import {useSelector, useDispatch} from "react-redux";
import {setToolColor} from "../store/ui/actions"

function Picker({colorKey, children}) {
  const dispatch = useDispatch();
  const current = useSelector(state => state.ui[colorKey]);
  let handleColorChange = (color) => dispatch(setToolColor(colorKey, color))

  return (
      <Fragment>
        <Button className="btn_picker" style={{backgroundColor: current}} id={`target_${colorKey}`} type="button">
          {children}
        </Button>
        <UncontrolledPopover placement="bottom" trigger="legacy"
                             target={`target_${colorKey}`}
        >
          <PopoverBody tag={ColorPicker}
                       color={current}
                       onChange={handleColorChange}
          />
        </UncontrolledPopover>

      </Fragment>
  )
}

export function ColorPickers() {
  return (
      <Fragment>
        <Picker colorKey="stroke">
          /
        </Picker>
        <Picker colorKey="fill">
          O
        </Picker>
      </Fragment>)

}
