import React, { useState, useEffect } from "react";
import NetworkGlobe from "./Globe";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function NetworkStatus() {
  const [networkData, setNetworkData] = useState([]);
  const [ipAddress, setIpAddress] = useState("194.187.249.35");
  const [ping, setPing] = useState(16);
  const [uploadSpeed, setUploadSpeed] = useState(150);
  const [downloadSpeed, setDownloadSpeed] = useState(132);
  const [latitude, setLatitude] = useState(42.8827);
  const [longitude, setLongitude] = useState(1.2674);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkData((prev) => {
        const newUsage = { 
          time: new Date().toLocaleTimeString("en-US", { hour12: false }), 
          up: Math.random() * 50, 
          down: Math.random() * 50 
        };
        return [...prev.slice(-20), newUsage];
      });
      setPing(Math.floor(Math.random() * 10) + 10);
      setUploadSpeed(Math.floor(Math.random() * 200));
      setDownloadSpeed(Math.floor(Math.random() * 200));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 text-[white] font-mono text-xs ">
      
      {/* Network Status */}
      <div className="mb-4">
        <div className="flex justify-between text-xs opacity-80">
          <span>STATE</span>
          <span>IPv4</span>
          <span>INTERFACE: tun0</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-bold text-green-400">ONLINE</div>
            <div className="text-xs opacity-80">{ipAddress}</div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-80">PING</div>
            <div className="text-lg">{ping}ms</div>
          </div>
        </div>
      </div>

      {/* WORLD VIEW Header */}
      <div className="text-xs flex justify-between opacity-80 mb-1">
        <span>WORLD VIEW</span>
        <span>GLOBAL NETWORK MAP</span>
      </div>

      {/* Globe Section (Properly Adjusted) */}
      <div className="relative h-40 flex justify-center items-center  mb-2">
        <NetworkGlobe />
      </div>

      {/* ENDPOINT LAT/LON */}
      <div className="text-xs opacity-80 flex justify-between mb-4">
        <span>ENDPOINT LAT/LON</span>
        <span>{latitude}, {longitude}</span>
      </div>

      {/* Network Traffic Section */}
      <div>
        <div className="text-xs flex justify-between opacity-80">
          <span>NETWORK TRAFFIC</span>
          <span>UP / DOWN, MB/s</span>
        </div>
        <div className="text-xs opacity-80 flex justify-between">
          <span>TOTAL</span>
          <span>{uploadSpeed} MB OUT, {downloadSpeed} MB IN</span>
        </div>

        {/* Traffic Graph with Proper Grid Background */}
        <div className="relative h-24 mt-2 overflow-hidden">

          {/* Traffic Graph */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={networkData}>
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 100]} hide />
              <Tooltip />
              <Line type="monotone" dataKey="up" stroke="white" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="down" stroke="white" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
