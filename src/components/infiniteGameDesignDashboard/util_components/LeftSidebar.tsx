
import { Panel } from "./Panel.tsx";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {setCurrentObject} from "../../../app/slices/currentCanvasObjectSlice.ts";
import {setCurrentTool} from "../../../app/slices/currentToolSlice.ts";
import {useNavigate} from "react-router-dom";
import {useGetTestRequestQuery} from "../../../api/testApi.ts";

export const LeftSidebar = () => {

    const { data: test_data, isLoading, isError } = useGetTestRequestQuery();

    const test_msg = test_data?.test

    const objects_array = useAppSelector((state) => state.canvasObjects.objects);

    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    return (
        <Panel position="left">
            <div className="flex flex-col gap-[30px] items-center h-full px-[10px] py-[50px]">
                <div className="h-[70%] flex w-full">
                    {test_msg}
                </div>
                <div className="h-[70%] flex flex-col gap-[10px] items-center overflow-x-hidden w-full">
                    {objects_array.map((object) => (
                        <div
                            onClick={() => {
                                dispatch(setCurrentObject({color: object.color, id: object.id, name: object.name}));
                                dispatch(setCurrentTool("default"))
                            }}
                            key={object.id}
                            className="font-[Inter] cursor-pointer w-full text-center
                        hover:opacity-80
                        ">
                            {object.name}
                        </div>
                    ))}
                </div>
                <div className="h-[20%]">
                    <button
                        onClick={ ()=>{
                            navigate('/')
                        }}
                        className="font-[Inter] border-0 bg-[#FFFFFF] cursor-pointer hover:text-[#0d99ff] underline">
                        Меню
                    </button>
                </div>
            </div>
        </Panel>
    );
};