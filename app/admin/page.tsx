'use client';
import { useEffect, useState } from 'react';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!session || session.user.email !== 'jagwazorld@gmail.com') {
      router.push('/dashboard');
      return;
    }
    fetchUsers();
  }, [session]);

  const fetchUsers = async () => {
    const { data } = await supabase.from('profiles').select('*');
    setUsers(data || []);
  };

  const approvePro = async (userId: string) => {
    await supabase.from('profiles').update({ subscription_plan: 'pro', credits: 5000 }).eq('id', userId);
    alert('✅ Subscription approved in real-time!');
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🔧 JagX AI Admin Panel</h1>
        <div className="bg-zinc-900 rounded-3xl p-8">
          <h2 className="text-2xl mb-6">Registered Users</h2>
          {users.map(u => (
            <div key={u.id} className="flex justify-between p-6 bg-zinc-800 rounded-2xl mb-4">
              <div>
                <p className="font-medium">{u.email}</p>
                <p className="text-sm text-zinc-400">Plan: {u.subscription_plan} | Credits: {u.credits}</p>
              </div>
              <button onClick={() => approvePro(u.id)} className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-2xl">Approve Pro Plan</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
                }
