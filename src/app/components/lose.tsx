import RestartBtn from "./restart";
import Image from "next/image";
import barlowGif from "../images/take-that-gary-barlow.gif"

interface loseProps {
    setLost: (filterTerm: boolean) => void;
    reset: () => void;
    isActive: boolean;
  }
  
  const LoseModal: React.FC<loseProps> = ({setLost, reset, isActive}) => {

    return (
        <div className="flex-col items-center rounded-md bg-rose-950 p-2 text-white justify-center fixed z-10 h-100 overflow-y-auto">
        <div className="justify-center p-4 text-center sm:items-center sm:p-0">
        <h3 className="mb-4 text-3xl font-extrabold text-gray-200 dark:text-white md:text-5xl lg:text-6xl">THE <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-blue-800">GARY BAR</span> WAS TOO HIGH</h3>
        <div className="flex justify-center">
        <Image src={barlowGif} className="flex justify-center"
        alt="Gary Barlow singing live, looking deeply uncomfortable"/>
        </div>
        <button className="rounded-md bg-indigo-600 p-2"
        onClick={() => setLost(false)}>
        Close</button>
        <RestartBtn
        reset={reset}
        isActive={isActive}
        />
        </div>
        </div>
    
     
        
       
        
    )
};

export default LoseModal;