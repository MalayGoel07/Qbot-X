import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import LogSignPage from "./components/LogSignPage";
import App from "./App";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<App />} />
      <Route path="/logsign" element={<LogSignPage/>} />
    </Routes>
  );
}