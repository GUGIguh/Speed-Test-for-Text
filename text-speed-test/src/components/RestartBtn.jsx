import RestartIcon from "../Icons/Restart-icon";

export default function ({resetTest}) {

    function buttonHandler() {
        resetTest();
    }

    return(
        <button
            onClick={buttonHandler}
            className="flex gap-1 items-center px-2 py-2 bg-gray-800 font-semibold text-white rounded-xl ">
                Restart Test <RestartIcon/>
        </button>
    )
}

