import Hashids from 'hashids';
import Actions from './action_types'
import invariant from 'invariant'


export function addPath(path, skipHistory) {
  return ({
    type: Actions.ADD_PATH,
    payload: {
      id: new Hashids('path').encode(new Date().getTime()),
      ...path,
    },
    meta: {skipHistory},
  })
}

// todo testing normal actiontype instead of a thunk

export function deselectAll(skipHistory) {
  return (dispatch, getState) => {
    // console.log("getstate",getState())

    const pathIds = getState()['canvas']['selectedPathIds']
    // console.log("pathIds",pathIds)
    invariant(pathIds, "bad state: can't find pathids")
    // pass pathIds like selectPaths in payload field as keyed array
    dispatch({type: Actions.DESELECT_ALL, payload: {pathIds}, meta: {skipHistory}})
  }

}

export const selectPaths = (ids, skipHistory) => ({
  type: Actions.SELECT_PATHS, payload: {ids}, meta: {skipHistory},
});

export const updatePaths = payload => ({
  type: Actions.UPDATE_PATHS, payload,
});


export function newCanvas() {

  return ({type: Actions.NEW_CANVAS})

}
export function loadCanvasData(payload) {

  return ({type: Actions.REPLACE_CANVAS, payload})

}
