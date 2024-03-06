import { FertilizationDataT } from '@/types';
import React, { ChangeEvent, useState } from 'react';

const INITIAL_FERTILIZATION_FORM: FertilizationDataT = {
  date: new Date(),
  amount: '',
  position: [],
};

const useFertilizationForm = (setFertilizations: (prev: any) => void) => {
  const [fertilizationData, setFertilizationData] = useState(
    INITIAL_FERTILIZATION_FORM
  );

  async function createFertilization(data: FertilizationDataT) {
    try {
      const response = await fetch('/api/submit-fertilization', {
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
      });

      if (response.ok) {
        const result = await response.json();
        const { newFertilization } = result;

        const modPosition = newFertilization.position.map((coord: any) => [
          coord.longitude,
          coord.latitude,
        ]);
        modPosition.push(modPosition[0]);

        const reformattedFertilization = {
          ...newFertilization,
          position: modPosition,
          createdAt: new Date(newFertilization.createdAt),
        };

        setFertilizations((prev: any) => {
          return [...prev, reformattedFertilization];
        });
        setFertilizationData(INITIAL_FERTILIZATION_FORM);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFertilizationData((prev) => {
      return {
        ...prev,
        amount: parseInt(e.target.value),
      };
    });
  };

  const handleLongitudeChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setFertilizationData((prev) => {
      const newPosition = [...prev.position];
      newPosition[index] = {
        ...newPosition[index],
        longitude: parseFloat(e.target.value),
      };
      return { ...prev, position: newPosition };
    });
  };

  const handleLatitudeChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setFertilizationData((prev) => {
      const newPosition = [...prev.position];
      newPosition[index] = {
        ...newPosition[index],
        latitude: parseFloat(e.target.value),
      };
      return { ...prev, position: newPosition };
    });
  };
  return {
    fertilizationData,
    handleAmountChange,
    handleLatitudeChange,
    handleLongitudeChange,
    createFertilization,
  };
};

export default useFertilizationForm;
