import React from 'react';
import {LayoutBar} from "../LayoutBar.tsx";
import {RingLoader} from "react-spinners";

export const WorkSpaceLoading = () => {
    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <LayoutBar></LayoutBar>
            <div className="flex flex-col items-center justify-center font-[Inter-medium] text-[#FFF] w-full h-full">
                <RingLoader
                    color={'#ffffff'}
                    speedMultiplier={1}
                />
            </div>
        </div>
    );
};