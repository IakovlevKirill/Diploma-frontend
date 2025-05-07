import {useCreateProjectMutation, useGetAllProjectsQuery} from "../../api/testApi.ts";
import mail from "../../assets/images/mail_icon.png"
import team_icon from "../../assets/images/team_icon.png"
import logo from "../../assets/images/logo.png"
import avatar_example from "../../assets/images/avatar_example.png"
import user_group from "../../assets/images/Users_Group.png"
import polygon_sidebar_open from "../../assets/images/polygon_sidebar_open.png"
import {Outlet, useNavigate} from "react-router-dom";

export const MenuLayout = () => {

    const navigate = useNavigate();

    const OnLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        navigate('/auth');
    };

    return (
        <div className="flex flex-col w-screen h-screen overflow-hidden ">
            <div className="w-screen min-h-[50px] h-[5%] bg-[#0D0E11] border-b-[1px] border-[#535558]">
                <button
                    className="h-full px-[30px] gap-[20px] flex flex-row items-center bg-[#0D0E11] focus:outline-none border-0 cursor-pointer"
                    onClick={()=>{
                        navigate('/projects');
                    }}>
                    <img
                        className="w-[26px] h-[26px] cursor-pointer"
                        src={logo} alt=""/>
                    <span className="text-[#FFF] font-[Inter] font-bold text-[15px]">Nazvanie</span>
                </button>
            </div>
            <div className="w-[100vw] h-[95%] flex flex-row">
                <div className="flex flex-col items-center w-[16%] h-full  bg-[#191C21] border-r-[1px] border-[#535558]">
                    <div className="flex flex-col h-[95%]">
                        <div className="flex flex-col h-[35%] w-full">
                            <div className="flex text-[#FFF] font-[Inter] font-regular text-[15px] pt-[30px] px-[30px]">Search projects</div>
                            <div className="flex w-full py-[16px] ">
                                <div className="flex flex-col w-full px-[30px]">
                                    <input
                                        className="flex w-[100%] bg-[#1F2A37] border-[1px] border-[#575F69] rounded-[10px] text-center py-[12px] focus:outline-none font-[Inter] text-[#FFF] font-medium text-[16px]"
                                        type="text"
                                        placeholder="@Project"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col h-[65%] gap-[15px] border-t-[1px] border-[#535558] pt-[50px]">
                            <button
                                onClick={()=>{
                                    navigate('/projects')
                                }}
                                className="flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                                <img className="w-[24px] h-[24px]" src={user_group} alt=""/>
                                <div className="text-[#FFF] font-[Inter] font-medium text-[16px]">Projects</div>
                            </button>
                            <button
                                onClick={()=>{
                                    navigate('/inbox')
                                }}
                                className="flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                                <img className="w-[24px] h-[24px]" src={mail} alt=""/>
                                <div className="text-[#FFF] font-[Inter] font-medium text-[16px]">Inbox</div>
                            </button>
                            <button
                                onClick={()=>{
                                    navigate('/teams')
                                }}
                                className="flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                                <img className="w-[24px] h-[24px]" src={team_icon} alt=""/>
                                <div className="text-[#FFF] font-[Inter] font-medium text-[16px]">Teams</div>
                            </button>
                            <button
                                onClick={()=>{
                                    navigate('/templates')
                                }}
                                className="flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                                <img className="w-[24px] h-[24px]" src={user_group} alt=""/>
                                <div className="text-[#FFF] font-[Inter] font-medium text-[16px]">Templates</div>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row w-full h-[5%] justify-between items-center py-[18px] cursor-pointe border-t-[1px] border-[#535558]">
                        <div className="flex flex-row gap-[14px] items-center pl-[25px] ">
                            <img src={avatar_example} alt=""/>
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter] font-semibold text-[20px]">Steve Jobs</div>
                                <div className="text-[#A8A9AC] font-[Inter] font-regular text-[12px]">Maintainer</div>
                            </div>
                        </div>
                        <img className="pr-[12px]" src={polygon_sidebar_open} alt=""/>
                    </div>
                </div>
                <Outlet></Outlet>

            </div>
        </div>
    );
};