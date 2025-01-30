import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TopBar from "./components/Topbar";
import SystemStats from "./components/SystemStats";
import TerminalComponent from "./components/Terminal";
import NetworkStatus from "./components/NetworkStatus";
import FileSystem from "./components/FileSystem";
import CyberKeyboard from "./components/Keyboard";
import beepSound from "./assets/audio/info.wav"; 
import startupSound from "./assets/audio/theme.wav"; 
const bootLogs = [
  "FireWire (OHCI) Lucent ID 5901 built-in now active, GUID c82a14fffee4a086; max speed s800.",
  "rooting via boot-uuid from /chosen: F5670083-AC74-33D3-8361-AC1977EE4AA2",
  "Waiting on &lt;dict ID=&quot;0&quot;&gt;&lt;key&gt;IOProviderClass&lt;/key&gt;&lt;string ID=&quot;1&quot;&gt;",
  "IOResources&lt;/string&gt;&lt;key&gt;IOResourceMatch&lt;/key&gt;&lt;string ID=&quot;2&quot;&gt;boot-uuid-media&lt;/string&gt;&lt;/dict&gt;",
  "Got boot r/IOAHCIBlockStorageDevice/IOBlockStorageDriver/",
  "eDEX SSD TS128C Media/IOGUIDPartitionScheme/Customer@2",
  "BSD root: disk0s2, major 14, minor 2",
  "IOThunderboltSwitch::i2cWriteDWord - status = 0x00000000",
  "IOThunderboltSwitch::i2cWriteDWord - status = 0xe00002ed",
  "IOThunderboltSwitch::i2cWriteDWord - status = 0xe00002ed",
  "eDEXUSBMultitouchDriver::checkStatus - received Status Packet, Payload 2: device was reinitialized",
  "MottIsAScrub::checkstatus - true, Mott::Scrub",
  "[IOBluetoothHCIController::setConfigState] calling registerService",
  "AirPort_Brcm4331: Ethernet address e4:ce:8f:46:18:d2",
  "IO80211Controller::dataLinkLayerAttachComplete():",
  "IO80211Interface::efiNVRAMPublished():",
  "Created virtif 0xffffff800c32ee00 p2p0",
  "BCM5701Enet: Ethernet address c8:2a:14:57:a4:7a",
  "Previous Shutdown Cause: 3",
  "NTFS driver 3.8 [Flags: R/W].",
  "NTFS volume name BOOTCAMP, version 3.1.",
  "DSMOS has arrived",
  "en1: 802.11d country code set to &#039;US&#039;.",
  "en1: Supported channels 1 2 3 4 5 6 7 8 9 10 11 36 40 44 48 52 56 60 64 100 104 108 112 116 120 124 128 132 136 140 149 153 157 161 165",
  "MacAuthEvent en1   Auth result for: 00:60:64:1e:e9:e4  MAC AUTH succeeded",
  "MacAuthEvent en1   Auth result for: 00:60:64:1e:e9:e4 Unsolicited  Auth",
  "wlEvent: en1 en1 Link UP",
  "AirPort: Link Up on en1",
  "en1: BSSID changed to 00:60:64:1e:e9:e4",
  "virtual bool IOHIDEventSystemUserClient::initWithTask(task, void, UInt32):",
  "Client task not privileged to open IOHIDSystem for mapping memory (e00002c1)",
  "Boot Complete"
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [showEDexUI, setShowEDexUI] = useState(false);
  const logsEndRef = useRef(null);
  console.log("Beep sound path:", beepSound);

  useEffect(() => {
    bootLogs.forEach((log, index) => {
      setTimeout(() => {
        setVisibleLogs((prev) => [...prev, log]);
  
       // Create a new audio object each time to prevent overlapping
      const beep = new Audio(beepSound);
      beep.volume = 0.2;
      beep.muted = true;
      beep.play().then(() => {
        setTimeout(() => {
            beep.muted = false;
        }, 50).catch(err => console.error("Autoplay blocked:", err));
      })
  
        setTimeout(() => {
          if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 50);
      }, index * 200);
    });
  
    setTimeout(() => setShowEDexUI(true), bootLogs.length * 200 + 1000);
    setTimeout(() => setLoading(false), bootLogs.length * 200 + 3000);
  }, []);
  

 return (
    <div className="h-screen w-full">
      {loading ? (
        showEDexUI ? <EDexUIText /> : <BootScreen logs={visibleLogs} logsEndRef={logsEndRef} />
      ) : (
        <MainApp />
      )}
    </div>
  );}

function BootScreen({ logs, logsEndRef }) {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#222021] text-[white] font-mono p-5">
      <div className="h-screen w-full p-5 overflow-auto">
        {logs.map((log, index) => (
          <motion.p key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="mb-1">
            {log}
          </motion.p>
        ))}
        {/* Invisible div to auto-scroll to bottom */}
        <div ref={logsEndRef}></div>
      </div>
      {/* Blinking cursor effect */}
      
      <p className="mt-4 text-xs animate-pulse">System Booting..._</p>
    </div>
    
  );
}

function TypingText({ text, speed = 150 }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <h1 className="text-6xl font-bold tracking-wider">{displayText}</h1>;
}


// eDEX-UI Text Component
function EDexUIText() {
  useEffect(() => {
    const startupChime = new Audio(startupSound);
    startupChime.volume = 0.5; // Adjust volume
    startupChime.play().catch((err) => console.error("Startup sound error:", err)); // Catch errors
  }, []); // Runs when component mounts

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#222021] text-[white]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -50 }} // Starts faded out and slightly above
        animate={{ opacity: 1, scale: 1, y: 0 }} // Fades in and moves into position
        exit={{ opacity: 0, scale: 1.2, y: 50 }} // Exits with slight zoom-out and downward motion
        transition={{ duration: 1, ease: "easeInOut" }}
        className="border-4 bg-[#222021] px-6 py-2"
      >
        <TypingText text="eDEX-UI" speed={150} />
      </motion.div>
    </div>
  );
}



function MainApp() {
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
    <div className="h-screen w-full p-4 bg-[#222021] text-[white] font-mono">
      <TopBar time={time} />

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
