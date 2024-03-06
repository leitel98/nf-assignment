import { prisma } from '../lib/prisma';
import { FertilizationT, SampleT } from '@/types';
import Dashboard from '@/components/Dashboard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const samples: SampleT[] = await prisma.sample.findMany();

  const fertilizations: FertilizationT[] =
    await prisma.fertilization.findMany();

  const formattedFertilizations = fertilizations.map((item: FertilizationT) => {
    const modifiedPosition = item.position.map((coord: any) => [
      coord.longitude,
      coord.latitude,
    ]);
    modifiedPosition.push(modifiedPosition[0]);
    return {
      ...item,
      position: modifiedPosition,
    };
  });

  return (
    <Dashboard samples={samples} fertilizations={formattedFertilizations} />
  );
}
