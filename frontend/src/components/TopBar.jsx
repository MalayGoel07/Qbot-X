import { useState } from "react";

function TopBar({ onProfile }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between w-full bg-slate-950">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
        <h1 className="text-[22px] font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          CB-X
        </h1>
      </div>
      <div className="relative">
        <button
          className="w-9 h-9 rounded-full bg-slate-800 border border-slate-800 text-white font-bold hover:border-blue-500 hover:shadow-lg hover:bg-slate-900 hover:shadow-cyan-500/20 hover:scale-105 active:bg-slate-900 active:border-blue-500 transition-all duration-300"
          onClick={() => setOpen((prev) => !prev)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        >P</button>
        {open && (
          <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-zinc-700 rounded-lg shadow-xl shadow-black/40 z-50 p-3 flex flex-col gap-2">
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Account</div>
            <button onClick={() => { onProfile(); setOpen(false); }} className="text-left text-sm text-white hover:text-blue-500 transition-colors px-1 py-1">👤 View Profile</button>
            <button className="text-left text-sm text-white hover:text-blue-500 transition-colors px-1 py-1">⚙️ Settings</button>
            <hr className="border-zinc-700 my-1" />
            <button className="text-left text-sm text-red-300 hover:text-red-400 transition-colors px-1 py-1">🚪 Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopBar;