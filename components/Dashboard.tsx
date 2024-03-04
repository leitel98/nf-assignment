'use client';

import React, { useState } from 'react';
import CustomMap from './map/CustomMap';
import SampleForm from './forms/SampleForm';
import FertilizationForm from './forms/FertilizationForm';
import type { FeatureCollection } from 'geojson';
import SampleCard from './atoms/SampleCard';

const Dashboard = ({ samples }: { samples: any }) => {
  const [samplesData, setSamplesData] = useState(samples);
  const sampleMapData: FeatureCollection = {
    type: 'FeatureCollection',
    features: samplesData.map((sample: any) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [sample.position?.longitude, sample.position?.latitude],
      },
      properties: {
        prop0: `value${sample.id}`,
      },
    })),
  };

  return (
    <>
      <div className='grid grid-cols-3 gap-8 w-full'>
        <CustomMap sampleData={sampleMapData} />
        <section className='flex flex-col items-center gap-4 h-min w-full rounded-lg bg-teal-600/30 shadow-lg shadow-teal-900 p-4 pb-8'>
          <SampleForm setSamples={setSamplesData} />
          <FertilizationForm />
        </section>
      </div>
      <section className='grid grid-cols-2 gap-4 w-full bg-emerald-600/30 rounded-lg shadow-lg shadow-emerald-900 p-4'>
        <div className='flex flex-col w-full gap-2'>
          {samplesData.map((sample: any) => (
            <SampleCard
              sample={sample}
              key={sample.id}
              setSamples={setSamplesData}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
