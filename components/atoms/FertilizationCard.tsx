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
  const [data, setData] = useState(() => {
    const currentDate =
      fertilization.createdAt instanceof Date ? fertilization.createdAt : null;

    return {
      ...fertilization,
      date: currentDate?.getDate(),
      month: currentDate?.getMonth() + 1,
      year: currentDate?.getFullYear(),
    };
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
        const result = await response.json();
        const { updatedFertilization } = result;
        const modPosition = updatedFertilization.position.map((coord: any) => [
          coord.longitude,
          coord.latitude,
        ]);
        modPosition.push(modPosition[0]);
        const reformattedFertilization = {
          ...updatedFertilization,
          position: modPosition,
        };

        setFertilizations((prev: any) => {
          return prev.map((existingFertilization: any) =>
            existingFertilization.id === reformattedFertilization.id
              ? reformattedFertilization
              : existingFertilization
          );
        });
        setEditting(false);
      } else {
        console.error('Failed to update fertilization');
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
              <div
                className='flex p-2 m-1 bg-violet-600/25 rounded-md border border-violet-900'
                key={index}
              >
                <div className='flex items-center'>
                  <p className='whitespace-nowrap'>#{index + 1} 🧭 Lat:</p>
                  <input
                    disabled={!editting}
                    className={`w-16 rounded-md text-ellipsis ${
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
                    className={`w-16 rounded-md text-ellipsis ${
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
                              return [e.target.value, coordinatex[1]];
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
