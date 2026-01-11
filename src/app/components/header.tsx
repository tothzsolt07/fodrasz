import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LogoIcon } from './icons';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <LogoIcon className="text-primary" />
            <span className="font-['Montserrat'] font-bold text-xl text-foreground">
              Ujfalussy <span className="text-primary">Milán</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Rólam
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Szolgáltatások
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Portfólió
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Kapcsolat
            </button>
            <button 
              onClick={() => scrollToSection('booking')}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
            >
              Foglalás most
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Rólam
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Szolgáltatások
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Portfólió
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Kapcsolat
              </button>
              <button 
                onClick={() => scrollToSection('booking')}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-all w-full"
              >
                Foglalás most
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
