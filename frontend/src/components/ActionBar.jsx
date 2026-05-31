function ActionBar({ onNewChat,onThoughts, onHistory, onModels}) {
  const btn = "flex items-center justify-center bg-slate-900 hover:bg-slate-950 border border-zinc-700/50 text-zinc-300 hover:border-blue-500 hover:text-white text-sm font-medium px-4 h-[40px] w-[40px] rounded-xl transition-all duration-200 active:scale-95";
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-slate-900 backdrop-blur-xl hover:border-blue-500 rounded-[30px] w-[57px] shadow-2xl p-2">
      <button onClick={onNewChat} className={btn} title="New Chat">+</button>
      <button onClick={onThoughts} className={btn} title="Thoughts">💭</button>
      <button onClick={onHistory} className={btn} title="History">His</button>
      <button onClick={onModels} className={btn} title="Models">Ai</button>
    </div>
  );
}
export default ActionBar