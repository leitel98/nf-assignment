type CoordinateT = {
  latitude: number;
  longitude: number;
};

type SampleDataT = {
  date: Date;
  amount: number;
  position: CoordinateT;
};

type FertilizationDataT = {
  date: Date;
  amount: number;
  coordinates: CoordinateT[];
};

export type { CoordinateT, SampleDataT, FertilizationDataT };
