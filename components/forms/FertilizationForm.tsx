'use client';

import useFertilizationForm from '@/hooks/useFertilizationForm';
import { FertilizationT } from '@/types';
import { Dispatch, SetStateAction } from 'react';

const FertilizationForm = ({
  setFertilizations,
}: {
  setFertilizations: Dispatch<SetStateAction<FertilizationT[]>>;
}) => {
  const {
    fertilizationData,
    handleAmountChange,
    handleLatitudeChange,
    handleLongitudeChange,
    createFertilization,
  } = useFertilizationForm(setFertilizations);

  return (
    <>
      <h3 className='text-xl font-medium'>New fertilization</h3>
      <section className='w-full flex flex-col gap-4'>
        <div className='flex w-full items-center gap-4'>
          <p className='text-xl'>🌱</p>
          <input
            type='number'
            placeholder='Fertilizer Amount (kg)'
            value={fertilizationData.amount || ''}
            onChange={handleAmountChange}
            className='w-full focus:outline-none rounded-lg bg-slate-400 text-slate-900 placeholder-slate-700 px-4 py-2'
          />
        </div>
        {Array.from({ length: 4 }, (_, index) => (
          <div className='flex w-full items-center gap-4' key={index}>
            <p className='text-xl'>🧭</p>
            <input
              type='number'
              placeholder='Longitude'
              value={fertilizationData.position[index]?.longitude || ''}
              onChange={(e) => handleLongitudeChange(e, index)}
              className='w-full focus:outline-none rounded-lg bg-slate-400 text-slate-900 placeholder-slate-700 px-4 py-2'
            />
            <input
              type='number'
              placeholder='Latitude'
              value={fertilizationData.position[index]?.latitude || ''}
              onChange={(e) => handleLatitudeChange(e, index)}
              className='w-full focus:outline-none rounded-lg bg-slate-400 text-slate-900 placeholder-slate-700 px-4 py-2'
            />
          </div>
        ))}
      </section>
      <button
        onClick={() => createFertilization(fertilizationData)}
        className='rounded-lg px-4 py-2 bg-violet-700/30 border-b border-r border-violet-700 shadow-md shadow-violet-700 hover:scale-105 transition-none duration-75'
      >
        Send Fertilization
      </button>
    </>
  );
};

export default FertilizationForm;
