export enum ABCClass {
  A = 'A',
  B = 'B',
  C = 'C',
}

export enum XYZClass {
  X = 'X', // Stable
  Y = 'Y', // Variable
  Z = 'Z', // Volatile
}

export interface SKU {
  id: string;
  name: string;
  category: string;
  abc: ABCClass;
  xyz: XYZClass;
  stockLevel: number;
  safetyStock: number;
  rop: number; // Reorder Point
  leadTime: number; // Days
  serviceLevelTarget: number; // 0.95, 0.99 etc
  cost: number;
  lifecycleStatus: 'New' | 'Mature' | 'End of Life';
  forecast: number[]; // Next 6 months
  history: number[]; // Past 6 months
  alerts: string[];
}

export interface ForecastDataPoint {
  month: string;
  history: number | null;
  forecastStat: number | null;
  forecastAI: number | null;
  cleanedHistory: number | null;
}
