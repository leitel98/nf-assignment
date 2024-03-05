'use client';

import { useState } from 'react';
import { SampleDataT } from '@/types';

const INITIAL_FORM: SampleDataT = {
  date: new Date(),
  amount: '',
  position: {
    latitude: '',
    longitude: '',
  },
};

const SampleForm = ({ setSamples }: { setSamples: (prev: any) => void }) => {
  const [sampleData, setSampleData] = useState<SampleDataT>(INITIAL_FORM);

  async function createSample(data: SampleDataT) {
    try {
      await fetch('/api/submit-sample', {
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
      });

      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h3 className='text-xl font-medium'>New sample</h3>
      <section className='w-full flex flex-col gap-4'>
        <div className='flex w-full items-center gap-4'>
          <p className='text-xl'>🧪</p>
          <input
            type='number'
            placeholder='Average Carbon %'
            value={sampleData.amount}
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
            value={sampleData.position.longitude}
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
            value={sampleData.position.latitude}
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
      <button
        onClick={() => createSample(sampleData)}
        className='rounded-lg px-4 py-2 bg-violet-700/30 border-b border-r border-violet-700 shadow-md shadow-violet-700 hover:scale-105 transition-none duration-75'
      >
        Send Sample
      </button>
    </>
  );
};

export default SampleForm;
