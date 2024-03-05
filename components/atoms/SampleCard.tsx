'use client';

import { useState } from 'react';

const SampleCard = ({
  sample,
  setSamples,
}: {
  sample: any;
  setSamples: (prev: any) => void;
}) => {
  const [editting, setEditting] = useState(false);
  const [data, setData] = useState(() => {
    const currentDate =
      sample?.createdAt instanceof Date ? sample.createdAt : null;

    return {
      ...sample,
      date: currentDate?.getDate(),
      month: currentDate?.getMonth() + 1,
      year: currentDate?.getFullYear(),
    };
  });

  const deleteSample = async (id: number) => {
    try {
      await fetch('/api/delete-sample', {
        body: JSON.stringify(id),
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
      });
      setSamples((prev: any) => {
        return prev.filter(
          (existingSample: any) => existingSample.id != sample.id
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateSample = async (data: { data: any }) => {
    try {
      const response = await fetch('/api/update-sample', {
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
      });

      if (response.ok) {
        const result = await response.json();
        const { updatedSample } = result;

        setSamples((prevSamples: any) => {
          return prevSamples.map((existingSample: any) =>
            existingSample.id === updatedSample.id
              ? updatedSample
              : existingSample
          );
        });

        setEditting(false);
      } else {
        console.error('Failed to update sample');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex items-center justify-between bg-teal-600/30 rounded-md px-4 py-2 border-b border-r border-teal-600'>
      <div className='flex items-center w-full gap-4'>
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
          <p className='whitespace-nowrap'>🧪Carbon:</p>
          <input
            type='number'
            disabled={!editting}
            className={`w-6 rounded-md text-center ${
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
        <div className='flex'>
          <div className='flex items-center'>
            <p className='whitespace-nowrap'>🧭 Lat:</p>
            <input
              type='number'
              disabled={!editting}
              className={`w-20 rounded-md text-ellipsis ${
                editting
                  ? 'bg-zinc-600 border border-zinc-900'
                  : 'bg-transparent'
              }`}
              value={data.position?.latitude}
              onChange={(e) =>
                setData((prev: any) => {
                  return {
                    ...prev,
                    position: { ...prev.position, latitude: e.target.value },
                  };
                })
              }
            />
          </div>
          |
          <div className='flex items-center ml-2'>
            <p className='whitespace-nowrap'>Lon:</p>
            <input
              disabled={!editting}
              className={`w-20 rounded-md text-ellipsis ${
                editting
                  ? 'bg-zinc-600 border border-zinc-900'
                  : 'bg-transparent'
              }`}
              value={data.position?.longitude}
              onChange={(e) =>
                setData((prev: any) => {
                  return {
                    ...prev,
                    position: { ...prev.position, longitude: e.target.value },
                  };
                })
              }
            />
          </div>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        {!editting ? (
          <button onClick={() => setEditting(true)}>✏️</button>
        ) : (
          <button onClick={() => updateSample(data)}>💾</button>
        )}
        <button onClick={() => deleteSample(data.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default SampleCard;
