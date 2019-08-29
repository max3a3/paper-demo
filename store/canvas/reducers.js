import CanvasActions from './action_types'
import Hashids from 'hashids';
import {combineReducers} from "redux";
import invariant from 'invariant'

const getEntitiesByIds = (ids, entities) => ids
    .reduce((rest, id) => ({...rest, [id]: entities[id]}), {});

export function paths(state = {}, action) {
    switch (action.type) {
        case CanvasActions.ADD_PATH:
            return {...state, [action.payload.id]: action.payload};

        case CanvasActions.UPDATE_PATHS:
            debugger
            return {
                ...state,
                ...action.payload.reduce((paths, path) => ({  // what is this reduce for
                    ...paths,
                    [path.id]: {...state[path.id], ...path},
                }), {}),
            };
        case CanvasActions.REMOVE_PATHS:
            //todo this need to follow as in protostage, do tests
//        case CanvasActions.REMOVE_PATHS: return state.filter(id => !action.payload.ids.includes(id));

            debugger
        case CanvasActions.DESELECT_ALL:
            let selectedPathId = action.payload.pathIds //array
            const selectedPaths = getEntitiesByIds(selectedPathId, state)
            // console.log("selectedPaths",selectedPaths)

            // this set the selected false and merged in  the state passed in shouldn't be all but the one that is selectedPathId
            const deselect = Object
                .keys(selectedPaths).reduce((rest, id) => ({...rest, [id]: {...state[id], selected: false}}), {});

            // merge the deselected paths with unaffected paths
            return {
                ...state,
                ...deselect
            }
        case CanvasActions.SELECT_PATHS:
            return {
                ...state,
                ...action.payload.ids
                    .reduce((paths, id) => ({...paths, [id]: {...state[id], selected: true}}), {}),
            };
        default:
            return state;
    }
};

export function pathIds(state = [], action) {
    switch (action.type) {
        case CanvasActions.ADD_PATH:
            return state.concat(action.payload.id);
        case CanvasActions.REMOVE_PATHS:
            return state.filter(id => !action.payload.ids.includes(id));

        case CanvasActions.REMOVE_LAYERS:
            debugger
        //todo see line 169 Project\History\Canvas\ Canvas.reducer.js
        default:
            return state;
    }
};

export function selectedPathIds(state = [], action) {
    switch (action.type) {
        case CanvasActions.ADD_PATH:
            return action.payload.selected ? state.concat(action.payload.id) : state;
        case CanvasActions.SELECT_PATHS:
            return action.payload.ids;
        case CanvasActions.REMOVE_PATHS:
            return state.filter(id => !action.payload.ids.includes(id));
        case CanvasActions.DESELECT_ALL:
            return [];
        default:
            return state;
    }
};

//doc in wiki

export const DEFAULT_LAYER = {
    id: new Hashids('default_layer').encode(0),
    pathIds: [],
};

const INITIAL_LAYERS = {
    [DEFAULT_LAYER.id]: DEFAULT_LAYER,
}

export function layers(state = INITIAL_LAYERS, action) {
    switch (action.type) {
        case CanvasActions.ADD_LAYER:
            return {...state, [action.payload.id]: action.payload};
        case CanvasActions.ADD_PATH: {
            const {id, layer} = action.payload;
            const {pathIds, ...rest} = state[layer];
            return {
                ...state,
                [layer]: {
                    ...rest,
                    pathIds: pathIds.concat(id),
                },
            };
        }
        case CanvasActions.REMOVE_PATHS:
            return Object.keys(state).reduce((layers, id) => {
                const {pathIds, ...layer} = state[id];
                return {
                    ...layers,
                    [id]: {...layer, pathIds: pathIds.filter(pathId => !action.payload.ids.includes(pathId))},
                };
            }, {});
        case CanvasActions.REMOVE_LAYERS:
            debugger
        //todo see line 167 canvas.reducer.js

        default:
            return state;
    }
};
const layerIds = (state = [DEFAULT_LAYER.id], action) => {
    switch (action.type) {
        case CanvasActions.ADD_LAYER:
            return state.concat(action.payload.id);
        case CanvasActions.REMOVE_LAYERS:
            return state.filter(id => !action.payload.ids.includes(id));
        default:
            return state;
    }
};
//selectedPathIds, activeLayer, autoSync
const INITIAL_CANVAS_STATE = {
    // need to remove some to simplify reducer code

    //   paths: {},  => getPaths   paths
    //   pathIds: [], => getPathIds  pathIds
    pathLinks: {},
    //  selectedPathIds: [], => getSelectedPathIds    TODO NOT YET for ADD_PATH


    /*   layers: {  => getLayers
           [defaultLayer.id]: defaultLayer,
       },
    */

    //   layerIds: [defaultLayer.id],  =>getLayerIds

    /* todo this is for what?
    layerLinks: {
        [defaultLayer.id]: {
            bodyId: defaultBody.id,
        },
    },
    */
    activeLayer: DEFAULT_LAYER.id,
    activeTool: 'select',

// addition
    autoSync: false,  //todo can't find the setter in protostage
}
const canvasState = (state = INITIAL_CANVAS_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }

}

const reducer = combineReducers({  // add another field with a form
    paths,
    selectedPathIds,
    layers,
    layerIds,
    canvasState
})

export default reducer
