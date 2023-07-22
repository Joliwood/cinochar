"use client";
// Since the Next.js version >= 13, every component in the app folder is considered to be a server file
// To tell Next it is a client file, we have to use that before any import
import React, { useEffect, useState } from 'react';

const Testar: React.FC = () => {

    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
          const response = await fetch('/api/getData');
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    
    const handleClick = () => {
        console.log(data);
    };

  return (
      <div className="bg-gray-800 p-4 flex justify-center gap-10">
          TESTAR COMPONENT
        <button onClick={handleClick}>TEST</button>
        {/* Code to put here */}
    </div>
  );
};

export default Testar;
