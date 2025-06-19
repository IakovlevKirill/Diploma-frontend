import React from 'react';
import {useNavigate} from "react-router-dom";

export const LayoutBar = () => {

    const navigate = useNavigate();

    return(
        <div className="w-screen min-h-[50px] h-[5vh] bg-[#0D0E11] border-b-[1px] border-[#535558]">
            <button
                className="select-none h-full px-[30px] gap-[10px] flex flex-row items-center bg-[#0D0E11] focus:outline-none border-0 cursor-pointer"
                onClick={()=>{
                    navigate('/projects');
                }}>
                <span className="text-[#FFF] font-[Inter-bold]  text-[15px]">DeepNodes</span>
            </button>
        </div>
    )
}
