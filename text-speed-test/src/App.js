
import './App.css';
import Button from "./Button";
import Spacer from "./Spacer";
import {useEffect, useRef, useState} from "react";
import Overlay from "./Overlay";
import Hint from "./Hint";
import data from './data.json';
import ResultOverlay from "./resultOverlay";
import RestartIcon from "./Icons/Restart-icon";
import PersonalBestIcon from "./Icons/PersonalBest-icon";

export const random =  () => Math.floor(Math.random()*10);

export function wordsCounter(resultText,userText,set){
    userText.forEach((word)=> {
        if (resultText.includes(word)){
            set.add(word);
        }
    })
    if (set.size >= userText.length){
        set.forEach((wordInSet)=>{
            if (!userText.includes(wordInSet)){
                set.delete(wordInSet);
            }
        })
    }
    return set.size;
}

function App() {

    const [isStarted,setIsStarted] = useState(false);
    const [text,setText] = useState(data.easy[0].text);
    const [timerActive,setTimerActive] = useState(false);
    const [userInput,setUserInput] = useState("");
    const [mode,setMode] = useState("60s");
    const [time,setTime] = useState("0:00");
    const [result,setResult] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [errors,setErrors] = useState(0);
    const [accuracy,setAccuracy] = useState(100);
    const [wordsCount,setWordsCount] = useState(0);
    const [resultStatus,setResultStatus] = useState("");

    const intervalRef = useRef(null);
    const mySet = useRef(new Set());
    const areaRef = useRef(null);

    const myRecord = localStorage.getItem("myRecord");


    function format(seconds) {
        const mins = Math.floor(seconds / 60);
        const formatSec = seconds % 60;
        return (mins+":"+formatSec.toString().padStart(2,'0'))
    }

    useEffect(() => {
        if (timerActive) {
            intervalRef.current = setInterval(() =>
            {
                setSeconds(prev => {
                    const newSec = prev + 1
                    setTime(format(newSec));
                    if (mode === "60s" && newSec === 60){
                        clearInterval(intervalRef.current);
                        setTimerActive(false);
                        setResult(true);
                    }
                    return newSec;
                });
            },1000)
        }
        else {
            clearInterval(intervalRef.current);
            setSeconds(0);
            setTime("0:00");

            if (myRecord){
                if (wordsCount > myRecord){
                    setResultStatus("newRecord");
                }
                else setResultStatus("testCompleted");
            }
            else {
                setResultStatus("firstResult");
                localStorage.setItem("myRecord",wordsCount.toString());
            }
        }

    }, [timerActive]);

    useEffect(() => {
        if (userInput.length === text.length ) {
            setTimerActive(false);
            setResult(true);
        }
        let currentChar = userInput.length-1;
        if (userInput[currentChar] !== text[currentChar]){
            setErrors((prev)=> prev + 1);
        }
        if (userInput) {
            const newAccuracy = Math.floor((userInput.length - errors) / userInput.length * 100);
            if (newAccuracy >= 0) setAccuracy(newAccuracy);
            console.log(userInput[userInput.length-1]);
            console.log(mySet.current.size);
            const words = (wordsCounter(text.split(" "),userInput.split(" "),mySet.current));
            if (mode ==="60s"){
                setWordsCount(words);
            }
            else{
                setWordsCount(Math.floor(words/(seconds % 60)));
            }

        }
    }, [userInput]);

    return (
        <div className="mx-20">
            <header className="flex justify-between mb-10">
                <img src="/logo-large.svg" alt="Main logo of website"/>
                <div className="flex gap-2 items-center">
                    <PersonalBestIcon/>
                    <span>Personal best:<span className="text-white">{myRecord}WPM</span></span>
                </div>
            </header>
            <div className="relative">
                <section className="flex justify-between items-center mb-3">
                    <div className="flex gap-5">
                        <div> WPM: <span className="font-black  text-white"> {wordsCount} </span></div>
                        <Spacer/>
                        <div> Accuracy: <span
                            className={`font-black ${accuracy !== 100 ? "text-red-700" : "text-green-600"} `}> {accuracy + "%"} </span>
                        </div>
                        <Spacer/>
                        <div> Time: <span className="font-black"> {time} </span></div>
                    </div>
                    <nav className="flex gap-5">
                        <div className="">
                            <span className="mr-2"> Difficulty:</span>
                            <Button text={"Easy"} setIsStarted={setIsStarted} setText={setText}
                                    setUserInput={setUserInput} setTimerActive={setTimerActive}></Button>
                            <Button text={"Medium"} setIsStarted={setIsStarted} setText={setText}
                                    setUserInput={setUserInput} setTimerActive={setTimerActive}></Button>
                            <Button text={"Hard"} setIsStarted={setIsStarted} setText={setText}
                                    setUserInput={setUserInput} setTimerActive={setTimerActive}></Button>
                        </div>
                        <Spacer/>
                        <div>
                            <span className="mr-2"> Mode:</span>
                            <Button text="Timed(60s)"></Button>
                            <Button text="Passage"></Button>
                        </div>
                    </nav>
                </section>
                <div className={`min-h-[500px] border-t-[0.5px] border-gray-600  flex text-[28px] relative ${isStarted ? "border-b-[0.5px]" : ""}`}>
                    {!isStarted && <Overlay setIsStarted={setIsStarted} textArea={areaRef}
                                            setTimerActive={setTimerActive}></Overlay>}
                    <textarea value={userInput}
                              ref={areaRef}
                              onInput={(e) => {setUserInput(e.target.value)}}
                              className={`bg-transparent text-green-600 w-full flex-1 p-1 z-20 opacity-0 resize-none focus:outline-none`}/>
                    <Hint text={text}
                          userInput={userInput}
                          setTimerActive={setTimerActive}
                    />
                </div>

                {result && <ResultOverlay wpm={wordsCount} accuracy={accuracy} correctChars={userInput.length}
                                          incorrectChars={errors} resultStatus={resultStatus} setResult={setResult}
                                          setTimerActive={setTimerActive} setUserInput={setUserInput}/>
                }
            </div>
            <footer className="">
                {isStarted &&
                    <div className="flex items-center justify-center pt-4">
                        <button
                            className="flex gap-1 items-center px-2 py-2 bg-gray-800 font-semibold text-white rounded-xl ">
                            Restart Test <RestartIcon/>
                        </button>
                    </div>
                }
            </footer>
        </div>

  );
}

export default App;
