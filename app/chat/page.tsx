'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useUser } from '@supabase/auth-helpers-react';

export default function Chat() {
  const user = useUser();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // Grok-like mock response (no API key needed)
    setTimeout(() => {
      const responses = [
        "Here's a complete solution:\n\n```tsx\n// Your code here\n```",
        "Thinking step by step... This is how you can implement it.",
        "Great question! Let me give you a detailed answer with examples.",
      ];
      const reply = responses[Math.floor(Math.random() * responses.length)] + "\n\n" + input;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-950">
      <div className="border-b border-zinc-800 p-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">JagX AI Chat</h1>
        <div className="text-sm text-zinc-400">Grok-style • No key needed</div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-zinc-500 mt-20">
            Ask anything — coding, questions, ideas
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`max-w-3xl ${msg.role === 'user' ? 'ml-auto bg-zinc-800' : 'mr-auto bg-zinc-900'} p-5 rounded-3xl`}>
            <ReactMarkdown className="prose prose-invert max-w-none">{msg.content}</ReactMarkdown>
          </div>
        ))}
        {loading && <div className="text-zinc-500">Thinking...</div>}
      </div>

      <div className="p-4 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask JagX AI anything..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none"
          />
          <button onClick={sendMessage} disabled={loading} className="bg-white text-black px-8 rounded-2xl font-medium">Send</button>
        </div>
      </div>
    </div>
  );
            }
