'use client';
import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Copy, Trash2 } from 'lucide-react';

export default function ApiKeys() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [keys, setKeys] = useState<any[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [copied, setCopied] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login');
      else {
        setUser(data.user);
        fetchKeys(data.user.id);
      }
    });
  }, [router]);

  const fetchKeys = async (userId: string) => {
    const { data } = await supabase.from('api_keys').select('*').eq('user_id', userId);
    setKeys(data || []);
  };

  const generateKey = async () => {
    if (!newKeyName.trim() || !user) return alert("Enter a name");
    const keyValue = 'jx_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    await supabase.from('api_keys').insert({
      user_id: user.id,
      name: newKeyName,
      key: keyValue,
    });
    setNewKeyName('');
    fetchKeys(user.id);
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const revokeKey = async (id: string) => {
    if (!confirm("Revoke this key?")) return;
    await supabase.from('api_keys').delete().eq('id', id);
    if (user) fetchKeys(user.id);
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🔑 API Key Management</h1>

        <div className="bg-zinc-900 p-8 rounded-3xl mb-12">
          <div className="flex gap-3">
            <input 
              value={newKeyName} 
              onChange={(e) => setNewKeyName(e.target.value)} 
              placeholder="Key name (e.g. Mobile App)" 
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4" 
            />
            <button onClick={generateKey} className="bg-white text-black px-10 py-4 rounded-2xl font-medium">Create Key</button>
          </div>
        </div>

        <h2 className="text-2xl mb-6">Your Keys ({keys.length})</h2>
        <div className="space-y-4">
          {keys.map((k) => (
            <div key={k.id} className="bg-zinc-900 p-6 rounded-3xl flex items-center justify-between">
              <div>
                <p className="font-semibold">{k.name}</p>
                <div className="flex items-center gap-3 mt-2">
                  <code className="bg-black px-4 py-2 rounded-xl text-emerald-400 text-sm break-all">{k.key}</code>
                  <button onClick={() => copyKey(k.key)} className="text-zinc-400 hover:text-white">
                    <Copy size={18} />
                  </button>
                </div>
              </div>
              <button onClick={() => revokeKey(k.id)} className="text-red-400 hover:text-red-500">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
                           }
