import React from 'react';
import { MailIcon, PhoneIcon, CalendarIcon, LogoIcon } from './icons';
import { MapPin, Instagram, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <LogoIcon className="text-primary" />
              <span className="font-['Montserrat'] font-bold text-xl text-foreground">
                Ujfalussy <span className="text-primary">Milán</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Fodrász tanuló Veszprémben. Férfi hajvágás, trendi vágások, professzionális megjelenés.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-['Montserrat'] font-bold text-lg mb-4 text-foreground">Kapcsolat</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} className="text-primary" />
                <span>Veszprém, Pápai utca 15</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <PhoneIcon className="w-4 h-4 text-primary" />
                <span>+36 XX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MailIcon className="w-4 h-4 text-primary" />
                <span>milan@example.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="w-4 h-4 text-primary" />
                <span>H-P: 9:00 - 18:00, Szo: 9:00 - 14:00</span>
              </div>
            </div>
          </div>

          {/* Social & Quick Links */}
          <div>
            <h3 className="font-['Montserrat'] font-bold text-lg mb-4 text-foreground">Közösségi Média</h3>
            <div className="flex gap-4 mb-6">
              <a 
                href="#" 
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              <span className="text-primary font-bold">Lemondási politika:</span> Foglalásokat 24 órával előre kérlek lemondani.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Ujfalussy Milán. Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
};
