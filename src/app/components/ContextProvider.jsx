"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const DirectionContext = createContext({ dir: 'ltr', updateDir: () => {} });

export const DirectionProvider = ({ children }) => {
  const [dir, setDir] = useState('ltr');
const updateDir = (newDir) => {
    // document.documentElement.setAttribute('dir', newDir);
    console.log(" document.body.setAttribute('dir', newDir);", document.body.setAttribute('dir', newDir))
    // /document.body.setAttribute('dir', newDir);
        setDir(newDir);

  };
 useEffect(()=>{console.log("dir",dir)},[dir])



  return (
    <DirectionContext.Provider value={{ dir, updateDir }}>
      {children}
    </DirectionContext.Provider>
  );
};

export const useDirection = () => useContext(DirectionContext);