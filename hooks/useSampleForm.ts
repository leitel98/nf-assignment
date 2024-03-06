import { SampleDataT, SampleT } from '@/types';
import { ChangeEvent, useState } from 'react';

const INITIAL_FORM: SampleDataT = {
  date: new Date(),
  amount: '',
  position: {
    latitude: '',
    longitude: '',
  },
};

const useSampleForm = (setSamples: (prev: any) => void) => {
  const [sampleData, setSampleData] = useState<SampleDataT>(INITIAL_FORM);

  async function createSample(data: SampleDataT) {
    try {
      const response = await fetch('/api/submit-sample', {
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
      });

      if (response.ok) {
        const result = await response.json();
        const { newSample } = result;
        newSample.createdAt = new Date(newSample.createdAt);

        setSamples((prevSamples: SampleT[]) => {
          return [...prevSamples, newSample];
        });
        setSampleData(INITIAL_FORM);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleCarbonAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setSampleData((prev) => {
      const newAmount = parseFloat(e.target.value);
      return {
        ...prev,
        amount: isNaN(newAmount) ? 0 : newAmount,
      };
    });
  };

  const handleLongitude = (e: ChangeEvent<HTMLInputElement>) => {
    setSampleData((prev) => {
      const newAmount = parseFloat(e.target.value);
      return {
        ...prev,
        position: {
          ...prev.position,
          longitude: isNaN(newAmount) ? '' : newAmount,
        },
      };
    });
  };

  const handleLatitude = (e: ChangeEvent<HTMLInputElement>) => {
    setSampleData((prev) => {
      const newAmount = parseFloat(e.target.value);
      return {
        ...prev,
        position: {
          ...prev.position,
          latitude: newAmount,
        },
      };
    });
  };

  return {
    sampleData,
    createSample,
    handleCarbonAmount,
    handleLatitude,
    handleLongitude,
  };
};

export default useSampleForm;
