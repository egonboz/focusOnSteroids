import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';


const Timer: React.FC = () => {
    const cycle: number[] = [25, 5, 25, 5, 25, 15, 25, 5, 25, 5, 25, 15];
    const [phaseIndex, setPhaseIndex] = useState<number>(0);
    const [secondsLeft, setSecondsLeft] = useState<number>(cycle[0] * 60);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const switchButtonRef = useRef<HTMLAudioElement>(null);
    const finishTimeRef = useRef<HTMLAudioElement>(null);


    const rest5= () => toast('Time to rest 5 minutes!');
    const rest15= () => toast('Time to rest 15 minutes!');
    const focus = () => toast('Time to focus 25 minutes!');

    useEffect (() => {
        let interval: NodeJS.Timeout;

        if ( isRunning && secondsLeft > 0 ) {
            interval = setInterval(() => {
                setSecondsLeft(prev => prev - 1);
            }, 1000);
        }

        if ( isRunning && secondsLeft === 0 ) {
                setTimeout(() => {
                    const nextPhase = (phaseIndex + 1) % cycle.length;
                    if (cycle[nextPhase] === 5) {
                        rest5();
                    } else if(cycle[nextPhase] === 1) {
                        rest15();
                    } else {
                        focus();
                    }
                    setPhaseIndex(nextPhase);
                    setIsRunning(false);
                    finishTimeRef.current?.play();
                    setSecondsLeft(cycle[nextPhase] * 60);
                }, 1000);        
            }

        return () => clearInterval(interval);

    }, [isRunning, secondsLeft, phaseIndex]);

    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const seconds = String(secondsLeft % 60).padStart(2, '0');

    const handleStart = () => {
        setIsRunning(true);
        switchButtonRef.current?.play();
    };
    const handleStop = () => {
        setIsRunning(false);
         switchButtonRef.current?.play();
    };

    const handleSetTime = (minutes: number) => {
        setIsRunning(false);
        setSecondsLeft(minutes * 60);
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <ToastContainer
            position="top-center"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            />            
            <audio ref={switchButtonRef} src="/sounds/switch.mp3" />
            <audio ref={finishTimeRef} src="/sounds/alarm.mp3" />
            <div className="flex flex-row gap-2">
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-gray-100 rounded-lg px-32 py-3 text-xl font-semibold text-gray-800">
                        {minutes}
                    </div>
                    <p>Minutes</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-gray-100 rounded-lg px-32 py-3 text-xl font-semibold text-gray-800">
                        {seconds}
                    </div>
                    <p>Seconds</p>
                </div>
            </div>
            <div className="flex flex-row gap-4">
                <button className="bg-gray-100 rounded-full px-24 py-2.5 text-l font-semibold text-gray-800" onClick={() => handleSetTime(25)}>25'</button>
                <button className={`${isRunning ? "bg-gray-300" : "bg-gray-100"} rounded-3xl px-24 py-2.5 text-l font-semibold text-gray-800 transition`} onClick={handleStart}>Start</button>
                <button className={`${!isRunning ? "bg-gray-300" : "bg-gray-100"} rounded-3xl px-24 py-2.5 text-l font-semibold text-gray-800 transition`} onClick={handleStop}>Stop</button>
                <button className="bg-gray-100 rounded-full px-24 py-2.5 text-l font-semibold text-gray-800" onClick={() => handleSetTime(5)}>5'</button>

            </div>
        </div>
    )
}

export default Timer;