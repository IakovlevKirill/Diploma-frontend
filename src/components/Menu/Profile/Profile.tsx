import React, {FormEvent, useState} from 'react';
import {images} from "../../../assets/images/images.ts";
import {useNavigate} from 'react-router-dom';
import {motion} from "framer-motion";
import {useChangeUserPasswordMutation, useGetUserByIdQuery} from "../../../api/testApi.ts";
import {useAppSelector, useDocumentTitle} from "../../../app/hooks.ts";


export const Profile = () => {

    const [changePassword] = useChangeUserPasswordMutation()

    const current_user_userId = useAppSelector((state) => state.userId.userId);

    const navigate = useNavigate();

    const {data: user_data, isLoading} = useGetUserByIdQuery(current_user_userId)

    useDocumentTitle(`${user_data?.email} Profile - WebNode`);

    const firstLetter = user_data?.email?.charAt(0).toUpperCase()

    const OnLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        navigate('/auth');
    };

    const [formValues, setFormValues] = useState({
        old_password: '',
        new_password: '',
        new_password_confirm: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const OnChangePassword = async (values: {
        old_password: string,
        new_password: string,
    }) => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            try {
                const response = await changePassword({
                    userId: userId,
                    old_password: values.old_password,
                    new_password: values.new_password,
                }).unwrap()
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                if (response) {
                    console.log('success');
                } else {
                    console.log('error');
                }
            } catch (error) {
                console.log('Произошла ошибка при регистрации');
                console.error(error);
            }

        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        OnChangePassword(formValues);
    };

    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full"
        >
            <div className="w-[50%] text-[#FFF]">
                <div className="p-[50px] flex flex-col gap-[20px]">
                    <span className="font-[Inter-semibold] text-[#FFF] text-[40px]">Profile</span>
                    <div className=" rounded-[10px] bg-[#161A1E] border-[1px] p-[30px] border-[#505356]">
                        <div className="flex flex-row w-full justify-between items-center bg-[#161A1E] focus:outline-none">
                            <div className="flex flex-row gap-[30px] items-center ">
                                <div className="flex items-center justify-center w-[80px] h-[80px] bg-[#252B3B]  rounded-[100px]">
                                    <span className="text-[#FFF] font-[Inter-medium]  text-[30px]">{firstLetter}</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-[#FFF] font-[Inter-medium] text-[24px]">{user_data?.email}</div>
                                    <div className="text-[#A8A9AC] font-[Inter-normal] text-[16px]">{user_data?.role}</div>
                                </div>
                            </div>
                            <button
                                onClick={OnLogout}
                                className="bg-gradient-to-b from-[#646D79] to-[#495059] text-[#FFF]
                                 font-[Inter-medium]
                                 text-[16px] px-[41.5px] py-[15.5px] rounded-[10px] outline-none border-[1px]
                                  border-[#838992] cursor-pointer">
                                Logout
                            </button>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-row rounded-[10px] bg-[#161A1E] border-[1px] p-[30px] border-[#505356]">
                        <div className="flex flex-col w-[50%] ">
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter-semibold] text-[16px] py-[14px]">Old password</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px]
                                 bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={images.mail} alt=""/>
                                    </div>
                                    <input
                                        name="old_password"
                                        type="text"
                                        value={formValues.old_password}
                                        onChange={handleInputChange}
                                        placeholder="old password"
                                        className="flex px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575f69] rounded-[10px]
                                     bg-[#1F2A37] text-[#FFF] font-[Inter-semibold] text-[20px] focus:outline-none">
                                    </input>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter-semibold] text-[16px] py-[14px]">Change password</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px]
                                 bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={images.mail} alt=""/>
                                    </div>
                                    <input
                                        name="new_password"
                                        type="text"
                                        value={formValues.new_password}
                                        onChange={handleInputChange}
                                        placeholder="new password"
                                        className="flex px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575f69] rounded-[10px]
                                     bg-[#1F2A37] text-[#FFF] font-[Inter-semibold] text-[20px] focus:outline-none">
                                    </input>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter-semibold] text-[16px] py-[14px]">Confirm new password</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px]
                                 bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={images.mail} alt=""/>
                                    </div>
                                    <input
                                        name="new_password_confirm"
                                        type="text"
                                        value={formValues.new_password_confirm}
                                        onChange={handleInputChange}
                                        placeholder="new password"
                                        className="flex px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575f69] rounded-[10px]
                                     bg-[#1F2A37] text-[#FFF] font-[Inter-semibold] text-[20px] focus:outline-none">
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-[50%] items-end justify-end">
                            <div>
                                <button
                                    type="submit"
                                    className="
                                bg-gradient-to-b from-[#4CAF72] to-[#3E945F] text-[#FFF]
                                 font-[Inter-medium] text-[16px] px-[41.5px] py-[15.5px] rounded-[10px] outline-none border-[1px]
                                  border-[#78C294] cursor-pointer">Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};