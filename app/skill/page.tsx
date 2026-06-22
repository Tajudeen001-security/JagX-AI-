'use client';
import { useState, useEffect } from 'react';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export default function Skills() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [skills, setSkills] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    if (!session) router.push('/login');
    else fetchSkills();
  }, [session]);

  const fetchSkills = async () => {
    const { data } = await supabase.from('skills').select('*');
    setSkills(data || []);
  };

  const addSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) return alert("Name and code required");

    await supabase.from('skills').insert({
      user_id: session?.user.id,
      name,
      description,
      code,
    });
    setName(''); setDescription(''); setCode('');
    fetchSkills();
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🛠️ My Custom Skills</h1>
        <p className="text-zinc-400 mb-8">Install skills here — they will be used by the AI chat to give better answers.</p>

        <form onSubmit={addSkill} className="bg-zinc-900 p-8 rounded-3xl mb-12">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Skill Name (e.g. React Todo Helper)" className="w-full mb-4 p-4 bg-zinc-800 rounded-xl" required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full mb-4 p-4 bg-zinc-800 rounded-xl h-20" />
          <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="JS/TS Code or Prompt Instructions" className="w-full p-4 bg-zinc-800 rounded-xl h-48 font-mono" required />
          <button type="submit" className="mt-4 bg-white text-black px-8 py-3 rounded-2xl">Install Skill</button>
        </form>

        <h2 className="text-2xl mb-6">Installed Skills ({skills.length})</h2>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-zinc-900 p-6 rounded-3xl">
              <h3 className="font-semibold text-xl">{skill.name}</h3>
              <p className="text-sm text-zinc-400 mt-1">{skill.description}</p>
              <pre className="mt-4 bg-black/50 p-4 rounded-xl text-sm overflow-auto">{skill.code}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
          }
