import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  IndianRupee,
  Clock,
  Plus,
  Share2,
  Edit,
  Globe,
  Lock,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ItineraryTimeline } from '@/components/trips/ItineraryTimeline';
import { BudgetBreakdown } from '@/components/trips/BudgetBreakdown';
import { AddStopModal } from '@/components/trips/AddStopModal';
import { CreateTripModal } from '@/components/trips/CreateTripModal';
import { cn } from '@/lib/utils';
import { Trip, Stop } from '@/types/trip';
import { useToast } from '@/hooks/use-toast';

interface TripDetailsProps {
  trips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
}

const TripDetails = ({ trips, setTrips }: TripDetailsProps) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'itinerary' | 'budget' | 'share'>('itinerary');
  const [isAddStopModalOpen, setIsAddStopModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast } = useToast();

  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Trip not found
          </h1>
          <Link to="/my-trips">
            <Button>Back to My Trips</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleAddStop = (cityId: string, cityName: string, country: string, startDate: string, endDate: string) => {
    if (!trip) return;

    const newStop: Stop = {
      id: `stop-${Date.now()}`,
      cityId,
      cityName,
      country,
      startDate,
      endDate,
      activities: [],
    };

    const updatedTrips = trips.map(t =>
      t.id === trip.id ? { ...t, stops: [...t.stops, newStop] } : t
    );

    setTrips(updatedTrips);
    toast({
      title: "Stop added!",
      description: `${cityName} has been added to your itinerary.`,
    });
    setIsAddStopModalOpen(false);
  };

  const handleAddActivity = (stopId: string, activityName: string, cost: number, duration: number, category: string) => {
    if (!trip) return;

    const newActivity = {
      id: `activity-${Date.now()}`,
      name: activityName,
      cost,
      duration,
      category: category as any,
    };

    const updatedTrips = trips.map(t =>
      t.id === trip.id
        ? {
            ...t,
            stops: t.stops.map(s =>
              s.id === stopId
                ? { ...s, activities: [...s.activities, newActivity] }
                : s
            ),
          }
        : t
    );

    setTrips(updatedTrips);
    toast({
      title: "Activity added!",
      description: `${activityName} has been added.`,
    });
  };

  const handleUpdateTrip = (updatedTrip: Trip) => {
    const updatedTrips = trips.map(t =>
      t.id === updatedTrip.id ? updatedTrip : t
    );
    setTrips(updatedTrips);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-72 sm:h-96">
        {trip.coverImage ? (
          <img
            src={trip.coverImage}
            alt={trip.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-hero" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-24 left-4 sm:left-8">
          <Link to="/my-trips">
            <Button variant="heroOutline" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Trip Info */}
        <div className="absolute bottom-6 left-4 right-4 sm:left-8 sm:right-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 mb-2">
              {trip.isPublic ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-foreground/20 text-accent-foreground text-xs font-medium">
                  <Globe className="w-3 h-3" />
                  Public
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-foreground/20 text-accent-foreground text-xs font-medium">
                  <Lock className="w-3 h-3" />
                  Private
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-coral/80 text-accent-foreground text-xs font-medium capitalize">
                {trip.status}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-accent-foreground mb-2">
              {trip.name}
            </h1>
            {trip.description && (
              <p className="text-accent-foreground/80 text-lg max-w-2xl">
                {trip.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {formatDate(startDate)} - {formatDate(endDate)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{duration} days</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{trip.stops.length} stops</span>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {[
              { id: 'itinerary', label: 'Itinerary', icon: MapPin },
              { id: 'budget', label: 'Budget', icon: IndianRupee },
              { id: 'share', label: 'Share', icon: Share2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 border-b-2 -mb-px text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'itinerary' && (
            <div className="max-w-4xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Your Itinerary
                </h2>
                <Button size="sm" onClick={() => setIsAddStopModalOpen(true)}>
                  <Plus className="w-4 h-4" />
                  Add Stop
                </Button>
              </div>
              <ItineraryTimeline 
                stops={trip.stops} 
                onAddActivity={handleAddActivity}
                onAddStop={() => setIsAddStopModalOpen(true)}
              />
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="max-w-4xl">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                Budget Overview
              </h2>
              <BudgetBreakdown stops={trip.stops} />
            </div>
          )}

          {activeTab === 'share' && (
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                Share Your Trip
              </h2>
              <p className="text-muted-foreground mb-6">
                Make your itinerary public and inspire other travelers
              </p>
              <div className="bg-card rounded-xl p-6 border border-border mb-6">
                <p className="text-sm text-muted-foreground mb-2">Share link:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://globetrotter.app/trip/${trip.id}`}
                    className="flex-1 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm"
                  />
                  <Button>Copy</Button>
                </div>
              </div>
              <Button variant="accent">
                <Globe className="w-4 h-4" />
                Make Trip Public
              </Button>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />

      <AddStopModal
        isOpen={isAddStopModalOpen}
        onClose={() => setIsAddStopModalOpen(false)}
        onAdd={handleAddStop}
        tripStartDate={trip.startDate}
        tripEndDate={trip.endDate}
      />

      <CreateTripModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onCreateTrip={() => {}}
        onUpdateTrip={handleUpdateTrip}
        editingTrip={trip}
      />
    </main>
  );
};

export default TripDetails;
