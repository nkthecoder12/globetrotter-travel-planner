import { motion } from 'framer-motion';
import { ArrowRight, IndianRupee } from 'lucide-react';
import { mockCities } from '@/data/mockData';
import { cn } from '@/lib/utils';

const costLabels = {
  budget: { label: 'Budget-Friendly', color: 'bg-forest text-accent-foreground' },
  moderate: { label: 'Moderate', color: 'bg-ocean text-accent-foreground' },
  expensive: { label: 'Splurge-Worthy', color: 'bg-coral text-accent-foreground' },
};

export function FeaturedDestinations() {
  return (
    <section className="py-24 bg-background grain">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Popular Destinations
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Where will you go next?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover trending destinations loved by travelers worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mockCities.map((city, index) => (
            <motion.article
              key={city.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={city.image}
                  alt={`${city.name}, ${city.country}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                
                {/* Cost Badge */}
                <div className={cn(
                  "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                  costLabels[city.costIndex].color
                )}>
                  <IndianRupee className="w-3 h-3" />
                    {costLabels[city.costIndex].label}
                </div>

                {/* City Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl font-bold text-accent-foreground">
                    {city.name}
                  </h3>
                  <p className="text-accent-foreground/80 text-sm">
                    {city.country}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {city.description}
                </p>

                {/* Activities Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {city.popularActivities.slice(0, 3).map((activity) => (
                    <span
                      key={activity}
                      className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                    >
                      {activity}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="flex items-center gap-2 text-primary font-medium text-sm group/btn">
                  Explore {city.name}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
