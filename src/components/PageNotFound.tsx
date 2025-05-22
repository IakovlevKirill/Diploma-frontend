import {useDocumentTitle} from "../app/hooks.ts";

export const PageNotFound = () => {

    useDocumentTitle(`404 - WebNode`);

    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center select-none">
            <span className="text-[16px] font-[Inter-medium] text-[#FFF]">Страница не найдена </span>
        </div>
    );
};