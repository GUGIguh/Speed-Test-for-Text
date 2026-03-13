export default function ({text,userInput,setTimerActive}){


    function renderText() {
        const splitText = text.split("")
        return splitText.map((char,index) => {
            if (index > userInput.length) {
                return (<span className="text-gray-600 inline-block min-w-2 text-center">{char}</span>)
            }
            else if (index === userInput.length) return <span className="text-gray-600 bg-gray-800 rounded-sm inline-block min-w-2 text-center">{char}</span>
            else{
                const isCorrect = userInput[index] === char;
                if (isCorrect)
                    return (
                        <span className="text-green-600 inline-block min-w-2 text-center">{char}</span>
                    )
                else return <span className="text-red-700 underline inline-block min-w-2 text-center">{char} </span>
            }
        })
    }

    return(
        <div id="text-hint" className={`p-1 absolute text-gray-600 top-0 left-0 z-10 `}>
            {renderText()}
        </div>
    )
}