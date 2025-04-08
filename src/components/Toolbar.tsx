import {useState} from "react";
import cell from "../assets/cell_toolbar.png"
import cell_active from "../assets/cell_active_tollbar.png"
import link from "../assets/link_toolbar.png"
import link_active from "../assets/link_active_tollbar.png"

export const Toolbar = () => {

    const [currentTool, setCurrentTool] = useState<string>()
    
    return (
        <div className="z-100 w-full flex items-center justify-center absolute top-[2%]">
            <div className="gap-[10px] px-[10px] py-[5px] flex items-center bg-[#FFFFFF] rounded-[10px] border-[1px] border-[#EBEBEB] shadow-[0px_5px_16px_0px_rgba(0,_0,_0,_0.1)]">
                <button
                    className={`bg-[white] flex items-center justify-center border-[1px] border-[white] w-[30px] h-[30px] rounded-[8px]
                    hover:bg-[#F2F2F2] 
                    ${currentTool === "square" ? "bg-[#3575FF]! border-[1px] " : ""}
                    `}
                    onClick={() => {
                        setCurrentTool("square")
                        console.log(currentTool)
                    }}
                >
                    {(currentTool === "square") && (
                        <img className="w-full" src={cell_active} alt=""/>
                    )}
                    {(currentTool !== "square") && (
                        <img className="w-full" src={cell} alt=""/>
                    )}
                </button>
                <button
                    className={`bg-[white] flex items-center justify-center border-[1px] border-[white] w-[30px] h-[30px] rounded-[8px]
                    hover:bg-[#F2F2F2] 
                    ${currentTool === "link" ? "bg-[#3575FF]! border-[1px] " : ""}
                    `}
                    onClick={() => {
                        setCurrentTool("link")
                        console.log(currentTool)
                    }}
                >
                    {(currentTool === "link") && (
                        <img className="w-full" src={link_active} alt=""/>
                    )}
                    {(currentTool !== "link") && (
                        <img className="w-full" src={link} alt=""/>
                    )}
                </button>
            </div>
        </div>
    );
};