import React, { useState } from "react";
import { FaFolder, FaFolderOpen, FaFileAlt } from "react-icons/fa";

export default function FileSystem({ files, toggleFolder }) {
  return (
    <div className="p-2">
      {/* File System Header */}
      <div className="flex justify-between text-xs text-[white]  px-2">
        <span>FILESYSTEM</span>
        <span>/home/squared/.config/eDEX-UI</span>
      </div>

      {/* File Grid */}
      <div className="grid grid-cols-6 gap-4 mt-2 text-[white]">
        {files.map((file, index) => (
          <div key={index} className="flex flex-col items-center text-xs">
            {file.type === "folder" ? (
              <button onClick={() => toggleFolder(index)}>
                {file.open ? (
                  <FaFolderOpen className="text-[white] text-3xl" />
                ) : (
                  <FaFolder className="text-[white] text-3xl" />
                )}
              </button>
            ) : (
              <FaFileAlt className="text-[white] text-2xl" />
            )}
            <span className="mt-1 opacity-80">{file.name}</span>

            {/* Sub-Files Inside Opened Folder */}
            {file.open &&
              file.files.length > 0 &&
              file.files.map((subFile, subIndex) => (
                <span key={subIndex} className="text-xs text-[white] ml-4">
                  └ {subFile}
                </span>
              ))}
          </div>
        ))}
      </div>

      {/* Mount Bar (Disk Usage) */}
      <div className="mt-4 text-xs text-[white] px-2">
        Mount <span className="text-[white]">/home/squared</span> used <span className="text-[white]">71%</span>
      </div>
      <div className="w-full bg-[#222021] h-1 rounded-full mt-1">
        <div className="bg-[white] h-full rounded-full" style={{ width: "71%" }}></div>
      </div>
    </div>
  );
}
