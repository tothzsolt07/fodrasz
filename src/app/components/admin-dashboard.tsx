import React, { useState, useEffect, useCallback } from 'react';
import { Check, X, Calendar, Mail, Phone, User, Clock, ArrowLeft, LogOut, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { ScissorsIcon } from './icons';
import { AdminLogin } from './admin-login';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt?: string;
}

export const AdminDashboard = ({ onClose }: { onClose: () => void }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if stored token is valid on mount
  useEffect(() => {
    const checkStoredToken = async () => {
      const storedToken = localStorage.getItem('admin_access_token');
      
      if (!storedToken) {
        console.log('No stored token found, showing login screen');
        setCheckingAuth(false);
        return;
      }

      console.log('Validating stored token...');
      
      // Verify the token with the backend
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-63400bb8/admin/session`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          // Token is valid
          const data = await response.json();
          console.log('Token is valid for user:', data.user?.email);
          setAccessToken(storedToken);
        } else {
          // Token is invalid, clear it
          const errorData = await response.json();
          console.log('Stored token is invalid:', errorData.error);
          localStorage.removeItem('admin_access_token');
        }
      } catch (error: any) {
        console.error('Token validation error:', error.message);
        localStorage.removeItem('admin_access_token');
      } finally {
        setCheckingAuth(false);
      }
    };

    checkStoredToken();
  }, []);

  const handleLoginSuccess = (token: string) => {
    setAccessToken(token);
    localStorage.setItem('admin_access_token', token);
    toast.success('Sikeres bejelentkezés!');
  };

  const handleLogout = useCallback(() => {
    setAccessToken(null);
    localStorage.removeItem('admin_access_token');
    toast.info('Kijelentkezve');
  }, []);

  // Fetch bookings from backend - wrapped in useCallback
  const fetchBookings = useCallback(async () => {
    if (!accessToken) {
      console.log('Cannot fetch bookings: No access token available');
      return;
    }

    console.log('Fetching bookings with token length:', accessToken.length);
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-63400bb8/bookings`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Fetch bookings response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Fetch bookings error response:', errorData);
        
        if (response.status === 401) {
          // Token expired or invalid
          console.log('Token is invalid, logging out...');
          handleLogout();
          throw new Error('Hitelesítési hiba. Kérlek jelentkezz be újra.');
        }
        throw new Error(errorData.error || 'Foglalások betöltése sikertelen');
      }

      const data = await response.json();
      console.log('Bookings loaded successfully:', data.bookings?.length || 0);
      setBookings(data.bookings || []);
    } catch (err: any) {
      console.error('Fetch bookings error:', err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [accessToken, handleLogout]);

  // Load bookings when authenticated
  useEffect(() => {
    if (accessToken) {
      fetchBookings();
    }
  }, [accessToken, fetchBookings]);

  const updateBookingStatus = async (bookingId: string, status: 'approved' | 'rejected') => {
    if (!accessToken) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-63400bb8/bookings/${bookingId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        }
      );

      if (!response.ok) {
        throw new Error('Státusz frissítése sikertelen');
      }

      const data = await response.json();
      
      // Update local state
      setBookings(bookings.map(b => 
        b.id === bookingId ? data.booking : b
      ));

      if (status === 'approved') {
        toast.success('Foglalás jóváhagyva!', {
          description: 'A foglalás sikeresen megerősítve.'
        });
      } else {
        toast.info('Foglalás elutasítva', {
          description: 'A foglalást elutasítottad.'
        });
      }
    } catch (err: any) {
      console.error('Update booking status error:', err);
      toast.error(err.message);
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!accessToken) return;

    if (!confirm('Biztosan törölni szeretnéd ezt a foglalást?')) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-63400bb8/bookings/${bookingId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Foglalás törlése sikertelen');
      }

      // Remove from local state
      setBookings(bookings.filter(b => b.id !== bookingId));
      toast.success('Foglalás törölve');
    } catch (err: any) {
      console.error('Delete booking error:', err);
      toast.error(err.message);
    }
  };

  const handleApprove = (bookingId: string) => {
    updateBookingStatus(bookingId, 'approved');
  };

  const handleReject = (bookingId: string) => {
    updateBookingStatus(bookingId, 'rejected');
  };

  // Show loading screen while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Hitelesítés ellenőrzése...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!accessToken) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const approvedBookings = bookings.filter(b => b.status === 'approved');
  const rejectedBookings = bookings.filter(b => b.status === 'rejected');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={20} />
                Vissza
              </button>
              <h1 className="text-2xl font-['Montserrat'] font-bold text-foreground">
                Admin <span className="text-primary">Felület</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ScissorsIcon className="w-8 h-8 text-primary" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut size={20} />
                Kijelentkezés
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="text-primary" size={24} />
              <h3 className="font-['Montserrat'] font-bold text-lg text-foreground">Függőben</h3>
            </div>
            <p className="text-3xl font-bold text-primary">{pendingBookings.length}</p>
            <p className="text-muted-foreground text-sm mt-1">Jóváhagyásra vár</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Check className="text-green-500" size={24} />
              <h3 className="font-['Montserrat'] font-bold text-lg text-foreground">Jóváhagyott</h3>
            </div>
            <p className="text-3xl font-bold text-green-500">{approvedBookings.length}</p>
            <p className="text-muted-foreground text-sm mt-1">Megerősített</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <X className="text-red-500" size={24} />
              <h3 className="font-['Montserrat'] font-bold text-lg text-foreground">Elutasítva</h3>
            </div>
            <p className="text-3xl font-bold text-red-500">{rejectedBookings.length}</p>
            <p className="text-muted-foreground text-sm mt-1">Elutasított</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-primary" size={24} />
              <h3 className="font-['Montserrat'] font-bold text-lg text-foreground">Összes</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{bookings.length}</p>
            <p className="text-muted-foreground text-sm mt-1">Összes foglalás</p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground">Foglalások betöltése...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Pending Bookings */}
        {!loading && pendingBookings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-['Montserrat'] font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock className="text-primary" size={20} />
              Függőben lévő foglalások
            </h2>
            
            <div className="grid gap-4">
              {pendingBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="bg-card border border-primary/30 rounded-lg p-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <ScissorsIcon className="w-5 h-5 text-primary" />
                        <span className="font-['Montserrat'] font-bold text-foreground text-lg">
                          {booking.service}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={16} />
                        <span>{booking.date}</span>
                        <Clock size={16} className="ml-2" />
                        <span>{booking.time}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User size={16} />
                        <span>{booking.name}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail size={16} />
                        <span className="text-sm">{booking.email}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone size={16} />
                        <span>{booking.phone}</span>
                      </div>

                      {booking.notes && (
                        <div className="pt-2 border-t border-border">
                          <p className="text-sm text-muted-foreground italic">
                            Megjegyzés: "{booking.notes}"
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                      <button
                        onClick={() => handleApprove(booking.id)}
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-['Montserrat'] font-bold transition-all"
                      >
                        <Check size={20} />
                        Jóváhagyás
                      </button>
                      
                      <button
                        onClick={() => handleReject(booking.id)}
                        className="flex items-center justify-center gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-3 rounded-lg font-['Montserrat'] font-bold transition-all"
                      >
                        <X size={20} />
                        Elutasítás
                      </button>

                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="flex items-center justify-center gap-2 bg-card border border-border hover:bg-destructive/10 hover:border-destructive/30 text-muted-foreground hover:text-destructive px-6 py-2 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                        Törlés
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved Bookings */}
        {!loading && approvedBookings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-['Montserrat'] font-bold text-foreground mb-4 flex items-center gap-2">
              <Check className="text-green-500" size={20} />
              Jóváhagyott foglalások
            </h2>
            
            <div className="grid gap-4">
              {approvedBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="bg-card border border-green-500/30 rounded-lg p-6 opacity-75"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <ScissorsIcon className="w-5 h-5 text-primary" />
                        <span className="font-['Montserrat'] font-bold text-foreground text-lg">
                          {booking.service}
                        </span>
                        <span className="ml-auto bg-green-600 text-white text-xs px-2 py-1 rounded">
                          Jóváhagyva
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={16} />
                        <span>{booking.date}</span>
                        <Clock size={16} className="ml-2" />
                        <span>{booking.time}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User size={16} />
                        <span>{booking.name}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone size={16} />
                        <span>{booking.phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="flex items-center justify-center gap-2 bg-card border border-border hover:bg-destructive/10 hover:border-destructive/30 text-muted-foreground hover:text-destructive px-6 py-2 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                        Törlés
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rejected Bookings */}
        {!loading && rejectedBookings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-['Montserrat'] font-bold text-foreground mb-4 flex items-center gap-2">
              <X className="text-red-500" size={20} />
              Elutasított foglalások
            </h2>
            
            <div className="grid gap-4">
              {rejectedBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="bg-card border border-red-500/30 rounded-lg p-6 opacity-60"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <ScissorsIcon className="w-5 h-5 text-muted-foreground" />
                        <span className="font-['Montserrat'] font-bold text-foreground text-lg">
                          {booking.service}
                        </span>
                        <span className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded">
                          Elutasítva
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={16} />
                        <span>{booking.date}</span>
                        <Clock size={16} className="ml-2" />
                        <span>{booking.time}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User size={16} />
                        <span>{booking.name}</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="flex items-center justify-center gap-2 bg-card border border-border hover:bg-destructive/10 hover:border-destructive/30 text-muted-foreground hover:text-destructive px-6 py-2 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                        Törlés
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && bookings.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-['Montserrat'] font-bold text-foreground mb-2">
              Még nincsenek foglalások
            </h3>
            <p className="text-muted-foreground">
              A foglalások itt fognak megjelenni, amint valaki időpontot foglal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};