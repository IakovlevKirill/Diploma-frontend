import React, {
    useEffect,
    useRef,
    useState
} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {
    updateNodeHeight,
    updateNodeName,
    updateNodeType,
    updateNodeWidth,
    updateNodeX, updateNodeY
} from "../../../app/slices/Node/CanvasNodesSlice.ts";
import {BreadCrumbs} from "./BreadCrumps.tsx";

export const RightSidebar = () => {

    const dispatch = useAppDispatch();

    const currentSelectedNode = useAppSelector(state => state.currentNode.node);
    const scale = useAppSelector((state) => state.zoomCanvas.zoom);
    const cursor_position_x = useAppSelector((state) => state.cursorPosition.cursor_position.x);
    const cursor_position_y = useAppSelector((state) => state.cursorPosition.cursor_position.y);

    // TODO переделать в пользов. конфиг в бд

    const [width, setWidth] = useState(localStorage.getItem("canvas_right_sidebar_width") || 300); // Начальная ширина

    const isRightSidebarResizing = useRef(false);

    const handleMouseMove = (e: MouseEvent) => {
        if (!isRightSidebarResizing.current) return;
        const newWidth = e.clientX; // Новая ширина = позиция курсора по X
        if ((document.body.offsetWidth - newWidth) > 240 && (document.body.offsetWidth - newWidth) < 600) { // Минимальная и максимальная ширина
            setWidth((document.body.offsetWidth - newWidth));
            localStorage.setItem('canvas_right_sidebar_width', (String(document.body.offsetWidth - newWidth)))
        }
    };

    const startResize = (e: React.MouseEvent) => {
        e.preventDefault();
        isRightSidebarResizing.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResize);
    };

    const stopResize = () => {
        isRightSidebarResizing.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopResize);
    };

    // Убираем обработчики при размонтировании
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', stopResize);
        };
    }, []);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const typeInputRef = useRef<HTMLInputElement>(null);
    const widthInputRef = useRef<HTMLInputElement>(null);
    const heightInputRef = useRef<HTMLInputElement>(null);
    const xInputRef = useRef<HTMLInputElement>(null);
    const yInputRef = useRef<HTMLInputElement>(null);

    const [nodeName, setNodeName] = useState((currentSelectedNode?.name));
    const [nodeType, setNodeType] = useState((currentSelectedNode?.type));
    const [nodeWidth, setNodeWidth] = useState((currentSelectedNode?.size.width));
    const [nodeHeight, setNodeHeight] = useState((currentSelectedNode?.size.height));
    const [nodeX, setNodeX] = useState((currentSelectedNode?.position.x));
    const [nodeY, setNodeY] = useState((currentSelectedNode?.position.y));

    useEffect(() => {
        setNodeName((currentSelectedNode?.name));
        setNodeType((currentSelectedNode?.type));
        setNodeWidth((currentSelectedNode?.size.width));
        setNodeHeight((currentSelectedNode?.size.height));
        setNodeY((currentSelectedNode?.position.y));
        setNodeX((currentSelectedNode?.position.x));
    }, [currentSelectedNode]);

    const [isChangeNameInputActive, setIsChangeNameInputActive] = useState(true);
    const [isChangeTypeInputActive, setIsChangeTypeInputActive] = useState(true);
    const [isChangeWidthInputActive, setIsChangeWidthInputActive] = useState(true);
    const [isChangeHeightInputActive, setIsChangeHeightInputActive] = useState(true);
    const [isChangeXInputActive, setIsChangeXInputActive] = useState(true);
    const [isChangeYInputActive, setIsChangeYInputActive] = useState(true);

    useEffect(() => {
        if (!isChangeNameInputActive) {
            nameInputRef?.current?.focus();
            nameInputRef?.current?.select();
        }
        if (!isChangeTypeInputActive) {
            typeInputRef?.current?.focus();
            typeInputRef?.current?.select();
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
        <div
            className="h-[95vh] z-5 flex flex-row right-[0px] bg-[#1C1F24] border-r-[1px] border-[#535558]"
            style={{ width: `${width}px` }}
        >
            <div
                className="bg-transparent z- w-[5px] h-full cursor-ew-resize "
                onMouseDown={startResize}
            >

            </div>
            <div className="h-full w-[calc(100%-5px)] flex flex-col justify-start">

                <div className="flex flex-row justify-between w-[calc(100%-20px)] p-[10px] py-[10px]">
                    <div className="w-1/2 flex justify-around">
                        <span className="font-[Inter-medium] text-[12px] text-[#FFF] select-none">
                        Scale
                    </span>
                        <div className="font-[Inter-medium] text-[12px] text-[#FFF] flex flex-col gap-[15px]">
                            {Math.round(scale * 100)}%
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-around">
                        <span className="font-[Inter-medium] text-[12px] text-[#FFF] select-none">
                        {Math.round(cursor_position_x)}
                    </span>
                        <span className="font-[Inter-medium] text-[12px] text-[#FFF] select-none">
                        {Math.round(cursor_position_y)}
                    </span>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#535558]"></div>


                <div className="flex flex-col w-[calc(100%-40px)] p-[20px] gap-[10px]">
                    <span className="font-[Inter-medium] text-[16px] text-[#FFF] select-none">
                        Layers
                    </span>
                    <BreadCrumbs></BreadCrumbs>
                </div>

                <div className="w-full h-[1px] bg-[#535558]"></div>

                <div className="flex flex-col w-[calc(100%-40px)] p-[20px] gap-[20px]">
                    <span className="font-[Inter-medium] text-[16px] text-[#FFF] select-none">
                        Properties
                    </span>
                    <div className="flex flex-col gap-[15px]">
                        <div className="w-full flex flex-col gap-[5px]">
                            <span className="font-[Inter-medium] text-[#FFF] text-[14px]">Name</span>
                            <button
                                hidden={!isChangeNameInputActive}
                                onClick={() => {
                                    setIsChangeNameInputActive(!isChangeNameInputActive);
                                }}
                                className="
                                    w-[calc(100%)]
                                    h-[30px]
                                    text-[16px]
                                    p-[4px]
                                    rounded-[4px]
                                    text-start
                                    select-none
                                    font-[Inter-bold]
                                    border-[1px]
                                    text-[#FFF]
                                    border-[#7D7D7D]
                                    bg-[#1C1F24]
                                    hover:cursor-text
                                    "
                            >
                                <div className="text-[#FFF]">
                                    {nodeName}
                                </div>
                            </button>
                            <input
                                ref={nameInputRef}
                                hidden={isChangeNameInputActive}
                                id="name-input"
                                placeholder="Enter name"
                                defaultValue={currentSelectedNode?.name}
                                onBlur={(e) => {
                                    const newName = e?.target?.value;
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
                                w-[calc(100%-10px)] h-[20px] text-[16px] p-[4px] rounded-[4px] select-none font-[Inter-bold] text-[#FFF] bg-[#1C1F24] border-[1px] border-[#FFF]
                                focus:outline-none"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-[5px]">
                            <span className="font-[Inter-medium] text-[#FFF] text-[14px]">Object Type</span>
                            <button
                                hidden={!isChangeNameInputActive}
                                onClick={() => {
                                    setIsChangeTypeInputActive(!isChangeTypeInputActive);
                                }}
                                className="
                                    w-[calc(100%)]
                                    h-[30px]
                                    text-[16px]
                                    p-[4px]
                                    rounded-[4px]
                                    text-start
                                    select-none
                                    font-[Inter-bold]
                                    border-[1px]
                                    text-[#FFF]
                                    border-[#7D7D7D]
                                    bg-[#1C1F24]
                                    hover:cursor-text
                                    "
                            >
                                <div className="text-[#FFF]">
                                    {nodeType}
                                </div>
                            </button>
                            <input
                                ref={typeInputRef}
                                hidden={isChangeTypeInputActive}
                                id="type-input"
                                placeholder="Choose type"
                                defaultValue={currentSelectedNode?.name}
                                onBlur={(e) => {
                                    const newType = e?.target?.value;
                                    setNodeType(newType);
                                    dispatch(updateNodeType({id: String(currentSelectedNode?.id), type: newType}));
                                    setIsChangeTypeInputActive(!isChangeTypeInputActive);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        const newType = e?.target?.value;
                                        setNodeName(newType);
                                        dispatch(updateNodeType({id: String(currentSelectedNode?.id), type: newType}));
                                        setIsChangeTypeInputActive(!isChangeTypeInputActive);
                                    }
                                }}
                                type="text"
                                className="
                                w-[calc(100%-10px)] h-[20px] text-[16px] p-[4px] rounded-[4px] select-none font-[Inter-bold] text-[#FFF] bg-[#1C1F24] border-[1px] border-[#FFF]
                                focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-row gap-[15px]">
                            <div className="w-[calc(50%-7.5px)] flex flex-col gap-[5px]">
                                <div className="text-[14px] font-[Inter-medium] text-[#fff]">
                                    Width
                                </div>
                                <div className="w-full">
                                    <button
                                        hidden={!isChangeWidthInputActive}
                                        onClick={() => {
                                            setIsChangeWidthInputActive(!isChangeWidthInputActive);
                                        }}
                                        className="
                                            w-[calc(100%)] h-[30px] text-[16px] p-[4px] rounded-[4px] text-start select-none font-[Inter-bold]
                                             text-[#FFF]
                                            border-[1px]
                                            border-[#7D7D7D]
                                            bg-[#1C1F24]
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
                                            w-[calc(100%-10px)]
                                            h-[20px]
                                            text-[16px]
                                            p-[4px]
                                            rounded-[4px]
                                            select-none
                                            font-[Inter-bold]
                                            text-[#FFF]
                                            bg-[#1C1F24]
                                            border-[1px]
                                            focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="w-[calc(50%-7.5px)] flex flex-col gap-[5px]">
                                <div className="text-[14px] font-[Inter-medium] text-[#FFF]">
                                    Height
                                </div>
                                <div className="w-full">
                                    <button
                                        hidden={!isChangeHeightInputActive}
                                        onClick={() => {
                                            setIsChangeHeightInputActive(!isChangeHeightInputActive);
                                        }}
                                        className="
                                            w-[calc(100%)] text-[16px] h-[30px] p-[4px] rounded-[4px] text-start select-none font-[Inter-bold]
                                               text-[#FFF]
                                            border-[1px]
                                            border-[#7D7D7D]
                                            bg-[#1C1F24]
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
                                            w-[calc(100%-10px)]
                                            h-[20px]
                                            text-[16px]
                                            p-[4px]
                                            rounded-[4px]
                                            select-none
                                            font-[Inter-bold]
                                            text-[#FFF]
                                            bg-[#1C1F24]
                                            border-[1px]
                                            focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-[15px]">
                            <div className="w-[calc(50%-7.5px)] flex flex-col gap-[5px]">
                                <div className="text-[14px] font-[Inter-medium] text-[#FFF]">
                                    X
                                </div>
                                <div className="w-full">
                                    <button
                                        hidden={!isChangeXInputActive}
                                        onClick={() => {
                                            setIsChangeXInputActive(!isChangeXInputActive);
                                        }}
                                        className="
                                            overflow-hidden
                                            w-[calc(100%)] text-[16px] h-[30px] p-[4px] rounded-[4px] text-start select-none font-[Inter-bold]
                                            text-[#FFF]
                                            border-[1px]
                                            border-[#7D7D7D]
                                            bg-[#1C1F24]
                                            hover:cursor-text
                                        "
                                    >
                                        {(nodeX == "-") ? "-" : (Math.round(Number(nodeX)))}
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
                                            overflow-hidden
                                            w-[calc(100%-10px)]
                                            h-[20px]
                                            text-[16px]
                                            p-[4px]
                                            rounded-[4px]
                                            select-none
                                            font-[Inter-bold]
                                            text-[#FFF]
                                            bg-[#1C1F24]
                                            border-[1px]
                                            focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="w-[calc(50%-7.5px)] flex flex-col gap-[5px]">
                                <div className="text-[14px] font-[Inter-medium] text-[#FFF]">
                                    Y
                                </div>
                                <div className="w-full">
                                    <button
                                        hidden={!isChangeYInputActive}
                                        onClick={() => {
                                            setIsChangeYInputActive(!isChangeYInputActive);
                                        }}
                                        className="
                                             overflow-hidden
                                             w-[calc(100%)] text-[16px] h-[30px] p-[4px] rounded-[4px] text-start select-none font-[Inter-bold]
                                             text-[#FFF]
                                             border-[1px]
                                             border-[#7D7D7D]
                                             bg-[#1C1F24]
                                             hover:cursor-text"
                                    >
                                        {(nodeX == "-") ? "-" : (Math.round(Number(nodeY)))}
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
                                            overflow-hidden
                                            w-[calc(100%-10px)]
                                            h-[20px]
                                            text-[16px]
                                            p-[4px]
                                            rounded-[4px]
                                            select-none
                                            font-[Inter-bold]
                                            text-[#FFF]
                                            bg-[#1C1F24]
                                            border-[1px]
                                            focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[5px]">
                            <span className="font-[Inter-medium] text-[14px] text-[#FFF] ">Group color</span>
                            <div className="w-[25px] h-[25px] border-[1px] border-[#7D7D7D] rounded-[5px] flex items-center justify-center">
                                {
                                    (currentSelectedNode?.pointColor == "-")
                                    ?
                                    (<div className="w-[17px] h-[17px] rounded-[5px]"></div>)
                                    :
                                    (<div className={`
                                    w-[17px] h-[17px] rounded-[5px]
                                    ${(currentSelectedNode?.type == "untyped") ? "bg-[#1c1f24]" : ""}
                                    ${(currentSelectedNode?.type== "quest") ? "bg-[#207E0D]" : ""}
                                    ${(currentSelectedNode?.type == "location") ? "bg-[#1BBAAD]" : ""}
                                    ${(currentSelectedNode?.type == "character") ? "bg-[#0647A8]" : ""}
                                    ${(currentSelectedNode?.type == "event") ? "bg-[#C1CF00]" : ""}
                                    ${(currentSelectedNode?.type == "boss") ? "bg-[#A80104]" : ""}
                                    ${(currentSelectedNode?.type == "item") ? "bg-[#9000C9]" : ""}
                                    ${(currentSelectedNode?.type == "cluster") ? "bg-[#FF14B8]" : ""}
                                    `}></div>)
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-[5px]">
                            <span className="font-[Inter-medium] text-[14px] text-[#FFF] ">ID</span>
                            <div className="cursor-pointer w-full flex items-center justify-center p-[4px] rounded-[5px] border-[#7D7D7D] border-[1px] h-[35px]">
                                <span className="font-[Inter-medium] text-[14px] text-[#FFF]">
                                    {currentSelectedNode?.id}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#535558]"></div>

                <div className="w-[100%-40px] p-[20px] flex flex-col">
                    <span className="font-[Inter-medium] text-[16px] text-[#FFF] select-none">Dependencies</span>
                </div>

            </div>
        </div>
    );
};