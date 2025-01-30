interface restartProps {
    reset: () => void;
  }
  
  const RestartBtn: React.FC<restartProps> = ({reset}) => {
    return (
    <button className="bg-red-600 text-white rounded-md border border-indigo-600 m-2 p-2"
      onClick={reset}>
        Restart
      </button>
    )
};

export default RestartBtn;