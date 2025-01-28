'use client'
import Container from './container';
// import { promises as fs } from 'fs';
import { useState, useEffect } from 'react';

export default function Home() {
  // const file = await fs.readFile(process.cwd() + '/src/app/songs.json', 'utf8');
  // const data = JSON.parse(file);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
      },
    })
      .then((res) => res.json()) 
      .then((data) => setItems(data)); 
  }, []);

  return (
   <Container 
   items={items}/>
  );
}
