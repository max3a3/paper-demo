import React, {Fragment} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {addSwatch} from "../store/swatch/actions";

export function ButtonCb({name, cb, disabled = false}) {
  return <button disabled={disabled} onClick={cb}>{name}</button>;
}

export default function SwatchButtons() {
  let dispatch = useDispatch()

  return (
      <Fragment>
        <ButtonCb name='addswatch' cb={_ => {
          dispatch(addSwatch())
        }}/>
      </Fragment>
  )
}
