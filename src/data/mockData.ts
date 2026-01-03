import { Trip, City } from '@/types/trip';
import kyotoImg from '@/assets/destination-kyoto.jpg';
import parisImg from '@/assets/destination-paris.jpg';
import baliImg from '@/assets/destination-bali.jpg';

export const mockCities: City[] = [
  {
    id: 'chennai',
    name: 'Chennai',
    country: 'Tamil Nadu, India',
    image: parisImg,
    costIndex: 'moderate',
    description: 'The cultural capital of Tamil Nadu, known for its beaches, temples, and delicious South Indian cuisine',
    popularActivities: ['Marina Beach', 'Kapaleeshwarar Temple', 'Local Food Tour', 'Fort St. George'],
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    country: 'Tamil Nadu, India',
    image: kyotoImg,
    costIndex: 'budget',
    description: 'Gateway to the Nilgiris, famous for temples, textile industry, and proximity to hill stations',
    popularActivities: ['Temple Visit', 'Textile Shopping', 'Marudhamalai Temple', 'Local Cuisine'],
  },
  {
    id: 'madurai',
    name: 'Madurai',
    country: 'Tamil Nadu, India',
    image: baliImg,
    costIndex: 'budget',
    description: 'Ancient temple city with rich history, home to the magnificent Meenakshi Amman Temple',
    popularActivities: ['Meenakshi Temple', 'Thirumalai Nayakkar Palace', 'Local Market', 'Temple Festival'],
  },
  {
    id: 'trichy',
    name: 'Trichy',
    country: 'Tamil Nadu, India',
    image: parisImg,
    costIndex: 'budget',
    description: 'Historic city on the banks of Kaveri, known for the iconic Rock Fort and ancient temples',
    popularActivities: ['Rock Fort Temple', 'Srirangam Temple', 'Local Food Tour', 'Heritage Walk'],
  },
  {
    id: 'ooty',
    name: 'Ooty',
    country: 'Tamil Nadu, India',
    image: kyotoImg,
    costIndex: 'moderate',
    description: 'Queen of Hill Stations, famous for tea gardens, scenic beauty, and pleasant weather',
    popularActivities: ['Tea Garden Tour', 'Botanical Gardens', 'Hill Station Sightseeing', 'Toy Train Ride'],
  },
];

export const mockTrips: Trip[] = [];
