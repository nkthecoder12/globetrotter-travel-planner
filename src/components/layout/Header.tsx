import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logoImg from '@/assets/logofortrip.jpeg';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/explore', label: 'Explore' },
  { href: '/my-trips', label: 'My Trips' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isHome ? "bg-transparent" : "bg-background/80 backdrop-blur-md border-b border-border"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logoImg}
              alt="GlobeTrotter Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-all duration-300 group-hover:scale-110"
            />
            <span className={cn(
              "font-display text-xl font-semibold hidden sm:block",
              isHome ? "text-accent-foreground" : "text-foreground"
            )}>
              GlobeTrotter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === link.href
                    ? isHome
                      ? "bg-accent-foreground/20 text-accent-foreground"
                      : "bg-primary/10 text-primary"
                    : isHome
                      ? "text-accent-foreground/70 hover:text-accent-foreground hover:bg-accent-foreground/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login">
              <Button
                variant={isHome ? "heroOutline" : "outline"}
                size="sm"
              >
                <User className="w-4 h-4" />
                Sign In
              </Button>
            </Link>
            <Button
              variant={isHome ? "hero" : "accent"}
              size="sm"
            >
              <MapPin className="w-4 h-4" />
              Plan Trip
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={cn("w-6 h-6", isHome ? "text-accent-foreground" : "text-foreground")} />
            ) : (
              <Menu className={cn("w-6 h-6", isHome ? "text-accent-foreground" : "text-foreground")} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border mt-2">
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full justify-center">
                    <User className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
                <Button variant="accent" className="w-full justify-center">
                  <MapPin className="w-4 h-4" />
                  Plan Trip
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
