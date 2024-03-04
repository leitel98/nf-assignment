import { prisma } from '../lib/prisma';
import { SampleT } from '@/types';
import Dashboard from '@/components/Dashboard';

export default async function Home() {
  const samples: SampleT[] = await prisma.sample.findMany();

  return <Dashboard samples={samples} />;
}
