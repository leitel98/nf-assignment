'use client';

import { useState } from 'react';
import { SampleDataT } from '@/types';

const SampleForm = () => {
  const [sampleData, setSampleData] = useState<SampleDataT>({
    date: new Date(),
    amount: 0,
    position: {
      latitude: 0,
      longitude: 0,
    },
  });
  console.log(sampleData);
  return (
    <>
      <h3 className='text-xl font-medium'>Sample</h3>
      <section className='w-full flex flex-col gap-4'>
        <div className='flex w-full items-center gap-4'>
          <p className='text-xl'>🧪</p>
          <input
            type='number'
            placeholder='Average Carbon %'
            value={sampleData.amount === 0 ? undefined : sampleData.amount}
            onChange={(e) =>
              setSampleData((prev) => {
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
            value={
              sampleData.position.longitude === 0
                ? undefined
                : sampleData.position.longitude
            }
            onChange={(e) =>
              setSampleData((prev) => {
                const newAmount = parseFloat(e.target.value);
                return {
                  ...prev,
                  position: {
                    ...prev.position,
                    longitude: isNaN(newAmount) ? 0 : newAmount,
                  },
                };
              })
            }
            className='w-full focus:outline-none rounded-lg bg-slate-400 text-slate-900 placeholder-slate-700 px-4 py-2'
          />
          <input
            type='number'
            placeholder='Latitude'
            value={
              sampleData.position.latitude === 0
                ? undefined
                : sampleData.position.latitude
            }
            onChange={(e) =>
              setSampleData((prev) => {
                const newAmount = parseFloat(e.target.value);
                return {
                  ...prev,
                  position: {
                    ...prev.position,
                    latitude: isNaN(newAmount) ? 0 : newAmount,
                  },
                };
              })
            }
            className='w-full focus:outline-none rounded-lg bg-slate-400 text-slate-900 placeholder-slate-700 px-4 py-2'
          />
        </div>
      </section>
    </>
  );
};

export default SampleForm;
