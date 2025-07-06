import {images} from '../../../assets/images/images'
import {
    useAppDispatch,
    useAppSelector
} from "../../../app/hooks.ts";
import {setCurrentTool} from "../../../app/slices/WorkSpace/currentToolSlice.ts";
import * as React from "react";
import {setVisible} from "../../../app/slices/Other/ModalNewObjectTypeCreationVisibilitySlice.tsx";
import {store} from "../../../store/store.ts";

export const Toolbar = () => {

    const currentTool = useAppSelector((state) => state.currentTool.tool);

    const dispatch = useAppDispatch();

    const handleToolbarClick = (e : React.MouseEvent) => {
        e.stopPropagation();
    };

    const CreateObjectButtonComponent = (
        props: {
            tool_type:
                'default' |
                'node_creation' |
                'quest_creation' |
                'location_creation' |
                'character_creation' |
                'event_creation' |
                'boss_creation' |
                'item_creation' |
                'cluster_creation',
            img_black: string,
            img_white: string,
        }) => {
        return(
            <button
                className={`
                    bg-[white] 
                    flex 
                    items-center 
                    justify-center 
                    border-[1px] 
                    border-[white] 
                    w-[35px] 
                    h-[35px] 
                    rounded-[8px]
                    hover:bg-[#F2F2F2] 
                    focus:outline-[0]
                    ${currentTool === `${props.tool_type}` ? "bg-[#3575FF]! border-[1px] " : ""}
                    `}
                onClick={() => {
                    dispatch(setCurrentTool(props.tool_type))
                }}
            >
                {
                    (currentTool === props.tool_type)
                        ?
                        (<img className="h-[25px] w-[25px]" src={props.img_white} alt=""/>)
                        :
                        (<img className="h-[25px] w-[25px]" src={props.img_black} alt=""/>)
                }
            </button>
        )
    }

    return (
        <div
            onClick={handleToolbarClick}
            className="z-15"
        >
            <div className="
                 select-none
                 cursor-default
                 gap-[10px]
                 px-[10px]
                 py-[5px]
                 flex
                 items-center
                 bg-[#FFFFFF]
                 rounded-[10px]
                 border-[1px]
                 border-[#EBEBEB]
                 shadow-[0px_5px_16px_0px_rgba(0,_0,_0,_0.1)]
            ">
                <CreateObjectButtonComponent
                    tool_type={'default'}
                    img_black={images.move_hand_toolbox}
                    img_white={images.move_hand_toolbox_active}
                />
                <CreateObjectButtonComponent
                    tool_type={'node_creation'}
                    img_black={images.cell_toolbar}
                    img_white={images.cell_active_toolbar}
                />
                <div className="h-[30px] w-[1px] bg-[#717171]"></div>
                <CreateObjectButtonComponent
                    tool_type={'quest_creation'}
                    img_black={images.quest_icon_black}
                    img_white={images.quest_icon_white}
                />
                <CreateObjectButtonComponent
                    tool_type={'location_creation'}
                    img_black={images.location_icon_black}
                    img_white={images.location_icon_white}
                />
                <CreateObjectButtonComponent
                    tool_type={'character_creation'}
                    img_black={images.character_icon_black}
                    img_white={images.character_icon_white}
                />
                <CreateObjectButtonComponent
                    tool_type={'event_creation'}
                    img_black={images.event_icon_black}
                    img_white={images.event_icon_white}
                />
                <CreateObjectButtonComponent
                    tool_type={'boss_creation'}
                    img_black={images.boss_icon_black}
                    img_white={images.boss_icon_white}
                />
                <CreateObjectButtonComponent
                    tool_type={'item_creation'}
                    img_black={images.item_icon_black}
                    img_white={images.item_icon_white}
                />
                <CreateObjectButtonComponent
                    tool_type={'cluster_creation'}
                    img_black={images.cluster_icon_black}
                    img_white={images.cluster_icon_white}
                />
                <button
                    onClick={() => {
                        dispatch(setVisible())
                        console.log(store.getState())
                    }}
                    className="
                    bg-[white]
                    flex
                    items-center
                    justify-center
                    border-[1px]
                    border-[white]
                    w-[35px]
                    h-[35px]
                    rounded-[8px]
                    hover:bg-[#F2F2F2]
                    focus:outline-[0]
                    ">
                    <img
                        className="
                        w-[22px]
                        h-[22px]
                        "
                        src={images.cross}
                        alt=""/>
                </button>
            </div>
        </div>
    );
};