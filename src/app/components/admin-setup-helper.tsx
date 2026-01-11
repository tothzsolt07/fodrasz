import React, { useState } from 'react';
import { UserPlus, AlertCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

/**
 * Admin Setup Helper Component
 * Helps create the first admin user for the system
 */
export function AdminSetupHelper({ onClose }: { onClose?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('Ujfalussy Milán');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-63400bb8/admin/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ email, password, name })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Admin létrehozása sikertelen');
      }

      console.log('Admin user created:', data.user);
      toast.success('Admin felhasználó sikeresen létrehozva!');
      setSuccess(true);
      
      // Mark admin as created
      if (onClose) {
        localStorage.setItem('admin_created', 'true');
      }
    } catch (error: any) {
      console.error('Create admin error:', error);
      toast.error(error.message || 'Hiba történt az admin létrehozása során');
    } finally {
      setLoading(false);
    }
  };

  const handleClearStorage = () => {
    if (confirm('Biztosan törölni szeretnéd a tárolt admin tokent? Újra be kell majd jelentkezned.')) {
      localStorage.removeItem('admin_access_token');
      toast.info('Token törölve. Jelentkezz be újra.');
    }
  };

  if (success) {
    return (
      <div className="fixed bottom-4 right-4 bg-card border border-green-500/50 rounded-lg shadow-xl p-6 max-w-md z-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-white" size={24} />
          </div>
          <h3 className="font-['Montserrat'] font-bold text-foreground mb-2">
            Admin létrehozva! ✅
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Most már bejelentkezhetsz az admin panelba a megadott email és jelszó használatával.
          </p>
          <button
            onClick={() => {
              onClose?.();
            }}
            className="text-sm text-primary hover:underline"
          >
            Bezárás
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-primary/50 rounded-lg shadow-xl p-6 max-w-md z-50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-primary flex-shrink-0" size={20} />
          <div>
            <h3 className="font-['Montserrat'] font-bold text-foreground mb-1">
              Első Admin Létrehozása
            </h3>
            <p className="text-muted-foreground text-sm">
              Hozd létre az első admin fiókot az admin panel használatához.
            </p>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleCreateAdmin} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Név
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Jelszó
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 karakter"
            minLength={6}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-['Montserrat'] font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              Létrehozás...
            </>
          ) : (
            <>
              <UserPlus size={16} />
              Admin Létrehozása
            </>
          )}
        </button>
      </form>
    </div>
  );
}