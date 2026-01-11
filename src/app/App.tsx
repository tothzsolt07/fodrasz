import React, { useState, useEffect } from 'react';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { BookingWizard } from './components/booking-wizard';
import { AdminDashboard } from './components/admin-dashboard';
import { AdminSetupHelper } from './components/admin-setup-helper';
import { BeforeAfterSlider } from './components/before-after-slider';
import { ScissorsIcon, CombIcon } from './components/icons';
import { Clock, Star, MapPin, Shield } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { initAnimations, setupServiceCardHovers, setupAccessibilityAnimations } from './utils/gsap-animations';

export default function App() {
  const [showBookingWizard, setShowBookingWizard] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showAdminSetup, setShowAdminSetup] = useState(
    () => !localStorage.getItem('admin_created')
  );

  // Initialize GSAP animations on mount
  useEffect(() => {
    initAnimations();
    setupServiceCardHovers();
    setupAccessibilityAnimations();
  }, []);

  const handleAdminSetupComplete = () => {
    localStorage.setItem('admin_created', 'true');
    setShowAdminSetup(false);
  };

  // If admin dashboard is shown, render it fullscreen
  if (showAdminDashboard) {
    return <AdminDashboard onClose={() => setShowAdminDashboard(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Header />
      
      {showBookingWizard && <BookingWizard onClose={() => setShowBookingWizard(false)} />}
      
      {/* Secret Admin Access Button - Click on logo 5 times */}
      <button
        onClick={() => setShowAdminDashboard(true)}
        className="fixed bottom-4 right-4 z-40 bg-card border border-border p-3 rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-all opacity-50 hover:opacity-100"
        title="Admin hozzáférés"
      >
        <Shield size={20} />
      </button>
      
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1547648946-2b1fd7eab923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBjdXR0aW5nJTIwaGFpcnxlbnwxfHx8fDE3NjgwMTE1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Fodrász Veszprém"
            className="w-full h-full object-cover hero-image"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="max-w-3xl">
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-['Montserrat'] font-bold text-foreground mb-6">
              Professzionális <span className="text-primary">Férfi Hajvágás</span> Veszprémben
            </h1>
            <p className="hero-subtitle text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
              Ujfalussy Milán vagyok, fodrász tanuló. Trendi, letisztult stílus, egyéni megközelítés minden vendég számára.
            </p>
            <button 
              onClick={() => setShowBookingWizard(true)}
              className="cta-primary bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-['Montserrat'] font-bold hover:bg-primary/90 transition-all inline-flex items-center gap-2"
            >
              <ScissorsIcon className="w-5 h-5" />
              Foglalás most
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 bg-card animate-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1667539916671-b9e7039ccee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4MDg2MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Ujfalussy Milán fodrász"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div>
              <h2 className="animate-heading text-3xl md:text-4xl font-['Montserrat'] font-bold text-foreground mb-6">
                Rólam
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Ujfalussy Milán vagyok, fodrász tanuló Veszprémben. Két éve tanulok a Jendra iskolában, 
                ahol minden nap új technikákat sajátítok el és fejlesztem tudásomat.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Fő fókuszom a férfi hajvágás, trendi és letisztult stílus kialakítása. Hiszek abban, 
                hogy minden vendég egyedi, és a hajvágásnak tükröznie kell az egyéniséget.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Veszprémben, a Pápai utca 15. szám alatt várom vendégeimet, ahol professzionális 
                körülmények között foglalkozom minden részlettel.
              </p>
              <div className="flex items-center gap-2 text-primary">
                <MapPin size={20} />
                <span className="font-['Montserrat'] font-bold">Veszprém, Pápai utca 15</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 bg-background animate-section overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 212, 0, 0.15) 2px, transparent 2px),
              linear-gradient(90deg, rgba(255, 212, 0, 0.15) 2px, transparent 2px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="animate-heading text-3xl md:text-4xl font-['Montserrat'] font-bold text-foreground mb-4">
              Szolgáltatások
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professzionális hajvágás szolgáltatások férfiaknak
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Férfi Hajvágás',
                price: 'Ingyenes (bevezető)',
                duration: '30 perc',
                description: 'Klasszikus és modern férfi hajvágás, személyre szabott tanácsadással',
                icon: ScissorsIcon
              },
              {
                title: 'Szakáll Formázás',
                price: 'Hamarosan',
                duration: '20 perc',
                description: 'Szakállformázás, kontúrozás és ápolás',
                icon: CombIcon
              },
              {
                title: 'Hajvágás + Szakáll',
                price: 'Hamarosan',
                duration: '45 perc',
                description: 'Teljes megjelenés csomag hajvágással és szakállformázással',
                icon: ScissorsIcon
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="service-card bg-card border border-border rounded-lg p-6 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                  <span className="text-primary font-['Montserrat'] font-bold text-xl">
                    {service.price}
                  </span>
                </div>
                <h3 className="font-['Montserrat'] font-bold text-xl text-foreground mb-2">
                  {service.title}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Clock size={16} />
                  <span>{service.duration}</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="relative py-20 bg-card animate-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="animate-heading text-3xl md:text-4xl font-['Montserrat'] font-bold text-foreground mb-4">
              Portfólió
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Korábbi munkáim - Férfi hajvágás előtte/utána. Húzd a csúszkát és nézd meg az átalakítást!
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-12">
            {/* First slider - Left aligned */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <BeforeAfterSlider
                  beforeImage="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwbG9uZyUyMGhhaXJ8ZW58MXx8fHwxNzM2OTc3Njc2fDA&ixlib=rb-4.1.0&q=80&w=800"
                  afterImage="https://images.unsplash.com/photo-1621605815971-fbc98d665033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2hvcnQlMjBoYWlyY3V0fGVufDF8fHx8MTczNjk3NzY3Nnww&ixlib=rb-4.1.0&q=80&w=800"
                  altBefore="Hosszabb férfi haj - előtte"
                  altAfter="Professzionális férfi hajvágás - utána"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="font-['Montserrat'] font-bold text-2xl text-foreground mb-4">
                  Klasszikus férfi hajvágás
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Modern, elegáns megjelenés. A hosszabb haj precíz vágással került formába, 
                  kihangsúlyozva a természetes textúrát és volumet.
                </p>
              </div>
            </div>

            {/* Second slider - Right aligned */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-['Montserrat'] font-bold text-2xl text-foreground mb-4">
                  Fade hajvágás
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Trendi fade technikával készült hajvágás, amely tökéletesen illeszkedik 
                  az arc formájához és kiemeli a stílust.
                </p>
              </div>
              <div>
                <BeforeAfterSlider
                  beforeImage="https://images.unsplash.com/photo-1605497788044-5a32c7078486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYWxlJTIwdW5rZW1wdCUyMGhhaXJ8ZW58MXx8fHwxNzM2OTc3Njc2fDA&ixlib=rb-4.1.0&q=80&w=800"
                  afterImage="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYWxlJTIwZmFkZSUyMGhhaXJjdXR8ZW58MXx8fHwxNzM2OTc3Njc2fDA&ixlib=rb-4.1.0&q=80&w=800"
                  altBefore="Rendezetlen férfi haj - előtte"
                  altAfter="Fade hajvágás - utána"
                />
              </div>
            </div>

            {/* Third slider - Left aligned */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <BeforeAfterSlider
                  beforeImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtYWxlJTIwYmVmb3JlJTIwaGFpcmN1dHxlbnwxfHx8fDE3MzY5Nzc2NzZ8MA&ixlib=rb-4.1.0&q=80&w=800"
                  afterImage="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtYWxlJTIwbW9kZXJuJTIwaGFpcmN1dHxlbnwxfHx8fDE3MzY5Nzc2NzZ8MA&ixlib=rb-4.1.0&q=80&w=800"
                  altBefore="Klasszikus férfi haj - előtte"
                  altAfter="Modern textúrált hajvágás - utána"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="font-['Montserrat'] font-bold text-2xl text-foreground mb-4">
                  Textúrált oldalra fésült stílus
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Elegáns, business-ready megjelenés modern textúrával. A haj strukturált, 
                  könnyen formázható és egész nap tartja az alakját.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Gallery Section with Honeycomb Pattern */}
      <section className="relative py-20 bg-background animate-section overflow-hidden">
        {/* Honeycomb/Hexagon Pattern Background */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23FFD400' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
        
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h3 className="animate-heading text-3xl md:text-4xl font-['Montserrat'] font-bold text-foreground mb-4">
              További munkáim
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Még több példa a korábbi munkáimból
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item}
                className="gallery-item--draggable bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-2xl transition-all"
              >
                <img 
                  src={`https://images.unsplash.com/photo-1761931403663-050fbd8fb4c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwaGFpcmN1dCUyMG1vZGVybnxlbnwxfHx8fDE3NjgwODYxODJ8MA&ixlib=rb-4.1.0&q=80&w=400&h=400&fit=crop&sat=${item * 10}`}
                  alt={`Férfi hajvágás Veszprém - példa ${item}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-background/80 backdrop-blur">
                  <p className="text-sm text-muted-foreground">Férfi hajvágás #{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 bg-background animate-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="animate-heading text-3xl md:text-4xl font-['Montserrat'] font-bold text-foreground mb-4">
              Vélemények
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mit mondanak rólam a vendégeim
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Kiss Péter',
                rating: 5,
                text: 'Nagyon elégedett vagyok a hajvágással! Milán figyelmes, precíz és jó szakember.'
              },
              {
                name: 'Nagy János',
                rating: 5,
                text: 'Tökéletes hajvágás, pontosan azt kaptam amit kértem. Csak ajánlani tudom!'
              },
              {
                name: 'Szabó Gábor',
                rating: 5,
                text: 'Profi munka, kellemes légkör. Milán tudja mit csinál, rendszeresen ide járok.'
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="testimonial-card bg-card border border-border rounded-lg p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <p className="font-['Montserrat'] font-bold text-foreground">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Booking CTA */}
      <section id="booking" className="relative py-20 bg-primary animate-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="animate-heading text-3xl md:text-4xl font-['Montserrat'] font-bold text-primary-foreground mb-6">
            Foglalj időpontot most!
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Kattints az alábbi gombra és válaszd ki a számodra megfelelő időpontot.
          </p>
          <button 
            onClick={() => setShowBookingWizard(true)}
            className="bg-background text-foreground px-8 py-4 rounded-lg text-lg font-['Montserrat'] font-bold hover:bg-background/90 transition-all inline-flex items-center gap-2"
          >
            <ScissorsIcon className="w-5 h-5" />
            Foglalási rendszer indítása
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-card animate-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="animate-heading text-3xl md:text-4xl font-['Montserrat'] font-bold text-foreground mb-4">
                Kapcsolat
              </h2>
              <p className="text-muted-foreground">
                Vedd fel velem a kapcsolatot
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-['Montserrat'] font-bold text-lg text-foreground mb-4">Elérhetőség</h3>
                  <div className="space-y-3">
                    <p className="text-muted-foreground">
                      <span className="font-bold text-primary">Cím:</span> Veszprém, Pápai utca 15
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-bold text-primary">Telefon:</span> +36 XX XXX XXXX
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-bold text-primary">Email:</span> milan@example.com
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-['Montserrat'] font-bold text-lg text-foreground mb-4">Nyitvatartás</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Hétfő - Péntek: 9:00 - 18:00</p>
                    <p>Szombat: 9:00 - 14:00</p>
                    <p>Vasárnap: Zárva</p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary rounded-lg p-6">
                <h3 className="font-['Montserrat'] font-bold text-lg text-foreground mb-4">Üzenet küldése</h3>
                <form className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Név"
                      className="w-full bg-input-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email"
                      className="w-full bg-input-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Üzenet"
                      rows={4}
                      className="w-full bg-input-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-['Montserrat'] font-bold hover:bg-primary/90 transition-all"
                  >
                    Küldés
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Admin Setup Helper - Only shows on first use */}
      {showAdminSetup && <AdminSetupHelper onClose={handleAdminSetupComplete} />}
    </div>
  );
}