'use client'

import { useState, useEffect } from 'react';
import Modal from './components/modal';
import LoseModal from './components/lose';
import RestartBtn from './components/restart';
import Countdown from './components/countdown';
import StartModal from './components/startModal';

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
  const [startModal, setStartModal] = useState(true);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [livesLeft, setLivesLeft] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
  const [lost, setLost] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [timeVisible, setTimeVisible] = useState<boolean>(false);
  const [duration, setDuration] = useState<number | string>(60);
  const [timeLeft, setTimeLeft] = useState<number>(50);
  const [isActive, setIsActive] = useState<boolean>(false);

    //timer
    const handleSetDuration = (): void => {
      if (typeof duration === "number" && duration > 0) {
        setTimeLeft(duration);
        setIsActive(false);
      }
    };
  
  useEffect(() => {
    handleSetDuration();
  }, [duration])
  
  const setTimer = (time: number) => {
    setDuration(time);
    handleSetDuration();
    if (isActive) {
      reset();
    }
  }
  
  useEffect(() => {
    if (isActive && timeLeft > 0 && score !== 8) {
      setTimeVisible(true);
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      
      return () => clearInterval(timerId);
    } else if (isActive && timeLeft === 0) {
      setModalOpen(false);
      setLost(!lost)
    }
    }, [isActive, timeLeft]);

  useEffect(() => {
    if (livesLeft === 0)
    {setLost(true)}
  }, [livesLeft])
   
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setUserAnswer(e.target.value);
    } 

      
  const checkAnswer = (e: React.FormEvent) => {
      e.preventDefault();
      setIsCorrect(false)
      setIsIncorrect(false)

  const userSong = items.find(song => song.title === userAnswer)

    if (!userSong || currentSong && 
      currentSong.chart_position < userSong.chart_position) {
      setIsIncorrect(true);
      setLivesLeft(prev => prev - 1);
      setUserAnswer('');
      return;
    }

    setCurrentSong(userSong);
    setUserAnswer('');

    if (userSong && currentSong &&
      userSong.chart_position >= currentSong.chart_position) {
      setIsCorrect(true)
      setCurrentSong(userSong);
    }

    else {
      setIsCorrect(true)
    }
  }

  const reset = () => {
    setCurrentSong(null);
    setLivesLeft(3);
    setIsCorrect(false);
    setIsIncorrect(false);
    setUserAnswer("");
    setModalOpen(false);
    setLost(false);
    setScore(0);
    setDuration(60);
    setLost(false);

  }
     

   
    console.log('current', currentSong)
    
    
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Setting the Gary Bar Low</h1>
      <div className='flex-row'>
      <button className="bg-indigo-600 text-white rounded-md border m-2 p-2"
      onClick={() => {setModalOpen(!modalOpen)}}
      >What do I do here?</button>
      <RestartBtn
      reset={reset}
      />
      </div>
      {/* modals */}
      {startModal && (
        <StartModal
        setStartModal={setStartModal}
        setIsActive={setIsActive}
        />
      )}
      {modalOpen && (
        <Modal
        setModalOpen={setModalOpen}
        />
      )}
      {lost && (
        <LoseModal
        setModalOpen={setModalOpen}
        reset={reset}
        />
      )}
      
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

      {timeVisible && (
       <Countdown 
       timeLeft={timeLeft}
      />
      )}
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
          You have set the Gary Bar.
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