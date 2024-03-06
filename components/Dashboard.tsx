'use client';

import React, { useState } from 'react';
import CustomMap from './map/CustomMap';
import SampleForm from './forms/SampleForm';
import FertilizationForm from './forms/FertilizationForm';
import SampleCard from './atoms/SampleCard';
import { FertilizationT, SampleT } from '@/types';
import FertilizationCard from './atoms/FertilizationCard';
import Graphics from './Graphics';

interface DashboardI {
  samples: SampleT[];
  fertilizations: FertilizationT[];
}

export interface DisplayItem {
  tag: string;
  show: boolean;
}

const DISPLAY: Record<string, DisplayItem> = {
  samples: { tag: 'samples', show: true },
  fertilizations: { tag: 'fertilizations', show: true },
};

const Dashboard = ({ samples, fertilizations }: DashboardI) => {
  const [samplesData, setSamplesData] = useState(samples);
  const [fertilizationsData, setFertilizationsData] = useState(fertilizations);
  const [display, setDisplay] = useState(DISPLAY);

  const toggleDisplay = (key: string) => {
    setDisplay((prevDisplay) => ({
      ...prevDisplay,
      [key]: {
        ...prevDisplay[key],
        show: !prevDisplay[key].show,
      },
    }));
  };

  return (
    <>
      <div className='flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8 w-full'>
        <CustomMap
          sampleData={samplesData}
          fertilizationData={fertilizationsData}
          display={display}
        />
        <div className='flex flex-col w-full gap-8'>
          <div className='p-4 rounded-lg bg-emerald-600/30 flex items-center justify-around w-full  shadow-md shadow-emerald-600/50'>
            {Object.entries(display).map(([key, type], idx) => (
              <button
                key={idx}
                onClick={() => toggleDisplay(key)}
                className={`capitalize text-xl font-medium px-4 py-2 rounded-md hover:scale-105 transition-all duration-100 ${
                  type.show
                    ? 'bg-violet-600/50 border border-violet-600 shadow-md shadow-violet-600/30'
                    : 'bg-zinc-400/10'
                }`}
              >
                {type.tag}
              </button>
            ))}
          </div>
          <section className='flex flex-col items-center gap-4 h-min w-full rounded-lg bg-teal-600/30 shadow-lg shadow-teal-900 p-4 pb-8'>
            <SampleForm setSamples={setSamplesData} />
            <FertilizationForm setFertilizations={setFertilizationsData} />
          </section>
        </div>
      </div>
      <section className='flex flex-col lg:flex-row gap-4 w-full bg-emerald-600/30 rounded-lg shadow-lg shadow-emerald-900 p-4 h-[1000px] lg:h-[500px] overflow-y-scroll'>
        <div className='flex flex-col w-full lg:w-[65%] gap-2'>
          <h3 className='text-center text-xl font-medium'>Samples</h3>
          {samplesData.map((sample) => (
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
      <Graphics
        samplesData={samplesData}
        fertilzationsData={fertilizationsData}
      />
    </>
  );
};

export default Dashboard;
