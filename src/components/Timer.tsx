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
                    } else if(cycle[nextPhase] === 15) {
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
        <div className="flex flex-col items-center gap-6 mt-14 sm:mt-20 px-4 w-full">
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
            <div className="flex flex-row gap-3 justify-center w-1/4 text-xs">
                <div className="flex flex-col items-center gap-2 w-full">
                    <div className="bg-gray-100 rounded-3xl px-6 py-3 sm:text-xl font-semibold text-gray-800 tabular-nums text-center w-full">
                        {minutes}
                    </div>
                    <p>Minutes</p>
                </div>
                <div className="flex flex-col items-center gap-2 w-full">
                    <div className="bg-gray-100 rounded-3xl px-6 py-3 sm:text-xl font-semibold text-gray-800 tabular-nums text-center w-full">
                        {seconds}
                    </div>
                    <p>Seconds</p>
                </div>
            </div>
            <div className="flex flex-row gap-3 justify-center w-1/2 text-xs">
                <button className="bg-gray-100 rounded-3xl px-6 py-2.5 sm:text-base font-semibold text-gray-800 w-full" onClick={() => handleSetTime(25)}>25'</button>
                <button
                    className={`${isRunning ? "bg-gray-300" : "bg-gray-100"} rounded-3xl px-6 py-2.5 sm:text-base font-semibold text-gray-800 transition w-full`}
                    onClick={handleStart}
                >
                    Start
                </button>
                <button
                    className={`${!isRunning ? "bg-gray-300" : "bg-gray-100"} rounded-3xl px-6 py-2.5 sm:text-base font-semibold text-gray-800 transition w-full`}
                    onClick={handleStop}
                >
                    Stop
                </button>
                <button className="bg-gray-100 rounded-3xl px-6 py-2.5 sm:text-base font-semibold text-gray-800 w-full" onClick={() => handleSetTime(5)}>5'</button>

            </div>
        </div>
    )
}

export default Timer;