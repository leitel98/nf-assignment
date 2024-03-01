'use client';

import type { FeatureCollection } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import CustomMap from '@/components/map/CustomMap';

export type Coordinate = {
  latitude: number;
  longitude: number;
};

type FertilizationData = {
  date: Date;
  amount: number;
  coordinate: Coordinate;
};

export default function Home() {
  const [fertilizationData, setFertilizationData] = useState<FertilizationData>(
    {
      date: new Date(),
      amount: 0,
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
    }
  );

  const sampleData: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-70.681468, -33.2502335] },
        properties: {
          prop0: 'value0',
        },
      },
    ],
  };

  console.log(fertilizationData);

  return (
    <main className='flex min-h-screen flex-col items-center gap-8 p-8'>
      <div className='flex flex-col gap-2 items-center'>
        <h1 className='text-5xl font-bold text-teal-300'>⛰️Soiler</h1>
        <h2 className='text-2xl font-semibold text-teal-600'>
          Your soil data saver
        </h2>
      </div>
      <div className='grid grid-cols-3 gap-8 w-full'>
        <CustomMap sampleData={sampleData} />
        <section className='flex flex-col items-center gap-4 h-min w-full rounded-lg bg-teal-600/30 shadow-lg shadow-teal-900 p-4 pb-8'>
          <h3 className='text-xl font-medium'>Sample</h3>
          <section className='w-full flex flex-col gap-4'>
            <div className='flex w-full items-center gap-4'>
              <p className='text-xl'>🧪</p>
              <input
                type='number'
                placeholder='Average Carbon %'
                value={
                  fertilizationData.amount === 0
                    ? undefined
                    : fertilizationData.amount
                }
                onChange={(e) =>
                  setFertilizationData((prev) => {
                    const newAmount = parseFloat(e.target.value);
                    return {
                      ...prev,
                      amount: isNaN(newAmount) ? 0 : newAmount,
                    };
                  })
                }
                className='w-full focus:outline-none rounded-lg bg-slate-400 text-slate-900 placeholder-slate-700 px-4 py-2'
              />
            </div>
            <div className='flex w-full items-center gap-4'>
              <p className='text-xl'>🧭</p>
              <input
                type='number'
                placeholder='Longitude'
                className='w-full focus:outline-none rounded-lg bg-slate-400 text-slate-900 placeholder-slate-700 px-4 py-2'
              />
              <input
                type='number'
                placeholder='Latitude'
                className='w-full focus:outline-none rounded-lg bg-slate-400 text-slate-900 placeholder-slate-700 px-4 py-2'
              />
            </div>
          </section>
          <h3 className='text-xl font-medium'>Fertilization</h3>
          <section className='w-full flex flex-col gap-4'>
            <div className='flex w-full items-center gap-4'>
              <p className='text-xl'>🌱</p>
              <input
                type='number'
                placeholder='Fertilizer Amount (kg)'
                className='w-full focus:outline-none rounded-lg bg-slate-400 text-slate-900 placeholder-slate-700 px-4 py-2'
              />
            </div>
            <div className='flex w-full items-center gap-4'>
              <p className='text-xl'>🧭</p>
              <input
                type='number'
                placeholder='Longitude'
                className='w-full focus:outline-none rounded-lg bg-slate-400 text-slate-900 placeholder-slate-700 px-4 py-2'
              />
              <input
                type='number'
                placeholder='Latitude'
                className='w-full focus:outline-none rounded-lg bg-slate-400 text-slate-900 placeholder-slate-700 px-4 py-2'
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
