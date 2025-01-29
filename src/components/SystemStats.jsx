import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SystemStats() {
  const [cpuData1, setCpuData1] = useState([]);
  const [cpuData2, setCpuData2] = useState([]);
  const [cpuAvg1, setCpuAvg1] = useState(55);
  const [cpuAvg2, setCpuAvg2] = useState(58);
  const [temperature, setTemperature] = useState(62);
  const [minGHz, setMinGHz] = useState(2.94);
  const [maxGHz, setMaxGHz] = useState(2.99);
  const [tasks, setTasks] = useState(257);
  const [ramUsed, setRamUsed] = useState(3);
  const [ramTotal] = useState(7.8);
  const [swapUsed, setSwapUsed] = useState(0.2);
  const [processes, setProcesses] = useState([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Update time
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
      setDate(
        now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).toUpperCase()
      );
    }, 1000);

    // Simulated CPU & System Stats (Replace with real system APIs)
    const statsTimer = setInterval(() => {
      const newUsage1 = Math.random() * 100;
      const newUsage2 = Math.random() * 100;
      setCpuAvg1((prev) => Math.round((prev + newUsage1) / 2));
      setCpuAvg2((prev) => Math.round((prev + newUsage2) / 2));

      setCpuData1((prev) => [...prev.slice(-50), { time: new Date().toLocaleTimeString("en-US", { hour12: false }), usage: newUsage1 }]);
      setCpuData2((prev) => [...prev.slice(-50), { time: new Date().toLocaleTimeString("en-US", { hour12: false }), usage: newUsage2 }]);

      setRamUsed(Math.random() * ramTotal);
      setSwapUsed(Math.random() * 1);

      setProcesses([
        { pid: "5638", name: "edex-ui", cpu: "10.3%", mem: "2%" },
        { pid: "6262", name: "gnome-shell", cpu: "5.4%", mem: "1.8%" },
        { pid: "1317", name: "xorg", cpu: "4.1%", mem: "0.4%" },
        { pid: "2316", name: "xorg", cpu: "2.8%", mem: "1.4%" },
      ]);
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(statsTimer);
    };
  }, [ramTotal]);

  return (
    <div className="text-[#97b9bb] p-4 font-mono text-xs">
      {/* Large Clock */}
      <div className="text-3xl tracking-widest text-center">{time}</div>

      {/* System Info */}
      <div className="text-xs opacity-80 flex justify-between mb-2">
        <span>{date}</span>
        <span>UPTIME 1:09:51</span>
        <span>TYPE Linux</span>
        <span>POWER CHARGE</span>
      </div>
      <div className="text-xs opacity-80 flex justify-between mb-2">
        <span>MANUFACTURER ASUS</span>
        <span>MODEL G551JK</span>
        <span>CHASSIS Notebook</span>
      </div>

      {/* CPU Usage */}
      <div className="mb-6">
        <div className="text-xs mb-1">CPU USAGE</div>
        <div className="text-[10px] flex justify-between">
          <span>#1 - 2 Avg {cpuAvg1}%</span>
          <span>#3 - 4 Avg {cpuAvg2}%</span>
        </div>
        <ResponsiveContainer width="100%" height={70}>
          <LineChart>
            <XAxis dataKey="time" hide />
            <YAxis domain={[0, 100]} hide />
            <Tooltip />
            <Line data={cpuData1} type="monotone" dataKey="usage" stroke="#97b9bb" strokeWidth={2} dot={false} animationDuration={800} />
            {/* <Line data={cpuData2} type="monotone" dataKey="usage" stroke="#97b9bb" strokeWidth={2} dot={false} animationDuration={800} /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Temperature & Performance Stats */}
      <div className="mb-2">
        <div className="flex justify-between text-xs">
          <span>TEMP</span>
          <span>MIN</span>
          <span>MAX</span>
          <span>TASKS</span>
        </div>
        <div className="text-xs opacity-80 flex justify-between ">
          <span>{temperature}°C</span>
          <span>{minGHz}GHz</span>
          <span>{maxGHz}GHz</span>
          <span>{tasks}</span>
        </div>
      </div>

      {/* Memory Usage */}
      <div className="">
        <div className="text-xs">MEMORY</div>
        <div className="text-xs opacity-80 mt-1">USING {ramUsed.toFixed(1)} GB OUT OF {ramTotal} GB</div>
        <div className="h-1 bg-[#97b9bb] mt-1" style={{ width: `${(ramUsed / ramTotal) * 100}%` }} />
      </div>

      {/* Swap Usage */}
      <div className="mb-4">
        <div className="text-xs mt-2">SWAP</div>
        <div className="text-xs opacity-80 mt-1">{swapUsed.toFixed(1)} GB</div>
        <div className="h-1 bg-[#97b9bb] mt-1" style={{ width: `${(swapUsed / 1) * 100}%` }} />
      </div>

      {/* Top Processes */}
      <div>
        <div className="text-xs mb-2">TOP PROCESSES</div>
        <div className="space-y-[2px] text-[10px]">
          {processes.map((proc, i) => (
            <div key={i} className="flex justify-between opacity-80">
              <span className="w-12">{proc.pid}</span>
              <span className="flex-1 px-2">{proc.name}</span>
              <span>{proc.cpu}</span>
              <span>{proc.mem}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
