'use client';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function Chat() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login');
      else setUser(data.user);
    });
  }, [router]);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    // Mock Grok-style response (can be improved later)
    setTimeout(() => {
      const mockResponses = [
        `Understood! Here's a solid implementation for your request:\n\n\`\`\`tsx\n// Example component based on: ${currentInput}\nfunction Example() {\n  return <div>JagX AI Result</div>;\n}\n\`\`\``,
        "Thinking step-by-step... This is a great question. Here's the detailed answer with code examples.",
        "Here's my best response as your coding agent:\n\n" + currentInput.split(' ').slice(0, 8).join(' ') + " can be solved using modern React patterns."
      ];
      const reply = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setLoading(false);
    }, 1100);
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-950">
      <div className="border-b border-zinc-800 p-4 flex items-center justify-between bg-zinc-900">
        <h1 className="text-2xl font-semibold">JagX AI • Grok Mode</h1>
        <div className="text-xs text-emerald-400">No API Key • Mock Intelligence</div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-8">
        {messages.length === 0 && (
          <div className="text-center text-zinc-500 mt-20">
            Ask anything — coding, debugging, explanations, or ideas.
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`max-w-3xl ${msg.role === 'user' ? 'ml-auto bg-zinc-800' : 'mr-auto bg-zinc-900'} p-6 rounded-3xl`}>
            <ReactMarkdown className="prose prose-invert max-w-none text-sm leading-relaxed">
              {msg.content}
            </ReactMarkdown>
          </div>
        ))}
        {loading && <div className="text-zinc-400">JagX is thinking...</div>}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask JagX AI anything (coding, questions...)"
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none placeholder:text-zinc-500"
          />
          <button 
            onClick={sendMessage} 
            disabled={loading || !input.trim()} 
            className="bg-white text-black px-10 rounded-2xl font-medium disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
                                             }
