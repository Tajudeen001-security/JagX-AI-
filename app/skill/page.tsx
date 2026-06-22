'use client';
import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function Skills() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [skills, setSkills] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login');
      else {
        setUser(data.user);
        fetchSkills(data.user.id);
      }
    });
  }, []);

  const fetchSkills = async (userId: string) => {
    const { data } = await supabase.from('skills').select('*').eq('user_id', userId);
    setSkills(data || []);
  };

  const addSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !user) return alert("Name and code required");
    await supabase.from('skills').insert({ user_id: user.id, name, description, code });
    setName(''); setDescription(''); setCode('');
    fetchSkills(user.id);
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🛠️ My Custom Skills</h1>
        <form onSubmit={addSkill} className="bg-zinc-900 p-8 rounded-3xl mb-12">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Skill Name" className="w-full mb-4 p-4 bg-zinc-800 rounded-xl" required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full mb-4 p-4 bg-zinc-800 rounded-xl h-20" />
          <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code or Instructions" className="w-full p-4 bg-zinc-800 rounded-xl h-48 font-mono" required />
          <button type="submit" className="mt-4 bg-white text-black px-8 py-3 rounded-2xl">Install Skill</button>
        </form>

        <h2 className="text-2xl mb-6">Installed Skills ({skills.length})</h2>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-zinc-900 p-6 rounded-3xl">
              <h3 className="font-semibold text-xl">{skill.name}</h3>
              <pre className="mt-4 bg-black/50 p-4 rounded-xl text-sm overflow-auto">{skill.code}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
