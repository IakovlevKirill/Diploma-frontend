import React, {
    useEffect,
    useRef,
    useState} from 'react';
import {
    useAppDispatch,
    useAppSelector
} from "../../app/hooks.ts";
import {
    updateNodeHeight,
    updateNodeName,
    updateNodeWidth,
    updateNodeX, updateNodeY
} from "../../app/slices/Node/CanvasNodesSlice.ts";

export const NodeProperties = () => {

    const dispatch = useAppDispatch();

    const currentSelectedNode = useAppSelector(state => state.currentNode.node);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const widthInputRef = useRef<HTMLInputElement>(null);
    const heightInputRef = useRef<HTMLInputElement>(null);
    const xInputRef = useRef<HTMLInputElement>(null);
    const yInputRef = useRef<HTMLInputElement>(null);

    const [nodeName, setNodeName] = useState<string>(String(currentSelectedNode?.name));
    const [nodeWidth, setNodeWidth] = useState<string>(String(currentSelectedNode?.size.width));
    const [nodeHeight, setNodeHeight] = useState<string>(String(currentSelectedNode?.size.height));
    const [nodeX, setNodeX] = useState<string>(String(currentSelectedNode?.position.x));
    const [nodeY, setNodeY] = useState<string>(String(currentSelectedNode?.position.y));

    useEffect(() => {
        setNodeName(String(currentSelectedNode?.name));
        setNodeWidth(String(currentSelectedNode?.size.width));
        setNodeHeight(String(currentSelectedNode?.size.height));
        setNodeY(String(currentSelectedNode?.position.y));
        setNodeX(String(currentSelectedNode?.position.x));
    }, [currentSelectedNode]);

    const [isChangeNameInputActive, setIsChangeNameInputActive] = useState(true);
    const [isChangeWidthInputActive, setIsChangeWidthInputActive] = useState(true);
    const [isChangeHeightInputActive, setIsChangeHeightInputActive] = useState(true);
    const [isChangeXInputActive, setIsChangeXInputActive] = useState(true);
    const [isChangeYInputActive, setIsChangeYInputActive] = useState(true);

    useEffect(() => {
        if (!isChangeNameInputActive) {
            nameInputRef?.current?.focus();
            nameInputRef?.current?.select();
        }
        if (!isChangeWidthInputActive) {
            widthInputRef?.current?.focus();
            widthInputRef?.current?.select();
        }
        if (!isChangeHeightInputActive) {
            heightInputRef?.current?.focus();
            heightInputRef?.current?.select();
        }
        if (!isChangeXInputActive) {
            xInputRef?.current?.focus();
            xInputRef?.current?.select();
        }
        if (!isChangeYInputActive) {
            yInputRef?.current?.focus();
            yInputRef?.current?.select();
        }
    }, [isChangeHeightInputActive, isChangeNameInputActive, isChangeWidthInputActive, isChangeXInputActive, isChangeYInputActive]);

    return (
        <div className={`
             bottom-[20px] z-3 right-[20px] w-[400px] bg-[#FFF] rounded-[15px] shadow-[0px_4px_10px_8px_rgba(0,_0,_0,_0.1)]
             ${(currentSelectedNode?.id == "" || !currentSelectedNode) ? "hidden" : "absolute"}
             `}>
            <div className="h-[calc(100%-40px)] p-[20px] flex flex-col justify-between gap-[15px]">
                <div className="font-[Inter-semibold] text-[#000] text-[20px]">Node properties</div>
                <div className="w-full h-[1px] bg-[#ACACAC]"></div>
                <div className="flex flex-col gap-[5px]">
                    <div className="text-[14px] font-[Inter-medium]">
                        Name
                    </div>
                    <div className="w-full ">
                        <button
                            hidden={!isChangeNameInputActive}
                            onClick={() => {
                                setIsChangeNameInputActive(!isChangeNameInputActive);
                            }}
                            className="
                        w-[calc(100%)] text-[16px] p-[4px] rounded-[4px] text-start select-none font-[Inter-bold] text-[#000]
                        border-[1px]
                        border-[#D9D9D9]
                        bg-[#FFF]
                        hover:cursor-text"
                        >
                            {nodeName}
                        </button>
                        <input
                            ref={nameInputRef}
                            hidden={isChangeNameInputActive}
                            id="name-input"
                            placeholder="Enter name"
                            defaultValue={currentSelectedNode?.name}
                            onBlur={(e) => {
                                const newName = e.target.value;
                                setNodeName(newName);
                                dispatch(updateNodeName({id: String(currentSelectedNode?.id), name: newName}));
                                setIsChangeNameInputActive(!isChangeNameInputActive);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    const newName = e?.target?.value;
                                    setNodeName(newName);
                                    dispatch(updateNodeName({id: String(currentSelectedNode?.id), name: newName}));
                                    setIsChangeNameInputActive(!isChangeNameInputActive);
                                }
                            }}
                            type="text"
                            className="
                                w-[calc(100%-10px)] text-[16px] p-[4px] rounded-[4px] select-none font-[Inter-bold] text-[#000] bg-[#FFF] border-[1px]
                                focus:outline-none"
                        />
                    </div> {/* name */}
                </div>
                <div className="flex flex-row gap-[15px]">
                    <div className="w-[calc(50%-7.5px)] flex flex-col gap-[5px]">
                        <div className="text-[14px] font-[Inter-medium]">
                            Width
                        </div>
                        <div className="w-full">
                            <button
                                hidden={!isChangeWidthInputActive}
                                onClick={() => {
                                    setIsChangeWidthInputActive(!isChangeWidthInputActive);
                                }}
                                className="
                        w-[calc(100%)] text-[16px] p-[4px] rounded-[4px] text-start select-none font-[Inter-bold] text-[#000]
                        border-[1px]
                        border-[#D9D9D9]
                        bg-[#FFF]
                        hover:cursor-text"
                            >
                                {nodeWidth}
                            </button>
                            <input
                                ref={widthInputRef}
                                hidden={isChangeWidthInputActive}
                                id="width-input"
                                placeholder="Enter width"
                                defaultValue={currentSelectedNode?.size.width}
                                onBlur={(e) => {
                                    const newWidth = e.target.value;
                                    setNodeWidth(newWidth);
                                    dispatch(updateNodeWidth({id: String(currentSelectedNode?.id), width: Number(newWidth)}));
                                    setIsChangeWidthInputActive(!isChangeWidthInputActive);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        const newWidth = e.target.value;
                                        setNodeWidth(newWidth);
                                        dispatch(updateNodeWidth({id: String(currentSelectedNode?.id), width: Number(newWidth)}));
                                        setIsChangeWidthInputActive(!isChangeWidthInputActive);
                                    }
                                }}
                                type="text"
                                className="
                                w-[calc(100%-10px)] text-[16px] p-[4px] rounded-[4px] select-none font-[Inter-bold] text-[#000] bg-[#FFF] border-[1px]
                                focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="w-[calc(50%-7.5px)] flex flex-col gap-[5px]">
                        <div className="text-[14px] font-[Inter-medium]">
                            Height
                        </div>
                        <div className="w-full">
                            <button
                                hidden={!isChangeHeightInputActive}
                                onClick={() => {
                                    setIsChangeHeightInputActive(!isChangeHeightInputActive);
                                }}
                                className="
                        w-[calc(100%)] text-[16px] p-[4px] rounded-[4px] text-start select-none font-[Inter-bold] text-[#000]
                        border-[1px]
                        border-[#D9D9D9]
                        bg-[#FFF]
                        hover:cursor-text"
                            >
                                {nodeHeight}
                            </button>
                            <input
                                ref={heightInputRef}
                                hidden={isChangeHeightInputActive}
                                id="height-input"
                                placeholder="Enter height"
                                defaultValue={currentSelectedNode?.size.height}
                                onBlur={(e) => {
                                    const newHeight = e.target.value;
                                    setNodeHeight(newHeight);
                                    dispatch(updateNodeHeight({id: String(currentSelectedNode?.id), height: Number(newHeight)}));
                                    setIsChangeHeightInputActive(!isChangeHeightInputActive);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        const newHeight = e.target.value;
                                        setNodeHeight(newHeight);
                                        dispatch(updateNodeHeight({id: String(currentSelectedNode?.id), height: Number(newHeight)}));
                                        setIsChangeHeightInputActive(!isChangeHeightInputActive);
                                    }
                                }}
                                type="text"
                                className="
                                w-[calc(100%-10px)] text-[16px] p-[4px] rounded-[4px] select-none font-[Inter-bold] text-[#000] bg-[#FFF] border-[1px]
                                focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-[15px]">
                    <div className="w-[calc(50%-7.5px)] flex flex-col gap-[5px]">
                        <div className="text-[14px] font-[Inter-medium]">
                            X
                        </div>
                        <div className="w-full">
                            <button
                                hidden={!isChangeXInputActive}
                                onClick={() => {
                                    setIsChangeXInputActive(!isChangeXInputActive);
                                }}
                                className="
                                    w-[calc(100%)] text-[16px] p-[4px] rounded-[4px] text-start select-none font-[Inter-bold] text-[#000]
                                    border-[1px]
                                    border-[#D9D9D9]
                                    bg-[#FFF]
                                    hover:cursor-text
                                        "
                            >
                                {nodeX}
                            </button>
                            <input
                                ref={xInputRef}
                                hidden={isChangeXInputActive}
                                id="x-input"
                                placeholder="Enter x"
                                defaultValue={currentSelectedNode?.position.x}
                                onBlur={(e) => {
                                    const newX = e.target.value;
                                    setNodeX(newX);
                                    dispatch(updateNodeX({id: String(currentSelectedNode?.id), x: Number(newX)}));
                                    setIsChangeXInputActive(!isChangeXInputActive);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        const newX = e.target.value;
                                        setNodeX(newX);
                                        dispatch(updateNodeX({id: String(currentSelectedNode?.id), x: Number(newX)}));
                                        setIsChangeXInputActive(!isChangeXInputActive);
                                    }
                                }}
                                type="text"
                                className="
                                w-[calc(100%-10px)] text-[16px] p-[4px] rounded-[4px] select-none font-[Inter-bold] text-[#000] bg-[#FFF] border-[1px]
                                focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="w-[calc(50%-7.5px)] flex flex-col gap-[5px]">
                        <div className="text-[14px] font-[Inter-medium]">
                            Y
                        </div>
                        <div className="w-full">
                            <button
                                hidden={!isChangeYInputActive}
                                onClick={() => {
                                    setIsChangeYInputActive(!isChangeYInputActive);
                                }}
                                className="
                        w-[calc(100%)] text-[16px] p-[4px] rounded-[4px] text-start select-none font-[Inter-bold] text-[#000]
                        border-[1px]
                        border-[#D9D9D9]
                        bg-[#FFF]
                        hover:cursor-text"
                            >
                                {nodeY}
                            </button>
                            <input
                                ref={yInputRef}
                                hidden={isChangeYInputActive}
                                id="y-input"
                                placeholder="Enter y"
                                defaultValue={currentSelectedNode?.position.y}
                                onBlur={(e) => {
                                    const newY = e.target.value;
                                    setNodeY(newY);
                                    dispatch(updateNodeY({id: String(currentSelectedNode?.id), y: Number(newY)}));
                                    setIsChangeYInputActive(!isChangeYInputActive);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        const newY = e.target.value;
                                        setNodeY(newY);
                                        dispatch(updateNodeY({id: String(currentSelectedNode?.id), y: Number(newY)}));
                                        setIsChangeYInputActive(!isChangeYInputActive);
                                    }
                                }}
                                type="text"
                                className="
                                w-[calc(100%-10px)] text-[16px] p-[4px] rounded-[4px] select-none font-[Inter-bold] text-[#000] bg-[#FFF] border-[1px]
                                focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-center">
                    <div className="font-[Inter-bold]">{currentSelectedNode?.id}</div>
                </div> {/* id */}
            </div>
        </div>
    );
};