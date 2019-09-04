import CanvasActions from './action_types'
import initialState from './initial_state'

const getEntitiesByIds = (ids, entities) => ids
    .reduce((rest, id) => ({...rest, [id]: entities[id]}), {});

const getChildren = (keys, entities, mapper) => keys
    .reduce((rest, key) => rest.concat(mapper(entities[key])), []);

const getPaths = (state = initialState.paths, action) => {
  switch (action.type) {
    case CanvasActions.ADD_PATH:
      return {...state, [action.payload.id]: action.payload};
    case CanvasActions.UPDATE_PATHS:
      return {
        ...state,
        ...action.payload.reduce((paths, path) => ({
          ...paths,
          [path.id]: {...state[path.id], ...path},
        }), {}),
      };
    case CanvasActions.DESELECT_ALL:
      return Object
          .keys(state).reduce((rest, id) => ({...rest, [id]: {...state[id], selected: false}}), {});
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

const getPathIds = (state = initialState.pathIds, action) => {
  switch (action.type) {
    case CanvasActions.ADD_PATH:
      return state.concat(action.payload.id);
    case CanvasActions.REMOVE_PATHS:
      return state.filter(id => !action.payload.ids.includes(id));
    default:
      return state;
  }
};

const getSelectedPathIds = (state = initialState.selectedPathIds, action) => {
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

const getLayers = (state = initialState.layers, action) => {
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
    default:
      return state;
  }
};

const getLayerIds = (state = initialState.layerIds, action) => {
  switch (action.type) {
    case CanvasActions.ADD_LAYER:
      return state.concat(action.payload.id);
    case CanvasActions.REMOVE_LAYERS:
      return state.filter(id => !action.payload.ids.includes(id));
    default:
      return state;
  }
};


export default (state = initialState, action) => {
  switch (action.type) {
    case CanvasActions.ADD_PATH: {
      return {
        ...state,
        paths: getPaths(state.paths, action),
        pathIds: getPathIds(state.pathIds, action),
        selectedPathIds: getSelectedPathIds(state.selectedPathIds, action),
        layers: getLayers(state.layers, action),
      };
    }

    case CanvasActions.REMOVE_PATHS: {
      const pathIds = getPathIds(state.pathIds, action); // do pathIds first
      return {
        ...state,
        pathIds,
        paths: getEntitiesByIds(pathIds, state.paths), // update paths
        pathLinks: getEntitiesByIds(pathIds, state.pathLinks),
        selectedPathIds: getSelectedPathIds(state.selectedPathIds, action),
        layers: getLayers(state.layers, action),
      };
    }
    case CanvasActions.UPDATE_PATHS:
      return {
        ...state,
        paths: getPaths(state.paths, action),
      };
    case CanvasActions.SELECT_PATHS:
      return {
        ...state,
        paths: getPaths(state.paths, action),
        selectedPathIds: getSelectedPathIds(state.selectedPathIds, action),
      };
    case CanvasActions.DESELECT_ALL:
      return {
        ...state,
        paths: {
          ...state.paths, // the original .paths

          // the clean paths   getEntitiesByIds just get the id from it
          ...getPaths(getEntitiesByIds(state.selectedPathIds, state.paths), action),
        },

        selectedPathIds: getSelectedPathIds(state.selectedPathIds, action),
      };
    case CanvasActions.ADD_LAYER:
      return {
        ...state,
        layers: getLayers(state.layers, action),
        layerIds: getLayerIds(state.layerIds, action),
        activeLayer: action.payload.id
      };
    case CanvasActions.REMOVE_LAYERS: {
      const layerIds = getLayerIds(state.layerIds, action);
      const pathIds = getChildren(layerIds, state.layers, layer => layer.pathIds);
      return {
        ...state,
        layers: getEntitiesByIds(layerIds, state.layers),
        layerIds,
        activeLayer: !layerIds.includes(state.activeLayer) ? layerIds[0] : state.activeBody,
        pathIds,
        paths: getEntitiesByIds(pathIds, state.paths),
        pathLinks: getEntitiesByIds(pathIds, state.pathLinks),
        selectedPathIds: state.selectedPathIds.filter(id => pathIds.includes(id)),
      };
    }
    case CanvasActions.SELECT_LAYER:
      return {...state, activeLayer: action.payload.id};
    case CanvasActions.SELECT_TOOL:
      return {...state, activeTool: action.payload.tool};

      // this is the reducer command , and payload will be the content of app
      // getProject just get the key
      // it is a bit scattered how this is tied to saving todo: put in same file the load and  save tree
    case CanvasActions.REPLACE_CANVAS:

      return {...state, ...action.payload};
    case CanvasActions.NEW_CANVAS:

      return initialState;
    default:
      return state;
  }
};

