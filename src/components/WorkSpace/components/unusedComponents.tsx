import React from "react";

interface NodeGateWayProps {
    type: string;
}

interface GateWayDotProps {
    type: string;
}

export const GatewayDot = (props: GateWayDotProps) => {
    return (
        <>
            {(props.type == 'input') && (
            <div className="cursor-pointer hover:border-[1px] hover:border-[#FFF] border-[#7CD4ED] border-[1px] left-[-5px] absolute w-[10px] h-[10px] bg-[#7CD4ED] rounded-[100%]"></div>
        )}
    {(props.type == 'output') && (
        <div className="cursor-pointer hover:border-[1px] hover:border-[#FFF] border-[#7CD4ED] border-[1px] right-[-5px] absolute w-[10px] h-[10px] bg-[#7CD4ED] rounded-[100%]"></div>
    )}
    </>
)
}

export const NodeGateway = (props: NodeGateWayProps) => {
    return (
        <>
            {(props.type == "input") && (
            <div className="cursor-pointer flex flex-row items-center gap-[10px]">
            <GatewayDot type={"input"}></GatewayDot>
                <div className="font-[sans-serif] text-[14px]">Input 1</div>
    </div>
)}
    {(props.type == "output") && (
        <div className="cursor-pointer flex flex-row items-center gap-[10px]">
        <div className="font-[sans-serif] text-[14px]">Output</div>
            <GatewayDot type={"output"}></GatewayDot>
        </div>
    )}
    </>
)
}

export const Node = () => {
    return(
        <div className="relative w-[200px] flex flex-col justify-center rounded-[15px] rounded text-[#FFF] border-[1px] border-[#505356]">
        <div className="flex justify-center w-[100%] font-[sans-serif] text-[14px] py-[7px] border-b-[1px] border-[#505356]">
            Math / Add
            </div>
            <div className="w-[calc(100%-30px)] flex flex-row items-center px-[15px] py-[20px] justify-center  text-[12px]">
    <div className="w-[50%] flex flex-col gap-[10px]">
    <NodeGateway type={'input'}></NodeGateway>
        <NodeGateway type={'input'}></NodeGateway>
        <NodeGateway type={'input'}></NodeGateway>
        </div>
        <div className="w-[50%] flex flex-col items-end justify-center gap-[10px]">
    <NodeGateway type={'output'}></NodeGateway>
        </div>
        </div>
        </div>
)
}