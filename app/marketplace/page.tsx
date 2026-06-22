export default function Marketplace() {
  const apis = [
    { name: "Weather API", desc: "Real-time weather data", price: "Free" },
    { name: "Image Generator", desc: "Grok Imagine style", price: "10 credits" },
    { name: "Code Executor", desc: "Run code in sandbox", price: "Free" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">🛒 API Marketplace</h1>
        <p className="text-zinc-400 mb-10">Discover powerful APIs to enhance your JagX AI experience</p>

        <div className="grid md:grid-cols-2 gap-6">
          {apis.map((api, i) => (
            <div key={i} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 hover:border-white/30 transition">
              <h3 className="text-2xl font-semibold">{api.name}</h3>
              <p className="text-zinc-400 mt-3">{api.desc}</p>
              <div className="mt-8 flex justify-between items-end">
                <span className="text-emerald-400 font-medium">{api.price}</span>
                <button className="bg-white text-black px-6 py-2.5 rounded-2xl text-sm">Add to JagX</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
