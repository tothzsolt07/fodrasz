import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { ScissorsIcon } from './icons';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface BookingData {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export const BookingWizard = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const services = [
    { id: 'haircut', name: 'Férfi Hajvágás', price: 'Ingyenes', duration: '30 perc' },
    { id: 'beard', name: 'Szakáll Formázás', price: 'Hamarosan', duration: '20 perc', disabled: true },
    { id: 'combo', name: 'Hajvágás + Szakáll', price: 'Hamarosan', duration: '45 perc', disabled: true }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const progressPercentage = (step / 4) * 100;

  const submitBooking = async () => {
    setSubmitting(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-63400bb8/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            service: services.find(s => s.id === bookingData.service)?.name || bookingData.service,
            date: bookingData.date,
            time: bookingData.time,
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
            notes: bookingData.notes
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Foglalás rögzítése sikertelen');
      }

      const data = await response.json();
      console.log('Booking created:', data.booking);
      
      toast.success('Foglalás rögzítve — várj a visszaigazolásra!', {
        description: 'Emailben értesítünk a foglalás jóváhagyásáról.'
      });
      
      // Reset and close after delay
      setTimeout(() => {
        onClose();
        setStep(1);
        setBookingData({
          service: '',
          date: '',
          time: '',
          name: '',
          email: '',
          phone: '',
          notes: ''
        });
        setSubmitting(false);
      }, 2000);
    } catch (error: any) {
      console.error('Submit booking error:', error);
      toast.error(error.message || 'Hiba történt a foglalás rögzítése során');
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    // Validation
    if (step === 1 && !bookingData.service) {
      toast.error('Kérlek válassz szolgáltatást!');
      return;
    }
    if (step === 2 && (!bookingData.date || !bookingData.time)) {
      toast.error('Kérlek válassz dátumot és időpontot!');
      return;
    }
    if (step === 3 && (!bookingData.name || !bookingData.email || !bookingData.phone)) {
      toast.error('Kérlek töltsd ki az összes kötelező mezőt!');
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit booking to backend
      submitBooking();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="booking-wizard bg-card border border-border rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-['Montserrat'] font-bold text-foreground">
              Foglalás
            </h2>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Lépés {step} / 4</span>
              <span>{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="booking-progress">
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bar bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="booking-step space-y-4">
              <div className="text-center mb-6">
                <ScissorsIcon className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-['Montserrat'] font-bold text-foreground mb-2">
                  Válassz szolgáltatást
                </h3>
                <p className="text-muted-foreground text-sm">
                  Melyik szolgáltatásra szeretnél időpontot foglalni?
                </p>
              </div>

              <div className="grid gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    disabled={service.disabled}
                    onClick={() => setBookingData({ ...bookingData, service: service.id })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      bookingData.service === service.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    } ${service.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-['Montserrat'] font-bold text-foreground">{service.name}</h4>
                      <span className="text-primary font-bold">{service.price}</span>
                    </div>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      <Clock size={14} />
                      {service.duration}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div className="booking-step space-y-6">
              <div className="text-center mb-6">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-['Montserrat'] font-bold text-foreground mb-2">
                  Válassz időpontot
                </h3>
                <p className="text-muted-foreground text-sm">
                  Melyik napon és időpontban szeretnél jönni?
                </p>
              </div>

              <div>
                <label className="block text-sm font-['Montserrat'] font-bold text-foreground mb-2">
                  Dátum
                </label>
                <input 
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-input-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-['Montserrat'] font-bold text-foreground mb-2">
                  Időpont
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setBookingData({ ...bookingData, time })}
                      className={`p-2 rounded-lg border text-sm transition-all ${
                        bookingData.time === time
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Personal Info */}
          {step === 3 && (
            <div className="booking-step space-y-4">
              <div className="text-center mb-6">
                <User className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-['Montserrat'] font-bold text-foreground mb-2">
                  Add meg az adataidat
                </h3>
                <p className="text-muted-foreground text-sm">
                  Szükségünk van néhány adatra a foglaláshoz
                </p>
              </div>

              <div>
                <label className="block text-sm font-['Montserrat'] font-bold text-foreground mb-2">
                  Név *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="text"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    placeholder="Teljes név"
                    className="w-full bg-input-background border border-border rounded-lg pl-10 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-['Montserrat'] font-bold text-foreground mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full bg-input-background border border-border rounded-lg pl-10 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-['Montserrat'] font-bold text-foreground mb-2">
                  Telefon *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    placeholder="+36 XX XXX XXXX"
                    className="w-full bg-input-background border border-border rounded-lg pl-10 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-['Montserrat'] font-bold text-foreground mb-2">
                  Megjegyzés (opcionális)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <textarea 
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    placeholder="Van valami speciális kérésed?"
                    rows={3}
                    className="w-full bg-input-background border border-border rounded-lg pl-10 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="booking-step space-y-6">
              <div className="text-center mb-6">
                <Check className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-['Montserrat'] font-bold text-foreground mb-2">
                  Foglalás összesítése
                </h3>
                <p className="text-muted-foreground text-sm">
                  Ellenőrizd a foglalás adatait
                </p>
              </div>

              <div className="bg-secondary rounded-lg p-6 space-y-4">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Szolgáltatás:</span>
                  <span className="font-['Montserrat'] font-bold text-foreground">
                    {services.find(s => s.id === bookingData.service)?.name}
                  </span>
                </div>
                
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Dátum:</span>
                  <span className="font-['Montserrat'] font-bold text-foreground">
                    {bookingData.date}
                  </span>
                </div>
                
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Időpont:</span>
                  <span className="font-['Montserrat'] font-bold text-foreground">
                    {bookingData.time}
                  </span>
                </div>
                
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Név:</span>
                  <span className="font-['Montserrat'] font-bold text-foreground">
                    {bookingData.name}
                  </span>
                </div>
                
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-['Montserrat'] font-bold text-foreground">
                    {bookingData.email}
                  </span>
                </div>
                
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Telefon:</span>
                  <span className="font-['Montserrat'] font-bold text-foreground">
                    {bookingData.phone}
                  </span>
                </div>

                {bookingData.notes && (
                  <div className="pt-3">
                    <span className="text-muted-foreground block mb-2">Megjegyzés:</span>
                    <p className="text-foreground italic">"{bookingData.notes}"</p>
                  </div>
                )}
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-sm">
                <p className="text-muted-foreground">
                  <span className="text-primary font-bold">Fontos:</span> A foglalásod függőben lesz, 
                  amíg nem hagyom jóvá. Emailben értesítelek a jóváhagyásról. 
                  Lemondás esetén 24 órával korábban jelezd!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Actions */}
        <div className="border-t border-border p-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1 || submitting}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              step === 1 || submitting
                ? 'text-muted-foreground cursor-not-allowed'
                : 'text-foreground hover:bg-secondary'
            }`}
          >
            <ArrowLeft size={18} />
            Vissza
          </button>

          <button
            onClick={handleNext}
            disabled={submitting}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-['Montserrat'] font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                Foglalás...
              </>
            ) : step === 4 ? (
              <>
                <Check size={18} />
                Foglalás megerősítése
              </>
            ) : (
              <>
                Tovább
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};