interface ScoreProps {
    score: number;
  }
  
  const Score: React.FC<ScoreProps>= ({score}) => {
   
  
      return ( 
          <div className="text-black">
            Score: {score}
          </div>
       );
  }
   
  export default Score;