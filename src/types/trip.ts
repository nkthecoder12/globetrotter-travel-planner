export interface Activity {
  id: string;
  name: string;
  description?: string;
  duration: number; // in hours
  cost: number;
  category: 'sightseeing' | 'food' | 'adventure' | 'culture' | 'relaxation' | 'shopping';
  time?: string;
}

export interface Stop {
  id: string;
  cityId: string;
  cityName: string;
  country: string;
  startDate: string;
  endDate: string;
  activities: Activity[];
  accommodation?: {
    name: string;
    cost: number;
  };
  transport?: {
    type: 'flight' | 'train' | 'bus' | 'car';
    cost: number;
  };
}

export interface Trip {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  startDate: string;
  endDate: string;
  stops: Stop[];
  totalBudget?: number;
  status: 'planning' | 'upcoming' | 'ongoing' | 'completed';
  isPublic: boolean;
  createdAt: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  image: string;
  costIndex: 'budget' | 'moderate' | 'expensive';
  description: string;
  popularActivities: string[];
}

export interface BudgetBreakdown {
  accommodation: number;
  transport: number;
  activities: number;
  food: number;
  total: number;
}
