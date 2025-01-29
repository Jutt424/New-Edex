import React from "react";

export default function Topbar({ time }) {
  return (
    <div className="flex justify-between items-center text-md bg-[#141618] rounded-lg">
      <span className="text-cyberBlue ml-4">PANEL</span>
      <span className="text-cyberRed  ">TERMINAL</span>
      <span className="text-cyberGreen mr-4">Network Status</span>
    </div>
  );
}