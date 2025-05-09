import avatar_example from "../../assets/images/avatar_example.png"
import inbox from "../../assets/images/inbox_icon_white.png"
import team from "../../assets/images/team_icon_white.png"
import template from "../../assets/images/templates_icon_white.png"
import project from "../../assets/images/project_icon_white.png"
import polygon_sidebar_open from "../../assets/images/polygon_sidebar_open.png"
import {Outlet, useNavigate} from "react-router-dom";
import { LayoutBar } from "../LayoutBar"

export const MenuLayout = () => {

    const navigate = useNavigate();

    const LayoutSidebar = () => {
        return(
            <div className="flex flex-col h-[100%] w-full items-center bg-[#191C21] border-r-[1px] border-[#535558]">
                <div className="flex flex-col h-full">
                    <div className="flex flex-col w-full">
                        <div className="flex text-[#FFF] font-[Inter-normal]  text-[15px] pt-[30px] px-[30px]">Search projects</div>
                        <div className="flex w-full py-[16px] ">
                            <div className="flex flex-col w-full px-[30px]">
                                <input
                                    className="flex w-[100%] bg-[#1F2A37] border-[1px] border-[#575F69] rounded-[10px] text-center py-[12px] focus:outline-none font-[Inter-medium]  text-[16px]"
                                    type="text"
                                    placeholder="@Project"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-[15px] border-t-[1px] border-[#535558] pt-[50px]">
                        <button
                            onClick={()=>{
                                navigate('/projects')
                            }}
                            className="flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                            <img className="w-[24px] h-[24px]" src={project} alt=""/>
                            <div className="text-[#FFF] font-[Inter-medium]  text-[16px]">Projects</div>
                        </button>
                        <button
                            onClick={()=>{
                                navigate('/inbox')
                            }}
                            className="flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                            <img className="w-[24px] h-[24px]" src={inbox} alt=""/>
                            <div className="text-[#FFF] font-[Inter-medium] text-[16px]">Inbox</div>
                        </button>
                        <button
                            onClick={()=>{
                                navigate('/teams')
                            }}
                            className="flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                            <img className="w-[24px] h-[24px]" src={team} alt=""/>
                            <div className="text-[#FFF] font-[Inter-medium] text-[16px]">Teams</div>
                        </button>
                        <button
                            onClick={()=>{
                                navigate('/templates')
                            }}
                            className="flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                            <img className="w-[24px] h-[24px]" src={template} alt=""/>
                            <div className="text-[#FFF] font-[Inter-medium] text-[16px]">Templates</div>
                        </button>
                    </div>
                </div>
                <button
                    onClick={()=>{
                        navigate('/profile')
                    }}
                    className="cursor-pointer flex flex-row w-full justify-between items-center py-[18px] border-t-[1px] border-[#535558] bg-[#191C21] border-[0px] focus:outline-none">
                    <div className="flex flex-row gap-[14px] items-center pl-[25px] ">
                        <img src={avatar_example} alt=""/>
                        <div className="flex flex-col">
                            <div className="text-[#FFF] font-[Inter-semibold] text-[20px]">Steve Jobs</div>
                            <div className="text-[#A8A9AC] font-[Inter-normal] text-[12px]">Maintainer</div>
                        </div>
                    </div>
                    <img className="pr-[12px]" src={polygon_sidebar_open} alt=""/>
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col overflow-hidden w-[100vw] h-[100vh]">
            <LayoutBar></LayoutBar>
            <div className="w-[100vw] h-[95vh] flex flex-row">
                <div className="w-[16%] h-[95vh]">
                    <LayoutSidebar></LayoutSidebar>
                </div>
                <div className="w-[calc(84%-1px)] h-[95vh]">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};