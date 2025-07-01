import React, { useState } from 'react';
import { MapIcon, AlertCircleIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [activeItem, setActiveItem] = useState<string>('route');

  const items: SidebarItem[] = [
    {
      id: 'route',
      label: 'Rutas',
      icon: <MapIcon size={20} />,
      onClick: () => setActiveItem('route')
    },
    {
      id: 'incident',
      label: 'Incidentes',
      icon: <AlertCircleIcon size={20} />,
      onClick: () => setActiveItem('incident')
    }
  ];

  return (
    <div className={`h-screen bg-gradient-to-b from-[#5DBE66] to-[#0D3B3E] text-white transition-all duration-300 ${open ? 'w-64' : 'w-16'} flex flex-col fixed top-0 left-0 z-50`}>
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        {open && <h2 className="text-lg font-semibold">GraphDelivery</h2>}
        <button
          onClick={() => setOpen(!open)}
          className="text-white focus:outline-none"
        >
          {open ? <ChevronLeftIcon size={20} /> : <ChevronRightIcon size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/10 transition-colors ${activeItem === item.id ? 'bg-white/20' : ''}`}
          >
            {item.icon}
            {open && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
