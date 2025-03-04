'use client'

import { useState, useEffect } from 'react';
import Modal from './components/modal';
import LoseModal from './components/lose';
import RestartBtn from './components/restart';
import Countdown from './components/countdown';
import StartModal from './components/startModal';
import Score from './components/score';

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
  const [previousAnswers, setPreviousAnswers] = useState<Song[]>([]);
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
    if (isActive && timeLeft > 0) {
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

    const lose = () => {
      setLost(true)
      setTimeLeft(0)
      setTimeVisible(false)
    }
   
  useEffect(() => {
    if (livesLeft === 0){
    setLost(true)
    setTimeLeft(0)
    } else if (livesLeft < 0){
      reset()
    }
  }, [livesLeft, timeLeft])
   
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setUserAnswer(e.target.value);
    } 
      
  const checkAnswer = (e: React.FormEvent) => {
      e.preventDefault();
      setIsCorrect(false)
      setIsIncorrect(false)

  const userSong = items.find(song => song.title.toLowerCase() === userAnswer.toLowerCase())

    if (!userSong || currentSong && userSong && previousAnswers.includes(userSong) === true ||
      currentSong && currentSong.chart_position < userSong.chart_position) {
      setIsIncorrect(true);
      setLivesLeft(prev => prev - 1);
      setUserAnswer('');
      return;
    }

    setCurrentSong(userSong);
    setUserAnswer('');

    if (userSong && currentSong && previousAnswers.includes(userSong) === false &&
      userSong.chart_position >= currentSong.chart_position) {
      setIsCorrect(true)
      setPreviousAnswers([...previousAnswers, userSong])
      setScore(score + timeLeft)
      setTimeLeft(60)
      setCurrentSong(userSong);
    }

    else {
      setIsCorrect(true)
      setPreviousAnswers([...previousAnswers, userSong])
      setScore(score + timeLeft)
      setTimeLeft(60)
    }
  }

  const reset = () => {
    setCurrentSong(null);
    setLivesLeft(3);
    setIsCorrect(false);
    setIsIncorrect(false);
    setPreviousAnswers([]);
    setUserAnswer("");
    setModalOpen(false);
    setLost(false);
    setScore(0);
    setTimeLeft(60);
    setLost(false);
    setStartModal(false);
    setIsActive(true);
  }

  const openInstructions = () => {
    setStartModal(false)
    setLost(false)
    setModalOpen(!modalOpen)
  }
        
    
  return (
    <div className="bg-red-400 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Setting the Gary Bar Low</h1>
      <div className='flex-row'>
      <button className="bg-indigo-600 text-white rounded-md border m-2 p-2"
      onClick={() => {openInstructions()}}
      disabled={!isActive}
      >What do I do here?</button>
      <RestartBtn
      isActive={isActive}
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
        setLost={setLost}
        reset={reset}
        isActive={isActive}
        />
      )}
      
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      
      {timeVisible && (
        <div className='flex-row'>
       <Countdown 
       timeLeft={timeLeft}
      />
      <Score 
      score={score}
      />
      </div>
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
            disabled={userAnswer.length === 0}
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