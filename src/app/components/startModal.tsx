interface modalProps {
    setStartModal: (filterTerm: boolean) => void;
    setIsActive: (filterTerm: boolean) => void;
   }
  
  const StartModal: React.FC<modalProps> = ({setStartModal, setIsActive}) => {

    const begin = () => {
        setStartModal(false);
        setIsActive(true)
    }

    return (
        <div className="rounded-md bg-red-950 p-2 text-white justify-center fixed z-10 h-100 overflow-y-auto">
        <div className="flex-col items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <h1 className="font-bold text-lg">SETTING THE GARY BARLOW</h1>
        <h3 className="font-bold text-lg">How to Play</h3>
        <p className="py-4">First, correctly name a song written by Gary Barlow.</p>
        <p className="py-4">Then name another song written by Gary Barlow that had higher or equal position in the UK singles chart.</p>
        <p className="py-4">You are allowed three wrong answers, then it's game over.</p>
        <p className="py-4">You can't enter the same song twice, or it will count as a wrong answer.</p>
        <button className="rounded-md bg-indigo-600 p-2"
        onClick={begin}>
        BEGIN</button>
        </div>
        </div>
    
     
        
       
        
    )
};

export default StartModal;