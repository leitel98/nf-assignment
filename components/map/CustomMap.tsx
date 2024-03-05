'use client';

import { useState } from 'react';
import type { FeatureCollection } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from '@/public/icons/Pin';
import Map, { Source, Layer, Marker, Popup, LayerProps } from 'react-map-gl';
import { GeoJSONSourceOptions } from 'mapbox-gl';

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const CustomMap = ({
  sampleData,
  fertilizationData,
}: {
  sampleData: any;
  fertilizationData: any;
}) => {
  const [hoveredId, setHoveredId] = useState(null);

  const fertilizations: GeoJSONSourceOptions['data'] = {
    type: 'FeatureCollection',
    features: fertilizationData.map((data: any) => ({
      id: data.id,
      type: 'Feature',
      geometry: { type: 'Polygon', coordinates: [data.position] },
    })),
  };
  const fertilizationStyles: LayerProps = {
    id: 'data_style',
    type: 'fill',
    source: 'fertilizations',
    paint: {
      'fill-color': 'green',
      'fill-opacity': 0.7,
    },
  };

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
      <Source id='fertilizations' type='geojson' data={fertilizations}>
        <Layer {...fertilizationStyles} />
      </Source>
      {sampleData.map((sample: any) => (
        <Marker
          key={sample.id}
          longitude={sample.position?.longitude}
          latitude={sample.position?.latitude}
        >
          <div
            onMouseEnter={() => setHoveredId(sample.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Pin className='stroke-white fill-blue-700 w-8 h-8' />
            {hoveredId === sample.id && (
              <Popup
                longitude={sample.position?.longitude}
                latitude={sample.position?.latitude}
                closeButton={false}
                closeOnClick={false}
                onClose={() => console.log('Popup closed')}
                anchor='top'
              >
                <div className='flex flex-col'>
                  <p>
                    📅 Date:
                    {sample.createdAt?.getDate()}/
                    {sample.createdAt?.getMonth() + 1}/
                    {sample.createdAt?.getFullYear()}
                  </p>
                  <p>🧪 Carbon: {sample.amount} kg</p>
                  <p>
                    🧭 Lat: {sample.position?.latitude.toFixed(2)} | Lon:{' '}
                    {sample.position?.longitude.toFixed(2)}
                  </p>
                </div>
              </Popup>
            )}
          </div>
        </Marker>
      ))}
    </Map>
  );
};

export default CustomMap;
