'use client'

import { useState } from 'react';
import Modal from './components/modal';

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
    const [isCorrect, setIsCorrect] = useState(false);
    const [isIncorrect, setIsIncorrect] = useState(false);
    const [livesLeft, setLivesLeft] = useState(3);
    const [modalOpen, setModalOpen] = useState(false)

   
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserAnswer(e.target.value);
        
      }
    
  

    const checkAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (items.find(song => song.title === userAnswer)) {
            setIsCorrect(true)
            const userSong = items.filter(song => song.title === userAnswer)
            setCurrentSong(userSong)
            setUserAnswer('')
        } else {
          setIsIncorrect(true)
          setLivesLeft(livesLeft - 1)
          setUserAnswer('')
        }
    }

    console.log(currentSong)
    
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Setting the Gary Bar Low</h1>
      <button className="bg-indigo-600 text-white rounded-md border border-indigo-600 m-2 p-2"
      onClick={() => {setModalOpen(!modalOpen)}}
      >What do I do here?</button>
      {modalOpen && (
        <Modal
        setModalOpen={setModalOpen}
        />
      )}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      {/* <h1>Song: {data.songs[0].title}</h1> */}
      <form onSubmit={checkAnswer}>
          <input
            className="rounded-md border-2 border-indigo-600 p-2"
            name="userAnswer"
            value={userAnswer}
            onChange={handleChange}
            placeholder="Enter Song title..."
          />
          <button
            className="rounded-md border border-indigo-600 m-2 p-2"
            type="submit"
          >
            Set the Gary Bar
          </button>
        </form>
        {isCorrect && (
          <div>
          <p>Correct!</p>
          You have set the Gary Bar low
          </div>          
        )}
        {isIncorrect && (
          <div>
          <p>Wrong!</p>
          You have {livesLeft} wrong answers left.
          </div>          
        )}
      </main>
      
    </div>
  );
}

export default Container;