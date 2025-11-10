import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import OnlyOfficePage from "./pages/OnlyOfficePage.jsx";

export default function App() {
  const [isDocspaceOpen, setIsDocspaceOpen] = useState(false);

  if (isDocspaceOpen) {
    return <OnlyOfficePage onBack={() => setIsDocspaceOpen(false)} />;
  }

  return <LoginPage onEnter={() => setIsDocspaceOpen(true)} />;
}
