'use client';

import { useState } from 'react';

const FertilizationCard = ({
  fertilization,
  setFertilizations,
}: {
  fertilization: any;
  setFertilizations: (prev: any) => void;
}) => {
  const [editting, setEditting] = useState(false);
  const [data, setData] = useState({
    ...fertilization,
    date: fertilization.createdAt.getDate(),
    month: fertilization.createdAt.getMonth() + 1,
    year: fertilization.createdAt.getFullYear(),
  });

  const deleteFertilization = async (id: number) => {
    try {
      await fetch('/api/delete-fertilization', {
        body: JSON.stringify(id),
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
      });
      setFertilizations((prev: any) => {
        return prev.filter(
          (existingSample: any) => existingSample.id != fertilization.id
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateFertilization = async (data: { data: any }) => {
    try {
      const response = await fetch('/api/update-fertilization', {
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
      });
      if (response.ok) {
        const { updatedFertilization } = await response.json();
        console.log(updatedFertilization);
        setFertilizations((prev: any) => {
          return prev.map((existingSample: any) =>
            existingSample.id === updatedFertilization
            .id
              ? updatedFertilization

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
          <p className='whitespace-nowrap'>🌱Fertilization:</p>{' '}
          <input
            type='number'
            disabled={!editting}
            className={`w-10 rounded-md ml-2 ${
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
      <div className='grid grid-cols-2'>
        {data.position.map((coordinate: any, index: number) => {
          if (index !== fertilization.position.length - 1)
            return (
              <div className='flex' key={index}>
                <div className='flex items-center'>
                  <p className='whitespace-nowrap'>🧭 Lat:</p>
                  <input
                    disabled={!editting}
                    className={`w-20 rounded-md text-ellipsis ${
                      editting
                        ? 'bg-zinc-600 border border-zinc-900'
                        : 'bg-transparent'
                    }`}
                    value={coordinate[1]}
                    onChange={(e) => {
                      setData((prev: any) => ({
                        ...prev,
                        position: prev.position.map(
                          (coordinatex: any, idx: number) => {
                            if (index === idx) {
                              return [coordinatex[0], e.target.value];
                            } else {
                              return coordinatex;
                            }
                          }
                        ),
                      }));
                    }}
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
                    value={coordinate[0]}
                    onChange={(e) => {
                      setData((prev: any) => ({
                        ...prev,
                        position: prev.position.map(
                          (coordinatex: any, idx: number) => {
                            if (index === idx) {
                              return [coordinatex[1], e.target.value];
                            } else {
                              return coordinatex;
                            }
                          }
                        ),
                      }));
                    }}
                  />
                </div>
              </div>
            );
        })}
      </div>
      <div className='flex flex-col justify-between'>
        {!editting ? (
          <button onClick={() => setEditting(true)}>✏️</button>
        ) : (
          <button onClick={() => updateFertilization(data)}>💾</button>
        )}
        <button onClick={() => deleteFertilization(data.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default FertilizationCard;
