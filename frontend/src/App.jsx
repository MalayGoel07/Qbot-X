import { useState } from "react";
import base from "./api/base";
import HistoryPanel from "./components/HistoryPanel";
import ModelsPanel from "./components/ModelsPanel";
import ThoughtsModal from "./components/ThoughtsModal";
import OutputBox from "./components/OutputBox";
import InputBar from "./components/InputBar";
import ActionBar from "./components/ActionBar";
import TopBar from "./components/TopBar";

function App() {
  const [input,setInput]=useState("");
  const [output,setOutput]=useState("");
  const [loading,setLoading]=useState(false);
  const [history,setHistory]=useState([]);
  const [thought,setThought]=useState("");
  const [showThoughts,setShowThoughts]=useState(false);
  const [showHistory,setShowHistory]=useState(true);
  const [showModels,setShowModels]=useState(false);
  const send = async () => {
    if (!input.trim())
      return;

    setLoading(true);
    setOutput("");

    const result = await base(input, (chunk) => setThought(chunk), history);
    const match = result.match(/\[Final\]([\s\S]*?)\[DONE\]/i);
    const finalText = match ? match[1].trim() : result;

    setOutput(finalText);
    setHistory((prev) => [...prev,{ role:"user",content: input },{ role:"assistant",content: finalText }]);
    setLoading(false);
  };

  const openHistory = ()=>{ setShowHistory(true); setShowModels(false); };
  const openModels = ()=>{ setShowModels(true); setShowHistory(false); };
  const clearChat = ()=>{ setHistory([]); setOutput(""); };
  const onNewChat = ()=>{ setThought(""); setHistory([]); setInput(""); setOutput(""); };

  return (
    <div className="max-h-screen min-h-screen bg-slate-950 text-white flex">
      {showHistory && (<HistoryPanel history={history} onClear={clearChat} onClose={() => setShowHistory(false)}/>)}
      {showModels && (<ModelsPanel onClose={() => setShowModels(false)} />)}
      <div className="flex-1 flex flex-col items-center justify-center p-5 gap-4">
          <TopBar />
          <div className="flex flex-row gap-4 w-[1000px] item-center justify-center">
            <OutputBox output={output} onSend={send} loading={loading}/>
            <ActionBar onThoughts={() => setShowThoughts(true)} onHistory={openHistory} onModels={openModels} onNewChat={onNewChat}/>
          </div>
          <InputBar input={input} onChange={setInput} onSend={send} loading={loading}/>
      </div>
      {showThoughts && (<ThoughtsModal thought={thought} onClose={() => setShowThoughts(false)} />)}
    </div>
  );
}

export default App;