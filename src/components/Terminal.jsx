import React, { useState, useEffect, useRef } from "react";
export default function TerminalComponent() {
  const [commandHistory, setCommandHistory] = useState([
    { text: "Welcome to eDEX-UI 2.2.0 - Electron v6.1.12", type: "system" },
    { text: "", type: "empty" },
    { text: "~/edex-ui> neofetch", type: "command" },
    {
      text: `
      .$$$$$$$.
      $$$$$$$$$$
      $$$    $$$
      $$$    $$$
      $$$    $$$
      $$$    $$$
      $$$$$$$$$$
      .$$$$$$$.

OS: Debian GNU/Linux 9.9 (stretch) x86_64
Host: XPS 13 9370
Kernel: 4.9.0-9-amd64
Uptime: 48:00:01m
Packages: 2119
Shell: bash 4.4.12
Resolution: 1920x1080, 1920x1080
DE: GNOME
WM: GNOME Shell
Terminal: edex-ui
CPU: Intel i5-8250U (4) @ 3.4GHz
GPU: NVIDIA GeForce GTX 650M
Memory: 4932MB / 7872MB`,
      type: "output",
    },
  ]);
  const [currentCommand, setCurrentCommand] = useState("");
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [commandHistory]);

  return (
    <div className="bg-[#222021] border border-[#97b9bb] overflow-hidden text-[#white] rounded-lg shadow-lg p-4 h-full w-full">
      {/* Terminal Header */}
      <div className="text-xs mb-2 flex justify-between items-center border-b border-[#97b9bb] pb-2">
        <span className="text-[white]">MAIN SHELL</span>
        <div className="flex gap-4 text-[#white]">
          <span>EMPTY</span>
          <span>EMPTY</span>
          <span>EMPTY</span>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="h-[calc(100%-2rem)] overflow-auto font-mono text-sm leading-relaxed">
        {commandHistory.map((entry, i) => (
          <div key={i} className="mb-2">
            {entry.type === "command" && (
              <span className="text-[white]">{entry.text}</span>
            )}
            {entry.type === "output" && (
              <pre className="text-[#white] whitespace-pre">{entry.text}</pre>
            )}
            {entry.type === "system" && (
              <span className="text-[white]">{entry.text}</span>
            )}
          </div>
        ))}
        {/* Blinking Cursor */}
        <div className="flex">
          <span className="text-[white]">~/edex-ui&gt;</span>
          <span className="ml-1 animate-pulse">█</span>
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
