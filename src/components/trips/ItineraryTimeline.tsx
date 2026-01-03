import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, IndianRupee, Plane, Train, Bus, Car, Plus, GripVertical } from 'lucide-react';
import { Stop, Activity } from '@/types/trip';
import { Button } from '@/components/ui/button';
import { AddActivityModal } from '@/components/trips/AddActivityModal';
import { cn } from '@/lib/utils';

interface ItineraryTimelineProps {
  stops: Stop[];
  onAddActivity: (stopId: string, name: string, cost: number, duration: number, category: string) => void;
  onAddStop: () => void;
}

const transportIcons = {
  flight: Plane,
  train: Train,
  bus: Bus,
  car: Car,
};

const categoryColors = {
  sightseeing: 'bg-ocean text-accent-foreground',
  food: 'bg-coral text-accent-foreground',
  adventure: 'bg-forest text-accent-foreground',
  culture: 'bg-primary text-primary-foreground',
  relaxation: 'bg-gold text-foreground',
  shopping: 'bg-muted text-muted-foreground',
};

export function ItineraryTimeline({ stops, onAddActivity, onAddStop }: ItineraryTimelineProps) {
  const [activeActivityModal, setActiveActivityModal] = useState<string | null>(null);

  if (stops.length === 0) {
    return (
      <div className="bg-card rounded-xl p-10 text-center border border-border">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          No stops yet
        </h3>
        <p className="text-muted-foreground mb-6">
          Start building your itinerary by adding your first destination
        </p>
        <Button onClick={onAddStop}>
          <Plus className="w-4 h-4" />
          Add First Stop
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {stops.map((stop, stopIndex) => {
        const startDate = new Date(stop.startDate);
        const endDate = new Date(stop.endDate);
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

        return (
          <motion.div
            key={stop.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: stopIndex * 0.1 }}
            className="relative"
          >
            {/* Connection Line */}
            {stopIndex < stops.length - 1 && (
              <div className="absolute left-5 top-full w-0.5 h-6 bg-border" />
            )}

            {/* Stop Card */}
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              {/* Stop Header */}
              <div className="p-5 border-b border-border bg-secondary/30">
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-muted rounded cursor-grab">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {stopIndex + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {stop.cityName}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {stop.country}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} -{' '}
                      {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-xs text-muted-foreground">{days} {days === 1 ? 'day' : 'days'}</p>
                  </div>
                </div>

                {/* Transport & Accommodation */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {stop.transport && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border text-sm">
                      {(() => {
                        const Icon = transportIcons[stop.transport.type];
                        return <Icon className="w-4 h-4 text-primary" />;
                      })()}
                      <span className="text-muted-foreground capitalize">{stop.transport.type}</span>
                      <span className="font-medium text-foreground">₹{stop.transport.cost.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {stop.accommodation && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border text-sm">
                      <span className="text-muted-foreground">{stop.accommodation.name}</span>
                      <span className="font-medium text-foreground">₹{stop.accommodation.cost.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Activities */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Activities
                  </h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveActivityModal(stop.id)}
                  >
                    <Plus className="w-4 h-4" />
                    Add Activity
                  </Button>
                </div>

                {stop.activities.length > 0 ? (
                  <div className="space-y-3">
                    {stop.activities.map((activity, actIndex) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                      >
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium capitalize",
                          categoryColors[activity.category]
                        )}>
                          {activity.category}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-foreground truncate">
                            {activity.name}
                          </h5>
                          {activity.description && (
                            <p className="text-sm text-muted-foreground truncate">
                              {activity.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {activity.duration}h
                          </span>
                          <span className="flex items-center gap-1 font-medium text-foreground">
                            <IndianRupee className="w-3 h-3" />
                            ₹{activity.cost.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No activities added yet
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Add Stop Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button variant="outline" className="w-full border-dashed" onClick={onAddStop}>
          <Plus className="w-4 h-4" />
          Add Another Stop
        </Button>
      </motion.div>

      {/* Activity Modals */}
      {stops.map((stop) => (
        <AddActivityModal
          key={stop.id}
          isOpen={activeActivityModal === stop.id}
          onClose={() => setActiveActivityModal(null)}
          onAdd={(name, cost, duration, category) => {
            onAddActivity(stop.id, name, cost, duration, category);
            setActiveActivityModal(null);
          }}
        />
      ))}
    </div>
  );
}
