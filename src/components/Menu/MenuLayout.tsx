import {images} from "../../assets/images/images"
import {Outlet, useNavigate} from "react-router-dom";
import { LayoutBar } from "../LayoutBar"
import React, {useEffect, useState} from "react";
import {useGetUserByIdQuery} from "../../api/testApi.ts";
import {useDocumentTitle} from "../../app/hooks.ts";
import {RingLoader} from "react-spinners";
import {useDispatch} from "react-redux";
import {setUserId} from "../../app/slices/CurrentUserIdSlice.ts";

export const MenuLayout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userId = String(localStorage.getItem("userId"))

    useEffect(() => {
        if (document.URL == 'http://localhost:5173/' || document.URL == 'https://diploma-frontend-mlcp.onrender.com/') {
            navigate("/projects");
        }

    }, [navigate]);

    useEffect(() => {
        dispatch(setUserId(userId));
    }, [dispatch, userId]);

    useDocumentTitle(`Home - WebNode`);

    const [currentPage, setCurrentPage] = useState<string>()

    const {data: user_data, isLoading} = useGetUserByIdQuery(userId)

    const firstLetter = user_data?.email?.charAt(0).toUpperCase()

    interface OnChangePageProps {
        e: React.MouseEvent<HTMLButtonElement>
        page: string
    }

    const OnChangePage = (props : OnChangePageProps) => {
        props.e.stopPropagation()
        setCurrentPage(props.page)
        navigate(`/${props.page}`)
    }

    const LayoutSidebar = () => {
        return(
            <div className="flex flex-col h-[100%] w-full items-center bg-[#191C21] border-r-[1px] border-[#535558] overflow-hidden">
                <div className="flex flex-col h-full">
                    <div className="flex flex-col w-full">
                        <div className="flex text-[#FFF] font-[Inter-normal]  text-[15px] pt-[30px] px-[30px]">Search projects</div>
                        <div className="flex w-full py-[16px] ">
                            <div className="flex flex-col w-full px-[30px]">
                                <input
                                    className="flex w-[100%] bg-[#1F2A37] text-[#FFF] border-[1px] border-[#575F69] rounded-[10px] text-center py-[12px] focus:outline-none font-[Inter-medium]  text-[16px]"
                                    type="text"
                                    placeholder="@Project"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-[15px] border-t-[1px] border-[#535558] pt-[50px] ">
                        <button
                            onClick={(e) => OnChangePage({page: "projects", e})}
                            className=" flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                            <img className="w-[24px] h-[24px]" src={images.project_icon_white} alt=""/>
                            <div className={`text-[#FFF] font-[Inter-medium]  text-[16px]
                                ${currentPage == 'projects' ? '' : '' }`}>Projects</div>
                        </button>
                        <button
                            onClick={(e) => OnChangePage({page: "templates", e})}
                            className=" flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                            <img className="w-[24px] h-[24px]" src={images.templates_icon_white} alt=""/>
                            <div className={`text-[#FFF] font-[Inter-medium]  text-[16px]
                                ${currentPage == 'templates' ? '' : '' }`}>Templates</div>
                        </button>
                        <button
                            onClick={(e) => OnChangePage({page: "inbox", e})}
                            className=" flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                            <img className="w-[24px] h-[24px]" src={images.inbox_icon_white} alt=""/>
                            <div className={`text-[#FFF] font-[Inter-medium]  text-[16px]
                                ${currentPage == 'inbox' ? '' : '' }`}>Inbox</div>
                        </button>
                        <button
                            onClick={(e) => OnChangePage({page: "teams", e})}
                            className=" flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                            <img className="w-[24px] h-[24px]" src={images.team_icon_white} alt=""/>
                            <div className={`text-[#FFF] font-[Inter-medium]  text-[16px]
                                ${currentPage == 'teams' ? '' : '' }`}>Teams</div>

                        </button>
                    </div>
                </div>
                <button
                    onClick={(e) => OnChangePage({page: "profile", e})}
                    className="cursor-pointer flex flex-row w-full justify-between items-center py-[18px] border-t-[1px] border-[#535558] bg-[#191C21] border-[0px] focus:outline-none">
                    <div className="flex flex-row gap-[14px] items-center pl-[25px]">
                        <div className="flex items-center justify-center w-[46px] h-[46px] bg-[#252B3B]  rounded-[100px]">
                            <span className="text-[#FFF] font-[Inter-medium]  text-[16px]">{firstLetter}</span>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <div className="text-[#FFF] font-[Inter-semibold] text-[16px]">{user_data?.email}</div>
                            <div className="text-[#A8A9AC] font-[Inter-normal] text-[12px]">{user_data?.role}</div>
                        </div>
                    </div>
                    <img className="pr-[12px]" src={images.polygon_sidebar_open} alt=""/>
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col overflow-hidden w-[100vw] h-[100vh]">
            <LayoutBar></LayoutBar>
            {(isLoading) ? (
                <div className="flex flex-col items-center justify-center font-[Inter-medium] text-[#FFF] w-full h-full">
                    <RingLoader
                        color={'#ffffff'}
                        speedMultiplier={1}
                    />
                </div>
            ) : (
                <div className="w-[100vw] h-[95vh] flex flex-row">
                    <div className="w-[16%] h-[95vh]">
                        <LayoutSidebar></LayoutSidebar>
                    </div>
                    <div className="w-[calc(84%-1px)] h-[95vh]">
                        <Outlet></Outlet>
                    </div>
                </div>
            )}
        </div>
    );
};