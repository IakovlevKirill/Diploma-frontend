import {useDocumentTitle} from "../app/hooks.ts";
import {LayoutBar} from "./LayoutBar.tsx";
import React from "react";

export const PageNotFound = () => {

    useDocumentTitle(`404 - DeepNodes`);

    return (
        <div className="flex flex-col overflow-hidden w-[100vw] h-[100vh]">
            <LayoutBar></LayoutBar>
            <div className="h-[95vh] w-[100vw] flex items-center justify-center select-none">
                <span className="text-[16px] font-[Inter-medium] text-[#FFF]">Страница не найдена </span>
            </div>
        </div>
    );
};