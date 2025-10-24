
import React from 'react';
import type { ComicPanelData } from '../types';

interface ComicPanelProps {
  panel: ComicPanelData;
  index: number;
}

const ComicPanel: React.FC<ComicPanelProps> = ({ panel, index }) => {
  return (
    <div className="flex flex-col bg-gray-800 rounded-lg overflow-hidden shadow-lg shadow-blue-500/10 border border-gray-700 transform hover:scale-105 transition-transform duration-300">
      <div className="p-2 bg-gray-900">
        <h3 className="text-lg font-bold text-blue-400">Panel {index + 1}</h3>
      </div>
      <div className="aspect-square bg-gray-700">
        <img src={panel.imageUrl} alt={`Comic panel ${index + 1}`} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex-grow">
        <p className="text-gray-300 text-sm">{panel.caption}</p>
      </div>
    </div>
  );
};

export default ComicPanel;
