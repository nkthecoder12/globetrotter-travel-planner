import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plane, Home, Ticket, Utensils, IndianRupee } from 'lucide-react';
import { Stop, BudgetBreakdown as BudgetType } from '@/types/trip';
import { cn } from '@/lib/utils';

interface BudgetBreakdownProps {
  stops: Stop[];
}

const categoryConfig = [
  { key: 'transport', label: 'Transportation', icon: Plane, color: 'bg-primary' },
  { key: 'accommodation', label: 'Accommodation', icon: Home, color: 'bg-ocean' },
  { key: 'activities', label: 'Activities', icon: Ticket, color: 'bg-coral' },
  { key: 'food', label: 'Food & Dining', icon: Utensils, color: 'bg-forest' },
] as const;

export function BudgetBreakdown({ stops }: BudgetBreakdownProps) {
  const budget = useMemo(() => {
    const breakdown: BudgetType = {
      accommodation: 0,
      transport: 0,
      activities: 0,
      food: 0,
      total: 0,
    };

    stops.forEach((stop) => {
      if (stop.transport) {
        breakdown.transport += stop.transport.cost;
      }
      if (stop.accommodation) {
        breakdown.accommodation += stop.accommodation.cost;
      }
      stop.activities.forEach((activity) => {
        breakdown.activities += activity.cost;
      });
      // Estimate food cost based on days
      const days = Math.ceil(
        (new Date(stop.endDate).getTime() - new Date(stop.startDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      breakdown.food += days * 400; // ₹400 per day estimate
    });

    breakdown.total = breakdown.accommodation + breakdown.transport + breakdown.activities + breakdown.food;

    return breakdown;
  }, [stops]);

  const maxValue = Math.max(budget.accommodation, budget.transport, budget.activities, budget.food);

  if (stops.length === 0) {
    return (
      <div className="bg-card rounded-xl p-10 text-center border border-border">
          <div className="w-16 h-16 rounded-2xl bg-coral/10 flex items-center justify-center mx-auto mb-4">
            <IndianRupee className="w-8 h-8 text-coral" />
          </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          No budget data
        </h3>
        <p className="text-muted-foreground">
          Add stops and activities to see your budget breakdown
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Total Budget Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-hero rounded-2xl p-6 text-accent-foreground lg:col-span-2"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80 mb-1">Estimated Total Budget</p>
            <div className="font-display text-4xl font-bold">
              ₹{budget.total.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80 mb-1">Per Day Average</p>
            <div className="font-display text-2xl font-semibold">
              ₹{Math.round(budget.total / (stops.reduce((acc, stop) => {
                const days = Math.ceil(
                  (new Date(stop.endDate).getTime() - new Date(stop.startDate).getTime()) / (1000 * 60 * 60 * 24)
                );
                return acc + days;
              }, 0) || 1)).toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl p-6 border border-border"
      >
        <h3 className="font-display text-lg font-semibold text-foreground mb-6">
          Cost Breakdown
        </h3>
        <div className="space-y-4">
          {categoryConfig.map((cat) => {
            const value = budget[cat.key as keyof BudgetType];
            const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

            return (
              <div key={cat.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", cat.color)}>
                      <cat.icon className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {cat.label}
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">
                    ₹{value.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={cn("h-full rounded-full", cat.color)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Per Stop Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl p-6 border border-border"
      >
        <h3 className="font-display text-lg font-semibold text-foreground mb-6">
          Cost by Destination
        </h3>
        <div className="space-y-4">
          {stops.map((stop) => {
            const stopTotal =
              (stop.transport?.cost || 0) +
              (stop.accommodation?.cost || 0) +
              stop.activities.reduce((acc, a) => acc + a.cost, 0);

            return (
              <div
                key={stop.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
              >
                <div>
                  <h4 className="font-medium text-foreground">{stop.cityName}</h4>
                  <p className="text-xs text-muted-foreground">{stop.country}</p>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-foreground">
                    ₹{stopTotal.toLocaleString('en-IN')}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {stop.activities.length} activities
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
