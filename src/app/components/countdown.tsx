interface CountdownProps {
  timeLeft: number;
}

const Countdown: React.FC<CountdownProps>= ({timeLeft}) => {
 

    return ( 
        <div className="text-black">
          Time Left: {timeLeft}
        </div>
     );
}
 
export default Countdown;