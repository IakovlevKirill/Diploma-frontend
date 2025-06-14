import React, {useEffect, useRef, useState} from 'react';
import {useAppSelector} from "../../app/hooks.ts";

export const NodeProperties = () => {

    const currentSelectedNode = useAppSelector(state => state.currentNode.node);

    const inputRef = useRef(null);

    const [nodeName, setNodeName] = useState<string>(String(currentSelectedNode?.name));

    useEffect(() => {
        setNodeName(String(currentSelectedNode?.name));
    }, [currentSelectedNode]);

    const [isChangeTitleInputActive, setIsChangeTitleInputActive] = useState(true);

    useEffect(() => {
        if (!isChangeTitleInputActive && inputRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            inputRef.current.focus();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            inputRef.current.select();
        }
    }, [isChangeTitleInputActive]);

    return (
        <div className="absolute bottom-[30px] z-3 right-[30px] w-[400px] h-[30vh] bg-[#FFF] rounded-[15px] shadow-lg">
            <div className="h-[calc(100%-40px)] p-[20px] flex flex-col justify-between gap-[10px]">
                <div className="font-[Inter-semibold] text-[#000] text-[20px]">Node properties</div>
                <div className="w-full h-[1px] bg-[#ACACAC]"></div>
                <div className="w-full ">
                    <button
                        hidden={!isChangeTitleInputActive}
                        onClick={() => {
                            setIsChangeTitleInputActive(!isChangeTitleInputActive);
                        }}
                        className="w-[calc(100%)] text-[20px] p-[4px] rounded-[8px] text-start select-none font-[Inter-semibold] text-[#FFF]
                                border-[1px]
                                border-[#1C1F24]
                                bg-[#1C1F24]
                                hover:bg-[#5b5d61]
                                hover:border-[#5b5d61]"
                    >
                        {nodeName}
                    </button>
                    <input
                        ref={inputRef}
                        hidden={isChangeTitleInputActive}
                        id="title-input"
                        placeholder="Enter title"
                        defaultValue={nodeName}
                        onBlur={(e) => {
                            const newName = e.target.value;
                            setNodeName(newName);
                            setIsChangeTitleInputActive(!isChangeTitleInputActive);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                const newTitle = e?.target?.value;
                                setNodeName(newTitle);
                                setIsChangeTitleInputActive(!isChangeTitleInputActive);
                            }
                        }}
                        type="text"
                        className="
                                w-[calc(100%-10px)] text-[20px] p-[4px] rounded-[8px] select-none font-[Inter-semibold] text-[#FFF] bg-[#1C1F24] border-[1px]
                                focus:outline-none"
                    />
                </div>
                <div className="flex flex-row w-full">
                    <div className="w-1/2 flex flex-col gap-[25px] font-[Inter-bold]">
                        <div className="flex flex-row gap-[15px]">
                            <div>Width:</div>
                            <div>{currentSelectedNode?.size.width}</div>
                        </div>
                        <div className="flex flex-row gap-[15px]">
                            <div>Height:</div>
                            <div>{currentSelectedNode?.size.height}</div>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-[25px] font-[Inter-bold]">
                        <div className="flex flex-row gap-[15px]">
                            <div>X:</div>
                            <div>{currentSelectedNode?.position.x}</div>
                        </div>
                        <div className="flex flex-row gap-[15px]">
                            <div>Y:</div>
                            <div>{currentSelectedNode?.position.y}</div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-center">
                    <div className="font-[Inter-bold]">{currentSelectedNode?.id}</div>
                </div>
            </div>
        </div>
    );
};