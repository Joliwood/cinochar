import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <div className="text-white font-semibold text-xl">Your Logo</div>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-white hover:text-gray-300">Home</a>
            </li>
            <li>
              <a href="/dashboard" className="text-white hover:text-gray-300">Dashboard</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
