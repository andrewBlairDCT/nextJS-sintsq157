import RestartBtn from "./restart";

interface loseProps {
    setLost: (filterTerm: boolean) => void;
    reset: () => void;
  }
  
  const LoseModal: React.FC<loseProps> = ({setLost, reset}) => {

    return (
        <div className="rounded-md bg-red-600 p-2 text-white justify-center fixed z-10 h-100 overflow-y-auto">
        <div className="flex-col items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <h3 className="font-bold text-lg">THE GARY BAR WAS TOO HIGH</h3>
        <button className="rounded-md bg-indigo-600 p-2"
        onClick={() => setLost(false)}>
        Close</button>
        <RestartBtn
        reset={reset}
        />
        </div>
        </div>
    
     
        
       
        
    )
};

export default LoseModal;