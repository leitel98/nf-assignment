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

const SampleForm = () => {
  const [sampleData, setSampleData] = useState<SampleDataT>(INITIAL_FORM);
  console.log(sampleData);
  async function createSample(data: SampleDataT) {
    try {
      fetch('/api/submit-sample', {
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
      }).then(() => setSampleData(INITIAL_FORM));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <h3 className='text-xl font-medium'>Sample</h3>
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
        className='rounded-lg px-4 py-2 bg-violet-700/30'
      >
        Send Sample
      </button>
    </>
  );
};

export default SampleForm;
