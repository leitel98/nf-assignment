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
  position: JsonValue;
};

type FertilizationT = {
  id: number;
  createdAt: Date;
  amount: number;
  position: JsonValue[];
};

type FertilizationDataT = {
  date: Date;
  amount: number | '';
  position: CoordinateT[] | [];
};

export type {
  CoordinateT,
  SampleDataT,
  FertilizationDataT,
  SampleT,
  FertilizationT,
};
