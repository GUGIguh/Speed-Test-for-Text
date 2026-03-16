export  default  function ({setIsStarted,setTimerActive,textArea}){

    function buttonHandler () {
        setIsStarted(true);
        setTimerActive(true);
        textArea.current.focus();
    }

return (
    <div onClick={buttonHandler}  className="flex flex-col gap-3 text-[16px] font-semibold justify-center items-center  bg-transparent backdrop-blur-sm absolute z-30 size-full ">
        <button className="size-fit p-2 bg-blue-500 text-white rounded-xl" onClick={buttonHandler}> Start Typing Test</button>
        <span className=" text-white"> or click the text and start typing</span>
    </div>
    )
}