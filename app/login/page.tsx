'use client';
import { useState } from 'react';
import { useSupabase } from '@/components/providers/supabase-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = useSupabase();

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
          <p className="text-zinc-400">Sign in to JagX AI</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500"
          />
          <Button onClick={handleLogin} disabled={loading} className="w-full py-3 text-base">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>
        
        <p className="text-center mt-6 text-sm text-zinc-500">
          Don&apos;t have an account? <Link href="/signup" className="text-violet-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
      }
