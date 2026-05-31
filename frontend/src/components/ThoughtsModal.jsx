const TAG_COLORS = {
  "[Router]":"text-red-300",
  "[Math]":"text-indigo-300",
  "[Merger]":"text-green-300",
  "[Coder]":"text-blue-300",
  "[Writer]":"text-yellow-200",
  "[Researcher]":"text-white",
  "[Final]":"text-teal-200",
};

function ThoughtsModal({ thought, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-zinc-500 rounded-3xl p-6 w-[800px] shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-cyan-400">AI Thoughts</h2>
          <button onClick={onClose} className="text-red-400 hover:text-red-300">✕</button>
        </div>

        <div className="max-h-[400px] overflow-y-auto scrollbar-thumb-cyan-200 scrollbar-thin">
          {thought.length === 0 ? (<div className="text-zinc-300">No thoughts available...</div>
          ):(
            <p className="whitespace-pre-wrap break-words gap-1">
              {thought.split("\n").map((line, i) => {
                const matchedTag = Object.keys(TAG_COLORS).find((tag) => line.startsWith(tag));
                return (<p key={i} className={matchedTag ? TAG_COLORS[matchedTag] : "text-zinc-300"}>{line}</p>);
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ThoughtsModal