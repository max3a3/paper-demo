import produce from "immer"
import ActionTypes from './action_types'

export const INITIAL_STATE = {
  ids: [],
  swatches: {}
};
// no need return unless changing whole tree https://github.com/immerjs/immer/blob/master/docs/return.md
const reducer = (state = INITIAL_STATE, action) =>
    produce(state, draft => {
      switch (action.type) {
        case ActionTypes.ADD_SWATCH: {
          let {id} = action.payload;
          draft.ids.push(id)
          draft.swatches[id] = action.payload
          break
        }
      }

    });

export default reducer;
