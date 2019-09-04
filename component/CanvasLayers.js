import React, {Fragment} from "react";
import {getCanvas} from "../store/canvas/selectors";
import {Path, Layer} from '@psychobolt/react-paperjs';

const getPaths = (pathIds, paths) => pathIds.map(pathId => {
  // properties is protostage specific extraction to display , it is pathData that is from paper and passed back

  const {
    id, /*type: Path,*/
    layer, properties, ...rest
  } = paths[pathId];
  return <Path key={`path_${id}`} data={{pathId: id}} {...rest} />;
})

export function CanvasLayers({store}) {
  let {layerIds, layers, paths} = getCanvas(store.getState())

  //todo need to memoize this or is it done by react already?
  let layerComps = layerIds.map(layerId => {
    const {id, pathIds, ...rest} = layers[layerId];
    return (
        <Layer key={`layer_${id}`} data={{layerId: id}} {...rest}>
          {getPaths(pathIds, paths)}
        </Layer>
    )
  })
  return (<Fragment>
    {layerComps}
  </Fragment>)

}
