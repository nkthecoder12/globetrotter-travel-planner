import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, IndianRupee, Star, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockCities } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Trip, Stop } from '@/types/trip';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const costLabels = {
  budget: { label: 'Budget', color: 'bg-forest text-accent-foreground' },
  moderate: { label: 'Moderate', color: 'bg-ocean text-accent-foreground' },
  expensive: { label: 'Luxury', color: 'bg-coral text-accent-foreground' },
};

interface ExploreProps {
  trips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
}

const Explore = ({ trips, setTrips }: ExploreProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredCities = mockCities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToTrip = (cityId: string) => {
    const city = mockCities.find(c => c.id === cityId);
    if (!city) return;

    const planningTrips = trips.filter(t => t.status === 'planning');
    if (planningTrips.length === 0) {
      toast({
        title: "No trip found",
        description: "Create a trip first to add destinations.",
        variant: "destructive",
      });
      return;
    }

    const targetTrip = planningTrips[0];
    const newStop: Stop = {
      id: `stop-${Date.now()}`,
      cityId: city.id,
      cityName: city.name,
      country: city.country,
      startDate: targetTrip.startDate,
      endDate: targetTrip.endDate,
      activities: [],
    };

    const updatedTrips = trips.map(trip =>
      trip.id === targetTrip.id
        ? { ...trip, stops: [...trip.stops, newStop] }
        : trip
    );

    setTrips(updatedTrips);
    toast({
      title: "City added!",
      description: `${city.name} has been added to ${targetTrip.name}.`,
    });
    navigate(`/trip/${targetTrip.id}`);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Explore Destinations
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Discover incredible places around the world and find your next adventure
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search cities, countries, or activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base rounded-xl shadow-sm"
              />
            </div>
          </motion.div>

          {/* Region Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {['all', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedRegion === region
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                )}
              >
                {region === 'all' ? 'All Regions' : region}
              </button>
            ))}
          </motion.div>

          {/* Cities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city, index) => (
              <motion.article
                key={city.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={city.image}
                    alt={`${city.name}, ${city.country}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                  
                  {/* Cost Badge */}
                  <div className={cn(
                    "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                    costLabels[city.costIndex].color
                  )}>
                    <IndianRupee className="w-3 h-3" />
                    {costLabels[city.costIndex].label}
                  </div>

                  {/* City Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 text-gold mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                      <span className="text-xs text-accent-foreground/80 ml-1">4.8</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-accent-foreground">
                      {city.name}
                    </h3>
                    <div className="flex items-center gap-1 text-accent-foreground/80 text-sm">
                      <MapPin className="w-3 h-3" />
                      {city.country}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {city.description}
                  </p>

                  {/* Popular Activities */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                      Popular Activities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {city.popularActivities.slice(0, 3).map((activity) => (
                        <span
                          key={activity}
                          className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    variant="outline" 
                    className="w-full group/btn"
                    onClick={() => handleAddToTrip(city.id)}
                  >
                    Add to Trip
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button variant="secondary" size="lg">
              Load More Destinations
            </Button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Explore;
