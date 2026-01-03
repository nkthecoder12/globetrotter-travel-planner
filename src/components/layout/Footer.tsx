import { Globe, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Mobile App', href: '/app' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-accent-foreground/80 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-accent-foreground/10">
                <Globe className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-lg font-semibold text-accent-foreground">
                GlobeTrotter
              </span>
            </Link>
            <p className="text-sm text-accent-foreground/60 mb-6">
              Empowering personalized travel planning for adventurers worldwide.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-accent-foreground/10 hover:bg-accent-foreground/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-accent-foreground/10 hover:bg-accent-foreground/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-accent-foreground/10 hover:bg-accent-foreground/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-accent-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-accent-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-accent-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-accent-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-accent-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-accent-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-accent-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-accent-foreground/50">
            © {new Date().getFullYear()} GlobeTrotter. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-accent-foreground/50">
            <Link to="/terms" className="hover:text-accent-foreground transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-accent-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/cookies" className="hover:text-accent-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
