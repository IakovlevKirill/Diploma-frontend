import React from 'react';
import avatar_example from "../../../assets/images/avatar_example.png";
import mail from "../../../assets/images/Mail.png";
import {useNavigate} from 'react-router-dom';
import {motion} from "framer-motion";

export const Profile = () => {

    const navigate = useNavigate();

    const OnLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        navigate('/auth');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
        >
            <div className="w-[50%] font-[Inter] text-[#FFF]">
                <div className="p-[50px] flex flex-col gap-[20px]">
                    <span className="font-[Inter] text-[#FFF] text-[40px]">Profile</span>
                    <div className=" rounded-[10px] bg-[#161A1E] border-[1px] p-[30px] border-[#505356]">
                        <div className="flex flex-row w-full justify-between items-center bg-[#161A1E] focus:outline-none">
                            <div className="flex flex-row gap-[30px] items-center ">
                                <img className="w-[80px] h-[80px]" src={avatar_example} alt=""/>
                                <div className="flex flex-col">
                                    <div className="text-[#FFF] font-[Inter] font-semibold text-[24px]">Steve Jobs</div>
                                    <div className="text-[#A8A9AC] font-[Inter] font-regular text-[12px]">Maintainer</div>
                                </div>
                            </div>
                            <button
                                onClick={OnLogout}
                                className="bg-gradient-to-b from-[#646D79] to-[#495059] text-[#FFF] font-[Inter]
                                 font-medium text-[16px] px-[41.5px] py-[15.5px] rounded-[10px] outline-none border-[1px]
                                  border-[#838992] cursor-pointer">
                                Logout
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row rounded-[10px] bg-[#161A1E] border-[1px] p-[30px] border-[#505356]">
                        <div className="flex flex-col w-[50%] ">
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter] font-semibold text-[16px] py-[14px]">Old password</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px]
                                 bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={mail} alt=""/>
                                    </div>
                                    <input
                                        name="old_password"
                                        type="text"
                                        placeholder="old password"
                                        className="flex px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575f69] rounded-[10px]
                                     bg-[#1F2A37] text-[#FFF] font-[Inter] font-medium text-[20px] focus:outline-none">
                                    </input>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter] font-semibold text-[16px] py-[14px]">Change password</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px]
                                 bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={mail} alt=""/>
                                    </div>
                                    <input
                                        name="new_password"
                                        type="text"
                                        placeholder="new password"
                                        className="flex px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575f69] rounded-[10px]
                                     bg-[#1F2A37] text-[#FFF] font-[Inter] font-medium text-[20px] focus:outline-none">
                                    </input>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter] font-semibold text-[16px] py-[14px]">Confirm new password</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px]
                                 bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={mail} alt=""/>
                                    </div>
                                    <input
                                        name="new_password_confirm"
                                        type="text"
                                        placeholder="confirm new password"
                                        className="flex px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575f69] rounded-[10px]
                                     bg-[#1F2A37] text-[#FFF] font-[Inter] font-medium text-[20px] focus:outline-none">
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-[50%] items-end justify-end">
                            <div>
                                <button className="
                                bg-gradient-to-b from-[#4CAF72] to-[#3E945F] text-[#FFF] font-[Inter]
                                 font-medium text-[16px] px-[41.5px] py-[15.5px] rounded-[10px] outline-none border-[1px]
                                  border-[#78C294] cursor-pointer">Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};