
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-blue-500/30">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Leitfaden: Der Comic
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Die ironische Reise eines Dokuments, das die Welt regiert.
      </p>
    </header>
  );
};

export default Header;
