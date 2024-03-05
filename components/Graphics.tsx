'use client';
import { MONTHS } from '@/constants';
import { SampleT } from '@/types';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);

const Graphics = ({
  samplesData,
  fertilzationsData,
}: {
  samplesData: any;
  fertilzationsData: any;
}) => {
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());

  const filteredSamples = samplesData.filter(
    (data: SampleT) => data.createdAt.getFullYear() === activeYear
  );
  const samplesMonthlyAmounts = Array.from({ length: 12 }, () => 0);
  filteredSamples.forEach((data: SampleT) => {
    const monthIndex = new Date(data.createdAt).getMonth();
    samplesMonthlyAmounts[monthIndex] += data.amount;
  });

  const data = {
    labels: MONTHS,
    datasets: [
      {
        label: 'Samples',
        data: samplesMonthlyAmounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='flex flex-col w-full gap-4 items-center'>
      <div className='flex items-center gap-2'>
        <button
          className='text-xl'
          onClick={() => setActiveYear((prev) => prev - 1)}
        >
          ⬅️
        </button>
        <h2 className='text-3xl font-bold'>{activeYear}</h2>
        <button
          className='text-xl'
          onClick={() => setActiveYear((prev) => prev + 1)}
        >
          ➡️
        </button>
      </div>
      <div className='grid grid-cols-2 gap-8 w-full h-full'>
        <div className='p-4 bg-zinc-900/10 rounded-lg border border-zinc-600/60 w-full'>
          <Bar data={data} />
        </div>
        <div className='p-4 bg-zinc-900/10 rounded-lg border border-zinc-600/60 w-full'>
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
};

export default Graphics;
