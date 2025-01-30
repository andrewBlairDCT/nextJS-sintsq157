interface CountdownProps {
  timeLeft: number;
}

const Countdown: React.FC<CountdownProps>= ({timeLeft}) => {
 

    return ( 
        <div className="text-white">
          {timeLeft}
        </div>
     );
}
 
export default Countdown;