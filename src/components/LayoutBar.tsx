import React from 'react';
import logo from "../../src/assets/images/logo.png"

import {useNavigate} from "react-router-dom";

export const LayoutBar = () => {

    const navigate = useNavigate();

    return(
        <div className="w-screen min-h-[50px] h-[5vh] bg-[#0D0E11] border-b-[1px] border-[#535558]">
            <button
                className="h-full px-[30px] gap-[20px] flex flex-row items-center bg-[#0D0E11] focus:outline-none border-0 cursor-pointer"
                onClick={()=>{
                    navigate('/projects');
                }}>
                <img
                    className="w-[26px] h-[26px] cursor-pointer"
                    src={logo} alt=""/>
                <span className="text-[#FFF] font-[Inter-bold]  text-[15px]">WebNode</span>
            </button>
        </div>
    )
}
