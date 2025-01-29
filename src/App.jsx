import React, { useState, useEffect } from "react";
import TopBar from "./components/Topbar";
import SystemStats from "./components/SystemStats";
import TerminalComponent from "./components/Terminal";
import NetworkStatus from "./components/NetworkStatus";
import FileSystem from "./components/FileSystem";
import CyberKeyboard from "./components/Keyboard";

export default function App() {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [fileSystem, setFileSystem] = useState([
    { name: "blob_storage", type: "folder", open: false, files: ["file1.txt", "file2.log"] },
    { name: "Cache", type: "folder", open: false, files: [] },
    { name: "databases", type: "folder", open: false, files: ["db1.sqlite", "db2.sqlite"] },
    { name: "themes", type: "folder", open: false, files: [] },
    { name: "GPUCache", type: "folder", open: false, files: [] },
    { name: "IndexedDB", type: "folder", open: false, files: [] },
    { name: "Cookies", type: "file" },
  ]);

  const toggleFolder = (index) => {
    setFileSystem((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, open: !item.open } : item
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 100));
      setMemoryUsage(Math.floor(Math.random() * 100));
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full p-4 bg-[#1c1f21] text-[#97b9bb] font-mono">
      {/* Top Navigation Bar */}
      <TopBar time={time} />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-4 gap-2 flex-grow h-[57%] mt-2">
        <div className="col-span-1 bg-black/30 p-2 rounded-lg h-[61vh]">
          <SystemStats cpuUsage={cpuUsage} memoryUsage={memoryUsage} />
        </div>

        <div className="col-span-2 bg-[#1c1f21] p-2 rounded-lg flex h-[61vh]">
          <TerminalComponent />
        </div>

        <div className="col-span-1 bg-black/30 p-2 rounded-lg h-[61vh]">
          <NetworkStatus />
        </div>
      </div>

      {/* File System & Keyboard Parallel Layout */}
      <div className="grid grid-cols-2 gap-4 mt-14 h-[30%]">
        <div className="bg-black/30 p-4 rounded-lg overflow-hidden">
          <FileSystem files={fileSystem} toggleFolder={toggleFolder} />
        </div>
        <div className="bg-black/30 rounded-lg overflow-hidden">
          <CyberKeyboard />
        </div>
      </div>
    </div>
  );
}
