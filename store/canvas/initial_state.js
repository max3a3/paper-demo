import Hashids from 'hashids';


const defaultLayer = {
  id: new Hashids('default_layer').encode(0),
  pathIds: [],
};

export default {
  paths: {},
  pathIds: [],
  selectedPathIds: [],
  layers: {
    [defaultLayer.id]: defaultLayer,
  },
  layerIds: [defaultLayer.id],
  activeLayer: defaultLayer.id,
};
