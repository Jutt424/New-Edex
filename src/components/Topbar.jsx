import React from "react";

export default function Topbar({ time }) {
  return (
    <div className="flex justify-between items-center text-md bg-[#141618] rounded-lg">
      <span className="text-[white] ml-4">PANEL</span>
      <span className="text-[white]  ">TERMINAL</span>
      <span className="text-[white] mr-4">Network Status</span>
    </div>
  );
}