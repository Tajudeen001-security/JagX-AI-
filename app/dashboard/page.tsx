'use client';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login');
      } else {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, [router]);

  if (loading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  const isAdmin = user.email === 'jagwazorld@gmail.com';

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">JagX AI Dashboard</h1>
          <button 
            onClick={() => supabase.auth.signOut().then(() => router.push('/login'))} 
            className="px-6 py-2 border border-zinc-700 rounded-full hover:bg-zinc-900"
          >
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/chat" className="bg-zinc-900 p-8 rounded-3xl hover:bg-zinc-800 transition border border-zinc-800">
            <h2 className="text-2xl font-semibold mb-3">💬 AI Chat
