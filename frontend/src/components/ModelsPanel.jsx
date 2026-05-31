const MODELS = [
  { agent: "Router", model: "llama3.1:8b" },
  { agent: "Research", model: "qwen2.5:3b" },
  { agent: "Writer",model: "phi4-mini:latest" },
  { agent: "Coder",model: "qwen2.5-coder:7b" },
  { agent: "Maths", model: "llama3.1:8b" },
  { agent: "Merger", model: "phi4-mini:latest" },
];

function ModelsPanel({ onClose }) {
  return (
    <div className="w-[350px] border-r border-zinc-800 bg-slate-900 p-4 flex flex-col">
      <div className="flex items-baseline justify-between mb-5">
        <span className="text-[18px] font-medium text-blue-500 uppercase tracking-widest">Models</span>
        <button onClick={onClose} className="text-[12px] font-mono text-red-400 transition-colors">✕ close</button>
      </div>
      <div className="flex flex-col">
        {MODELS.map(({ agent, model }, i) => (
          <div key={agent} className={`flex items-center justify-between py-3 ${   i < MODELS.length - 1 ? "border-b border-zinc-800" : "" }`}  >
            <span className="text-sm font-medium text-zinc-100">{agent}</span>
            <div className="flex items-center gap-2"><span className="text-xs font-mono text-zinc-400">{model}</span><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ModelsPanel