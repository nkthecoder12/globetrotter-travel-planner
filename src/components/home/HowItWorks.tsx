import { motion } from 'framer-motion';
import { MapPin, Calendar, Wallet, Share2 } from 'lucide-react';

const steps = [
  {
    icon: MapPin,
    title: 'Pick Your Destinations',
    description: 'Search from hundreds of cities worldwide and add them to your personalized itinerary.',
    color: 'bg-primary',
  },
  {
    icon: Calendar,
    title: 'Build Your Itinerary',
    description: 'Organize your trip day by day. Add activities, accommodations, and transport seamlessly.',
    color: 'bg-ocean',
  },
  {
    icon: Wallet,
    title: 'Track Your Budget',
    description: 'Get automatic cost estimates and keep your spending in check with smart breakdowns.',
    color: 'bg-forest',
  },
  {
    icon: Share2,
    title: 'Share & Inspire',
    description: 'Share your plans with friends or make them public to inspire fellow travelers.',
    color: 'bg-coral',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Simple & Intuitive
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How GlobeTrotter Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Planning your dream trip has never been easier
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
                  <span className="text-sm font-bold text-muted-foreground">
                    {index + 1}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center mb-5`}>
                  <step.icon className="w-7 h-7 text-accent-foreground" />
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
