export default function ({nameOfParam,resultOfParam}){

    const getColor = () => {
        switch (nameOfParam){
            case "WPM":
                return "text-white";
            case "Accuracy":
                if (resultOfParam >=90) return "text-green-500";
                else  if (resultOfParam >= 60) return "text-yellow-500";
                else return "text-red-500";
        }
    }

    const formatResult = () =>{
        switch (nameOfParam){
            case "Accuracy":
                return resultOfParam +"%";
            case "Characters":
                const arr = resultOfParam.split("/");
                return (<div> <span className="text-green-500">{arr[0]}</span>/<span className="text-red-500">{arr[1]}</span></div>)
            default:
                return  resultOfParam;
        }
    }
    return(
        <div className="flex flex-col justify-start w-1/3 border-gray-600 border-[0.5px] text-gray-300 px-3 py-1 rounded-md ">
            <span>{nameOfParam} </span>
            <span className={`${getColor()}`}>{formatResult()}</span>
        </div>
    )
}