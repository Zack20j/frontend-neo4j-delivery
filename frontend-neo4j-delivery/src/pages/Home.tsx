import React from 'react';
import GraphViewer from '../components/GraphViewer';
import Sidebar from '../components/Sidebar';
import { MapIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#77e0c1] via-[#b6d5f0] to-[#d1e8f0]">
      <Sidebar />

      <div className="flex-1 ml-64 transition-all duration-300 p-6">
        <div className="flex items-center flex-col rounded-2xl shadow-xl bg-gradient-to-br from-[#5DBE66] to-[#0D3B3E] p-6 h-full border border-gray-200 animate-fade-in">
          <h2 className="flex justify-center gap-2 text-3xl font-extrabold inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ddede8] to-[#ddede8] mb-6 tracking-wide drop-shadow animate-pulse">
            Mapa de....
          </h2>
          <div 
            className="p-2 animate-fade-in"
          >
            <GraphViewer />
          </div>
        </div>
      </div>
    </div>
  );
}