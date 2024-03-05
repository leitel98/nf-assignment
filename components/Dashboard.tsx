'use client';

import React, { useState } from 'react';
import CustomMap from './map/CustomMap';
import SampleForm from './forms/SampleForm';
import FertilizationForm from './forms/FertilizationForm';
import SampleCard from './atoms/SampleCard';
import { FertilizationT, SampleT } from '@/types';
import FertilizationCard from './atoms/FertilizationCard';

interface DashboardI {
  samples: SampleT[];
  fertilizations: FertilizationT[];
}

const Dashboard = ({ samples, fertilizations }: DashboardI) => {
  const [samplesData, setSamplesData] = useState(samples);
  const [fertilizationsData, setFertilizationsData] = useState(fertilizations);
  console.log(fertilizationsData)

  return (
    <>
      <div className='grid grid-cols-3 gap-8 w-full'>
        <CustomMap
          sampleData={samplesData}
          fertilizationData={fertilizationsData}
        />
        <section className='flex flex-col items-center gap-4 h-min w-full rounded-lg bg-teal-600/30 shadow-lg shadow-teal-900 p-4 pb-8'>
          <SampleForm setSamples={setSamplesData} />
          <FertilizationForm />
        </section>
      </div>
      <section className='flex gap-4 w-full bg-emerald-600/30 rounded-lg shadow-lg shadow-emerald-900 p-4'>
        <div className='flex flex-col w-[75%] gap-2'>
          <h3 className='text-center text-xl font-medium'>Samples</h3>
          {samplesData.map((sample: any) => (
            <SampleCard
              sample={sample}
              key={sample.id}
              setSamples={setSamplesData}
            />
          ))}
        </div>
        <div className='flex flex-col w-full gap-2'>
          <h3 className='text-center text-xl font-medium'>Fertilizations</h3>
          {fertilizationsData.map((fertilization) => (
            <FertilizationCard
              setFertilizations={setFertilizationsData}
              fertilization={fertilization}
              key={fertilization.id}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
