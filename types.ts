import { JsonValue } from '@prisma/client/runtime/library';

type CoordinateT = {
  latitude: number | '';
  longitude: number | '';
};

type SampleDataT = {
  date: Date;
  amount: number | '';
  position: CoordinateT;
};

type SampleT = {
  id: number;
  createdAt: Date;
  amount: number;
  position: JsonValue
};

type FertilizationDataT = {
  date: Date;
  amount: number | '';
  coordinates: CoordinateT[];
};

export type { CoordinateT, SampleDataT, FertilizationDataT, SampleT };
