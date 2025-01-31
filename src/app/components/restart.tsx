interface restartProps {
    reset: () => void;
    isActive: boolean
  }
  
  const RestartBtn: React.FC<restartProps> = ({reset, isActive}) => {
    return (
    <button className="bg-red-600 text-white rounded-md border border-indigo-600 m-2 p-2"
      onClick={reset}
      disabled={!isActive}>
        Restart
      </button>
    )
};

export default RestartBtn;