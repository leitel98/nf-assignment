'use client';

import { useState } from 'react';
import { FertilizationDataT } from '@/types';

const FertilizationForm = () => {
  const [sampleData, setSampleData] = useState<FertilizationDataT>({
    date: new Date(),
    amount: 0,
    coordinates: [],
  });

  return (
    <>
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
    </>
  );
};

export default FertilizationForm;
