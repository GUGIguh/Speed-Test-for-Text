import CompletedIcon from "../Icons/Completed-icon";
import ResultCard from "./ResultCard";
import RestartIcon from "../Icons/Restart-icon";
import PersonalBestIcon from "../Icons/PersonalBest-icon";

export  default  function ({wpm,accuracy,correctChars,incorrectChars,resultStatus,setResult,setTimerActive,resetTest}){

    const messageObj ={
      message:{
          firstResult: "You've set the bar. Now the real challenge begins-time to beat it.",
          testCompleted: "Solid run. Keep pushing to beat your high score.", 
          newRecord: "You are getting faster. That was incredible typing",
      },
      headerMessage:{
          firstResult: "Baseline Established!",
          testCompleted: "Test Complete!",
          newRecord: "High Score Smashed!",
          
      },
      buttonMessage:{
          firstResult: "Beat This Score",
          testCompleted: "Go Again",
          newRecord: "Beat This Score",
      }
    }

    function buttonHandler () {
        setResult(false);
        resetTest();
        setTimerActive(true);
    }
   return(
       <div className="absolute inset-0 flex items-start justify-center z-50">
            <div className="flex flex-col gap-6 items-center"  >
                {resultStatus==="newRecord" ? <PersonalBestIcon/> : <CompletedIcon/>}
                <div className="">
                    <h1 className="text-white font-bold text-3xl text-center"> {messageObj.headerMessage[resultStatus]}</h1>
                    <span className="text-center">{messageObj.message[resultStatus]}</span>
                </div>
                <div className="flex w-full gap-3 justify-between ">
                    <ResultCard resultOfParam={wpm} nameOfParam={"WPM"}></ResultCard>
                    <ResultCard resultOfParam={accuracy} nameOfParam={"Accuracy"}></ResultCard>
                    <ResultCard resultOfParam={correctChars +"/" + incorrectChars} nameOfParam={"Characters"}></ResultCard>
                </div>
                <button  onClick={buttonHandler} className="flex gap-1 items-center px-3 py-2 bg-white text-black font-semibold  rounded-xl">{messageObj.buttonMessage[resultStatus]} <RestartIcon  color="#000000"/></button>
            </div>
       </div>
   )
}