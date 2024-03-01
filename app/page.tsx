import CustomMap from '@/components/map/CustomMap';
import SampleForm from '@/components/forms/SampleForm';
import FertilizationForm from '@/components/forms/FertilizationForm';
import type { FeatureCollection } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Home() {
  const sampleData: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-70.681468, -33.2502335] },
        properties: {
          prop0: 'value0',
        },
      },
    ],
  };

  return (
    <div className='grid grid-cols-3 gap-8 w-full'>
      <CustomMap sampleData={sampleData} />
      <section className='flex flex-col items-center gap-4 h-min w-full rounded-lg bg-teal-600/30 shadow-lg shadow-teal-900 p-4 pb-8'>
        <SampleForm />
        <FertilizationForm />
      </section>
    </div>
  );
}
