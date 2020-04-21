import Actions from "./action_types";
import Hashids from "hashids";

export function addSwatch(swatch) {
  return ({
    type: Actions.ADD_SWATCH,
    payload: {
      id: new Hashids('swatch').encode(new Date().getTime()),
      ...swatch,
    }
  })
}
