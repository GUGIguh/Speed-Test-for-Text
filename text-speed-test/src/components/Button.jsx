import data from "../data.json";
import {random} from "../pages/App";

export default function Button({text,setText,setIsStarted,setSelectedLevel,selectedLevel,resetTest}) {

    const level = text.toLowerCase();

    function handleClick (){
        setSelectedLevel(level);
        setText(data[level][random()].text)
        resetTest();
        setIsStarted(false);
    }

    return (
        <button
            className={`${selectedLevel ===level ? "border-blue-500 text-blue-500" : ""} border-gray-300 border-[0.5px] text-white m-1 px-3 py-[1px] rounded-md active:border-blue-500 active:text-blue-500 hover:border-blue-500 hover:text-blue-500`}
            onClick={handleClick}>
            {text}
        </button>
    )
}
