function ProfilePanel({ onClose }) {
  return (
    <div className="w-[360px] min-h-screen bg-slate-900 flex flex-col relative overflow-hidden px-3">
      <div className="flex items-center justify-between px-2 py-5">
        <span className="font-mono text-[16px] font-bold tracking-[0.25em] text-blue-500 uppercase flex items-center gap-2">Profile</span>
        <button onClick={onClose} className="text-[13px] font-mono text-red-400 transition-colors">✕ close</button>
      </div>

      <div className="flex items-center gap-3.5 px-1 py-5 border-b border-[#1a1d27]">
        <div className="w-13 h-13 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#2563eb22] border border-[#2563eb44] flex items-center justify-center font-mono text-lg text-blue-400 shrink-0">JD</div>
        <div className="text-sm font-medium text-slate-200">John Doe</div>
      </div>

      <div className="flex flex-col px-1">
        <div className="flex items-center justify-between py-3 border-b border-zinc-800">
          <span className="text-sm font-medium text-zinc-100">Name</span>
          <input type="text" className="text-xs text-center font-mono text-white outline-none border border-blue-300"/>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-zinc-800">
          <span className="text-sm font-medium text-zinc-100">Email</span>
          <input type="text" className="text-xs text-center font-mono text-white outline-none border border-blue-300" readOnly/>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-zinc-800">
          <span className="text-sm font-medium text-zinc-100">Member Since</span>
          <input type="text" className="text-xs text-center font-mono text-white outline-none border border-blue-300" defaultValue="Jan 2026" readOnly />
        </div>
        <div className="flex items-center justify-between py-3 border-b border-zinc-800">
          <span className="text-sm font-medium text-zinc-100">What should CB-X call u?</span>
          <input type="text" className="text-xs text-center font-mono text-white outline-none border border-blue-300"/>
        </div>
        <div className="flex flex-col item-start justify-between py-3 gap-2">
          <span className="text-sm font-medium text-zinc-100">Instructions?</span>
          <textarea type="text" className="text-xs p-2 font-mono text-white w-[330px] h-[200px] outline-none border border-blue-300"/>
        </div>
      </div>

      <div className="mt-auto px-6 pb-6 pt-5">
        <button className="w-[300px] h-[50px] flex items-center justify-center bg-slate-900 hover:bg-slate-950 border border-zinc-500 text-white hover:border-blue-500 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105 transition-all duration-300 text-sm font-medium px-4 rounded-xl active:scale-95">Save Changes</button>
      </div>
    </div>
  );
}
export default ProfilePanel;