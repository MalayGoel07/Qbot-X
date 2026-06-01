import { useState,useEffect } from "react";
import base from "./api/base";
import HistoryPanel from "./components/HistoryPanel";
import ModelsPanel from "./components/ModelsPanel";
import ThoughtsModal from "./components/ThoughtsModal";
import OutputBox from "./components/OutputBox";
import InputBar from "./components/InputBar";
import ActionBar from "./components/ActionBar";
import TopBar from "./components/TopBar";
import ProfilePanel from "./components/ProfilePanel";
import SettingPanel from "./components/SettingPanel";

function App() {
  const [input,setInput]=useState("");
  const [output,setOutput]=useState("");
  const [loading,setLoading]=useState(false);
  const [history, setHistory] = useState(() => {
      const token = localStorage.getItem("token");
      const saved = localStorage.getItem(`history_${token}`);
      return saved ? JSON.parse(saved) : [];
    });
  const [thought,setThought]=useState("");
  const [showThoughts,setShowThoughts]=useState(false);
  const [showHistory,setShowHistory]=useState(false);
  const [showModels,setShowModels]=useState(false);
  const [showProfile,setShowProfile]=useState(false);
  const [showSettings,setShowSettings]=useState(false);

  const send = async () => {
    if (!input.trim())
      return;

    setLoading(true);
    setOutput("");

    const result = await base(input, (chunk) => setThought(chunk), history);
    const match = result.match(/\[Final\]([\s\S]*?)(?:\[DONE\]|$)/i);
    const finalText = match ? match[1].trim() : result;

    setOutput(finalText);
    setHistory((prev) => [...prev,{ role:"user",content: input },{ role:"assistant",content: finalText }]);
    setLoading(false);
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) 
      localStorage.setItem(`history_${token}`, JSON.stringify(history));},[history]);

  const clearChat = () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem(`history_${token}`);
    setHistory([]);
    setOutput("");
  };

  const openSettings = ()=>{ setShowSettings(true); setShowProfile(false); setShowHistory(false); setShowModels(false); };
  const openProfile = ()=>{ setShowProfile(true); setShowHistory(false); setShowModels(false); setShowSettings(false); };
  const openHistory = ()=>{ setShowHistory(true); setShowModels(false); setShowProfile(false); setShowSettings(false); };
  const openModels = ()=>{ setShowModels(true); setShowHistory(false); setShowProfile(false); setShowSettings(false); };
  const onNewChat = ()=>{ setThought(""); setHistory([]); setInput(""); setOutput(""); };

  return (
    <div className="max-h-screen min-h-screen bg-[#0a0f18] text-white flex">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="strip absolute w-full h-px top-[20%]" style={{ animationDuration: '2.8s' }}></div>
        <div className="strip absolute w-full h-[3px] top-[20%] blur-sm opacity-50" style={{ animationDuration: '2.8s' }}></div>
        <div className="strip absolute w-full h-px top-[50%] opacity-40"  style={{ animationDuration: '3.5s', animationDelay: '-1.5s' }}></div>
        <div className="strip absolute w-full h-[3px] top-[50%] blur-sm opacity-30" style={{ animationDuration: '3.5s', animationDelay: '-1.5s' }}></div>
        <div className="strip absolute w-full h-px top-[78%] opacity-30"  style={{ animationDuration: '4s',   animationDelay: '-2.8s' }}></div>
      </div>        
      {showHistory && (<HistoryPanel history={history} onClear={clearChat} onClose={() => setShowHistory(false)} z-50/>)}
      {showModels && (<ModelsPanel onClose={() => setShowModels(false)} z-50/>)}
      <div className="flex-1 flex flex-col items-center justify-center p-5 gap-4 z-50">
          <TopBar onProfile={openProfile} onSettings={openSettings}/>
          <div className="flex flex-row gap-4 w-[1000px] item-center justify-center">
            <OutputBox output={output} onSend={send} loading={loading}/>
            <ActionBar onThoughts={() => setShowThoughts(true)} onHistory={openHistory} onModels={openModels} onNewChat={onNewChat}/>
          </div>
          <InputBar input={input} onChange={setInput} onSend={send} loading={loading}/>
      </div>
      {showThoughts && (<ThoughtsModal thought={thought} onClose={() => setShowThoughts(false)} z-50/>)}
      {showProfile && (<ProfilePanel onClose={() => setShowProfile(false)} z-50/>)}
      {showSettings && (<SettingPanel onClose={() => setShowSettings(false)} z-50/>)}
    </div>
  );
}

export default App;