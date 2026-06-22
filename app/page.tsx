import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <nav className="border-b border-zinc-800 px-6 py-5 flex justify-between items-center">
        <div className="text-3xl font-bold tracking-tighter">JagX AI</div>
        <div className="flex gap-4">
          <Link href="/login" className="px-6 py-2.5 rounded-full hover:bg-zinc-900">Login</Link>
          <Link href="/signup" className="px-6 py-2.5 bg-white text-black rounded-full font-medium">Get Started</Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold tracking-tighter mb-6">Your AI Coding Agent</h1>
          <p className="text-2xl text-zinc-400 mb-10">Chat • Code • Preview • Custom Skills • Like Grok + Claude</p>
          <Link href="/dashboard" className="inline-block bg-white text-black px-10 py-4 rounded-2xl text-xl font-medium hover:bg-zinc-200">
            Enter JagX AI →
          </Link>
        </div>
      </main>
    </div>
  );
}
