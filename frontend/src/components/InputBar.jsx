import { useState } from "react";

function InputBar({ input, onChange, onSend, loading }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`flex items-center h-[50px] backdrop-blur-xl border rounded-[28px] shadow-2xl px-3 gap-2 transition-all duration-200
      ${focused ? 'bg-slate-950 border-blue-500' : 'bg-slate-900 hover:bg-slate-950 border-slate-900 hover:border-blue-500'}`}>
      <div className="w-px h-6 bg-blue-500 shrink-0" />
      <input
        type="text"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !loading && onSend()}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Ask anything..."
        autoFocus
        className="flex-1 min-w-0 bg-transparent text-white placeholder:text-zinc-500 text-sm outline-none"
      />
      <button onClick={onSend} disabled={loading} className="shrink-0 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-sm px-5 h-[35px] rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20 disabled:hover:scale-100 disabled:shadow-none">
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Thinking…
          </span>
        ) : ("Send")}
      </button>
    </div>
  );
}

export default InputBar;