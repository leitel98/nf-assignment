'use client';

import { useState } from 'react';

const FertilizationCard = ({ fertilization }: { fertilization: any }) => {
  const [editting, setEditting] = useState(false);
  const [data, setData] = useState({
    ...fertilization,
    date: fertilization.createdAt.getDate(),
    month: fertilization.createdAt.getMonth() + 1,
    year: fertilization.createdAt.getFullYear(),
  });

  return (
    <div className='flex items-center justify-between bg-teal-600/30 rounded-md px-4 py-2 border-b border-r border-teal-600'>
      <div className='flex flex-col justify-between'>
        <div className='flex'>
          📅
          <input
            disabled={!editting}
            type='number'
            className={`w-6 rounded-md ${
              editting
                ? '!bg-zinc-600 border border-zinc-900'
                : 'bg-transparent'
            }`}
            max={31}
            value={data.date}
            onChange={(e) =>
              setData((prev: any) => {
                return {
                  ...prev,
                  date: e.target.value,
                };
              })
            }
          />
          /
          <input
            disabled={!editting}
            type='number'
            className={`w-6 rounded-md ${
              editting ? 'bg-zinc-600 border border-zinc-900' : 'bg-transparent'
            }`}
            value={data.month}
            max={12}
            onChange={(e) =>
              setData((prev: any) => {
                return {
                  ...prev,
                  month: e.target.value,
                };
              })
            }
          />
          /
          <input
            disabled={!editting}
            type='number'
            className={`w-10 rounded-md ${
              editting ? 'bg-zinc-600 border border-zinc-900' : 'bg-transparent'
            }`}
            value={data.year}
            onChange={(e) =>
              setData((prev: any) => {
                return {
                  ...prev,
                  year: e.target.value,
                };
              })
            }
          />
        </div>
        <div className='flex items-center'>
          <p className='whitespace-nowrap'>🌱Fertilization:</p>
          <input
            type='number'
            disabled={!editting}
            className={`w-10 rounded-md ${
              editting ? 'bg-zinc-600 border border-zinc-900' : 'bg-transparent'
            } `}
            value={data.amount}
            onChange={(e) =>
              setData((prev: any) => {
                return {
                  ...prev,
                  amount: e.target.value,
                };
              })
            }
          />{' '}
          kg
        </div>
      </div>
    </div>
  );
};

export default FertilizationCard;
