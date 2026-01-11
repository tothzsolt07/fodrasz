import React, { useState } from 'react';
import { ScissorsIcon } from './icons';
import { Eye, EyeOff, Lock, Mail, LogIn } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface AdminLoginProps {
  onLoginSuccess: (accessToken: string) => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-63400bb8/admin/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bejelentkezés sikertelen');
      }

      console.log('Admin login successful:', data.user.email);
      onLoginSuccess(data.access_token);
    } catch (err: any) {
      console.error('Admin login error:', err);
      setError(err.message || 'Hiba történt a bejelentkezés során');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-2xl p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
              <ScissorsIcon className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-['Montserrat'] font-bold text-foreground mb-2">
              Admin Bejelentkezés
            </h1>
            <p className="text-muted-foreground text-sm">
              Ujfalussy Milán Fodrászat
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email cím
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  placeholder="admin@example.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Jelszó
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-['Montserrat'] font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  Bejelentkezés...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Bejelentkezés
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Ez az admin felület csak Ujfalussy Milán számára elérhető.
            </p>
          </div>
        </div>

        {/* Development Helper - Remove in Production */}
        <div className="mt-4 p-4 bg-card/50 border border-border/50 rounded-lg text-xs text-muted-foreground">
          <p className="font-semibold mb-1">💡 Fejlesztői segítség:</p>
          <p>Első bejelentkezéshez hozz létre admin fiókot a konzolból:</p>
          <code className="block mt-2 bg-background p-2 rounded text-primary">
            POST /admin/signup
          </code>
        </div>
      </div>
    </div>
  );
}
