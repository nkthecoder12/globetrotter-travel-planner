import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, MapPin, TrendingUp, Clock, Wallet } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { TripCard } from '@/components/trips/TripCard';
import { CreateTripModal } from '@/components/trips/CreateTripModal';
import { mockCities } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Trip } from '@/types/trip';

interface DashboardProps {
  trips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
}

const Dashboard = ({ trips, setTrips }: DashboardProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const upcomingTrips = trips.filter(t => t.status === 'upcoming' || t.status === 'planning');
  const totalDays = trips.reduce((acc, trip) => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    return acc + Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }, 0);

  const handleCreateTrip = (newTrip: Trip) => {
    setTrips([...trips, newTrip]);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Welcome back, Traveler!
            </h1>
            <p className="text-muted-foreground text-lg">
              Ready to plan your next adventure?
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
          >
            {[
              { icon: Calendar, label: 'Upcoming Trips', value: upcomingTrips.length, color: 'bg-primary' },
              { icon: MapPin, label: 'Cities Explored', value: '12', color: 'bg-ocean' },
              { icon: Clock, label: 'Days Planned', value: totalDays, color: 'bg-forest' },
              { icon: Wallet, label: 'Total Budget', value: '₹34,000', color: 'bg-coral' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl p-5 shadow-sm border border-border"
              >
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="font-display text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Trips Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-semibold text-foreground">
                    Your Trips
                  </h2>
                  <Button onClick={() => setIsCreateModalOpen(true)} size="sm">
                    <Plus className="w-4 h-4" />
                    New Trip
                  </Button>
                </div>

                {trips.length > 0 ? (
                  <div className="space-y-4">
                    {trips.map((trip) => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card rounded-xl p-10 text-center border border-border">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      No trips yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Start planning your first adventure!
                    </p>
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                      <Plus className="w-4 h-4" />
                      Create Your First Trip
                    </Button>
                  </div>
                )}

                <Link to="/my-trips" className="block mt-4">
                  <Button variant="ghost" className="w-full">
                    View All Trips
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recommended Destinations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl p-5 shadow-sm border border-border"
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-coral" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Trending Now
                  </h3>
                </div>
                <div className="space-y-3">
                  {mockCities.map((city) => (
                    <Link
                      key={city.id}
                      to={`/explore/${city.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors group"
                    >
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                          {city.name}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {city.country}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-hero rounded-xl p-6 text-accent-foreground"
              >
                <h3 className="font-display text-lg font-semibold mb-2">
                  Need Inspiration?
                </h3>
                <p className="text-sm opacity-80 mb-4">
                  Explore curated itineraries from fellow travelers
                </p>
                <Link to="/explore">
                  <Button
                    variant="heroOutline"
                    size="sm"
                    className="w-full"
                  >
                    Browse Public Trips
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <CreateTripModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTrip={handleCreateTrip}
      />
    </main>
  );
};

export default Dashboard;
