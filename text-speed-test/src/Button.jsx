import data from "./data.json";
import {random, resetTimer} from "./App";

export default function Button({text,setText,setUserInput,setTimerActive,setIsStarted}) {

    function handleClick (){
        const level = text.toLowerCase();
        setText(data[level][random()].text)
        setUserInput("");
        setTimerActive(false);
        setIsStarted(false);

    }

    return (
        <button
            className="border-gray-300 border-[0.5px] text-white m-1 px-3 py-[1px] rounded-md active:border-blue-500 active:text-blue-500 "
            onClick={handleClick}>
            {text}
        </button>
    )
}
