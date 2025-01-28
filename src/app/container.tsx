'use client'

import { useState } from 'react';

interface Song {
    title: string,
    artist: string,
    chart_position: number,
    year_released: number
}

interface JsonData{
  items: [
    song: Song
  ]
}

const Container: React.FC<JsonData> = ({items}) => {
    const [currentSong, setCurrentSong] = useState({});
    const [previousSong, setPreviousSong] = useState({});
    const [userAnswer, setUserAnswer] = useState("");
   
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserAnswer(e.target.value);
      }
    
      console.log(items)

    const checkAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (items.find(song => song.title === userAnswer)) {
            const userSong = items.filter(song => song.title === userAnswer)
            console.log(typeof userSong)
            setCurrentSong(userSong)
        } else {
            return false
        }
    }

    console.log(currentSong)
    
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      {/* <h1>Song: {data.songs[0].title}</h1> */}
      <form onSubmit={checkAnswer}>
          <input
            className="border-2 border-indigo-600 p-2"
            name="userAnswer"
            value={userAnswer}
            onChange={handleChange}
            placeholder="Enter Song title..."
          />
          <button
            className="border border-indigo-600 m-2 p-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </main>
      
    </div>
  );
}

export default Container;