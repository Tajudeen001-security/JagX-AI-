'use client';
import { useEffect, useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return <div>Loading...</div>;

  const isAdmin = user.email === 'jagwazorld@gmail.com';

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">JagX AI Dashboard</h1>
          <div className="flex gap-4">
            <button onClick={() => supabase.auth.signOut()} className="px-6 py-2 border border-zinc-700 rounded-full">Logout</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/chat" className="bg-zinc-900 p-8 rounded-3xl hover:bg-zinc-800 transition border border-zinc-800">
            <h2 className="text-2xl font-semibold mb-3">💬 AI Chat</h2>
            <p className="text-zinc-400">Talk to Grok-like agent. Ask anything, get code.</p>
          </Link>

          <Link href="/skills" className="bg-zinc-900 p-8 rounded-3xl hover:bg-zinc-800 transition border border-zinc-800">
            <h2 className="text-2xl font-semibold mb-3">🛠️ My Skills</h2>
            <p className="text-zinc-400">Install custom skills to make the agent smarter.</p>
          </Link>

          <Link href="/marketplace" className="bg-zinc-900 p-8 rounded-3xl hover:bg-zinc-800 transition border border-zinc-800">
            <h2 className="text-2xl font-semibold mb-3">🛒 API Marketplace</h2>
            <p className="text-zinc-400">Discover & use APIs.</p>
          </Link>

          {isAdmin && (
            <Link href="/admin" className="bg-amber-900 p-8 rounded-3xl hover:bg-amber-800 transition border border-amber-700 col-span-full md:col-span-1">
              <h2 className="text-2xl font-semibold mb-3">🔧 Admin Panel</h2>
              <p>Manage users & payments</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
          }
