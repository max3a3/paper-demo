import produce from "immer"
import ActionTypes from './action_types'

export const INITIAL_STATE = {
  ids: [],
  swatches: {}
};
const reducer = (state = INITIAL_STATE, action) =>
    produce(state, draft => {
      switch (action.type) {
        case ActionTypes.ADD_SWATCH: {
          let {id} = action.payload;
          draft.ids.push(id)
          draft.swatches[id] = action.payload
          break
        }
        default:
          return draft;
      }

    });

export default reducer;
