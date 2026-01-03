import { Link } from 'react-router-dom';
import { Calendar, MapPin, MoreHorizontal, Globe, Lock } from 'lucide-react';
import { Trip } from '@/types/trip';
import { cn } from '@/lib/utils';

interface TripCardProps {
  trip: Trip;
}

const statusColors = {
  planning: 'bg-ocean/10 text-ocean',
  upcoming: 'bg-forest/10 text-forest',
  ongoing: 'bg-coral/10 text-coral',
  completed: 'bg-muted text-muted-foreground',
};

export function TripCard({ trip }: TripCardProps) {
  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Link to={`/trip/${trip.id}`}>
      <article className="group bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all duration-300">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative w-full sm:w-40 h-32 sm:h-auto shrink-0">
            {trip.coverImage ? (
              <img
                src={trip.coverImage}
                alt={trip.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
                <MapPin className="w-8 h-8 text-accent-foreground/50" />
              </div>
            )}
            <div className="absolute top-2 right-2 sm:top-auto sm:bottom-2 sm:right-2">
              {trip.isPublic ? (
                <div className="p-1.5 rounded-full bg-foreground/80 text-accent-foreground">
                  <Globe className="w-3 h-3" />
                </div>
              ) : (
                <div className="p-1.5 rounded-full bg-foreground/80 text-accent-foreground">
                  <Lock className="w-3 h-3" />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {trip.name}
                </h3>
                {trip.description && (
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                    {trip.description}
                  </p>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors shrink-0"
              >
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(startDate)} - {formatDate(endDate)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{trip.stops.length} {trip.stops.length === 1 ? 'stop' : 'stops'}</span>
              </div>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                statusColors[trip.status]
              )}>
                {trip.status}
              </span>
            </div>

            {/* Stops Preview */}
            {trip.stops.length > 0 && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                <div className="flex -space-x-2">
                  {trip.stops.slice(0, 3).map((stop, index) => (
                    <div
                      key={stop.id}
                      className="w-7 h-7 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-xs font-medium text-secondary-foreground"
                      title={stop.cityName}
                    >
                      {stop.cityName.charAt(0)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {trip.stops.map(s => s.cityName).slice(0, 2).join(', ')}
                  {trip.stops.length > 2 && ` +${trip.stops.length - 2}`}
                </span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
