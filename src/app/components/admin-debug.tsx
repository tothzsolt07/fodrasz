import React, { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { projectId } from '/utils/supabase/info';

export function AdminDebug() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testToken = async () => {
    setTesting(true);
    setResult(null);

    const token = localStorage.getItem('admin_access_token');
    
    if (!token) {
      setResult({
        status: 'error',
        message: 'Nincs token a localStorage-ben',
        details: null
      });
      setTesting(false);
      return;
    }

    console.log('Testing token:', token.substring(0, 20) + '...');

    try {
      // Test session endpoint
      const sessionResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-63400bb8/admin/session`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const sessionData = await sessionResponse.json();
      
      if (!sessionResponse.ok) {
        setResult({
          status: 'error',
          message: 'Session endpoint hiba',
          details: {
            status: sessionResponse.status,
            error: sessionData
          }
        });
        setTesting(false);
        return;
      }

      // Test bookings endpoint
      const bookingsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-63400bb8/bookings`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const bookingsData = await bookingsResponse.json();

      if (!bookingsResponse.ok) {
        setResult({
          status: 'error',
          message: 'Bookings endpoint hiba',
          details: {
            status: bookingsResponse.status,
            error: bookingsData
          }
        });
        setTesting(false);
        return;
      }

      setResult({
        status: 'success',
        message: 'Minden endpoint működik! ✅',
        details: {
          user: sessionData.user,
          bookingsCount: bookingsData.bookings?.length || 0
        }
      });
    } catch (error: any) {
      setResult({
        status: 'error',
        message: 'Hálózati hiba',
        details: error.message
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-card border border-border rounded-lg shadow-xl p-4 max-w-md z-50">
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="text-primary" size={20} />
        <h3 className="font-['Montserrat'] font-bold text-foreground">
          Admin Debug
        </h3>
      </div>

      <button
        onClick={testToken}
        disabled={testing}
        className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-['Montserrat'] font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 mb-3"
      >
        {testing ? 'Tesztelés...' : 'Token Tesztelése'}
      </button>

      {result && (
        <div className={`p-3 rounded-lg border ${
          result.status === 'success' 
            ? 'bg-green-500/10 border-green-500/30 text-green-500'
            : 'bg-red-500/10 border-red-500/30 text-red-500'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {result.status === 'success' ? (
              <CheckCircle size={16} />
            ) : (
              <XCircle size={16} />
            )}
            <p className="font-bold text-sm">{result.message}</p>
          </div>
          
          {result.details && (
            <pre className="text-xs overflow-auto max-h-40 bg-background/50 p-2 rounded mt-2">
              {JSON.stringify(result.details, null, 2)}
            </pre>
          )}
        </div>
      )}

      <div className="mt-3 text-xs text-muted-foreground">
        <p>Token length: {localStorage.getItem('admin_access_token')?.length || 0}</p>
      </div>
    </div>
  );
}
