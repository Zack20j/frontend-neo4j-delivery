import React from 'react';
import GraphViewer from '../components/GraphViewer';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      <Sidebar />

      <div className="flex-1">
        <header className="bg-[#0D3B3E] text-[#5DBE66] py-6 shadow">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl font-bold">GraphDelivery</h1>
            <p className="text-[#D1FAE5] mt-2">Optimizador de Rutas de Delivery</p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6">
          <section>
            <GraphViewer />
          </section>
        </main>
      </div>
    </div>
  );
}