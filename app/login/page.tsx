'use client';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else router.push('/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md p-8">
        <h1 className="text-4xl font-bold text-center mb-2">Welcome back</h1>
        <p className="text-zinc-400 text-center mb-8">Sign in to JagX AI</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl" required />
          <button type="submit" disabled={loading} className="w-full py-4 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 disabled:opacity-70">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-zinc-500">
          No account? <Link href="/signup" className="text-blue-400">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
