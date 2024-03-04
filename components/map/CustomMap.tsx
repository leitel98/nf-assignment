'use client';

import Map, { Source, Layer } from 'react-map-gl';
import type { CircleLayer } from 'react-map-gl';
import type { FeatureCollection } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const sampleLayerStyle: CircleLayer = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 8,
    'circle-color': 'red',
  },
};

const CustomMap = ({ sampleData }: { sampleData: FeatureCollection }) => {
  return (
    <Map
      mapboxAccessToken={mapboxToken}
      mapStyle='mapbox://styles/mapbox/satellite-streets-v12'
      initialViewState={{
        latitude: -33.2456126,
        longitude: -70.6820945,
        zoom: 14,
      }}
      style={{ gridColumn: 'span 2', height: 800 }}
      maxZoom={20}
      minZoom={3}
    >
      <Source id='my-data' type='geojson' data={sampleData}>
        <Layer {...sampleLayerStyle} />
      </Source>
    </Map>
  );
};

export default CustomMap;
