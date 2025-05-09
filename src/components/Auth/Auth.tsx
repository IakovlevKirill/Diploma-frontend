import {useNavigate} from "react-router-dom";
import {useLoginRequestMutation, useRegisterRequestMutation} from "../../api/testApi.ts";
import React, {FormEvent, useState} from "react"; // Добавлен импорт useState и FormEvent
import mail from "../../assets/images/Mail.png"
import {motion} from "framer-motion";

export const Auth = () => {

    const navigate = useNavigate();

    const [authFuncType, setAuthFuncType] = useState<string>('login')

    const [createAccount, { isLoading : isRegisterLoading }] = useRegisterRequestMutation();
    const [loginToAccount, { isLoading : isLoginLoading }] = useLoginRequestMutation();

    // Добавлено состояние для хранения значений формы
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onAuth = async (values: {
        email: string,
        password: string,
        password_confirmation: string
    }) => {

        if (authFuncType == 'login') {
            try {
                const response = await loginToAccount({
                    email: values.email,
                    password: values.password,
                }).unwrap();

                if (response.access_token) {
                    // Перенес сохранение токена и имени пользователя сюда
                    const jwtToken = response.access_token; // В реальном приложении token должен приходить с сервера

                    localStorage.setItem('authToken', jwtToken);
                    localStorage.setItem('userId', response.id);

                    navigate('/projects');
                } else {
                    console.log('Ошибка');
                }
            } catch (error) {
                console.log('Произошла ошибка при регистрации');
                console.error(error);
            }
        }
        if (authFuncType == 'register' && values.password == values.password_confirmation) {
            try {
                const response = await createAccount({
                    email: values.email,
                    password: values.password,
                }).unwrap();

                if (response.access_token) {
                    // Перенес сохранение токена и имени пользователя сюда
                    const jwtToken = response.access_token; // В реальном приложении token должен приходить с сервера

                    localStorage.setItem('authToken', jwtToken);
                    localStorage.setItem('userId', response.id);

                    navigate('/projects');
                } else {
                    console.log('Ошибка');
                }
            } catch (error) {
                console.log('Произошла ошибка при регистрации');
                console.error(error);
            }
        }


    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onAuth(formValues);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className=""
        >
            <div className="h-screen w-screen relative items-center justify-center flex flex-col bg-gradient-to-t from-[#65CBE2] to-[#1D2237]">
                {/*
            {isRegisterLoading || isLoginLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
            )}
            */}
                <form
                    hidden={authFuncType == 'register'}
                    onSubmit={handleSubmit}>
                    <div className="flex flex-col border-[1px] border-[#515865] border-b-0 p-[19px] rounded-[15px] rounded-b-none bg-[rgba(17,25,40,0.5)] backdrop-blur-md">
                        <div className="text-[#FFF] font-[Inter] font-semebold text-[24px]">Login</div>
                    </div>
                    <div
                        className="flex flex-col gap-[20px] border-[1px] border-[#515865] rounded-[15px] rounded-t-none bg-[rgba(17,25,40,0.5)] backdrop-blur-md"
                    >
                        <div className="flex flex-col py-[43px] px-[43px] gap-[17px]">
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter] font-semibold text-[16px] py-[14px]">Email</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px] bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={mail} alt=""/>
                                    </div>
                                    <input
                                        name="email"
                                        type="text"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                        placeholder="Placeholder"
                                        className="flex w-[422px] h-[40px] px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575F69] rounded-[10px] bg-[#1F2A37] text-[#FFF] font-[Inter] font-medium text-[20px] focus:outline-none">

                                    </input>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter] font-semibold text-[16px] py-[14px]">Password</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px] bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={mail} alt=""/>
                                    </div>
                                    <input
                                        name="password"
                                        type="text"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                        placeholder="Placeholder"
                                        className="flex w-[422px] h-[40px] px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575F69] rounded-[10px] bg-[#1F2A37] text-[#FFF] font-[Inter] font-medium text-[20px] focus:outline-none">

                                    </input>
                                </div>
                            </div>
                            <div className="pl-[11px] py-[13px] flex flex-row items-center gap-[13px]">
                                <input type="checkbox" className="color-[#1F2A37] rounded-[5px] h-[25px] w-[25px]"/>
                                <div className="text-[#FFF] font-[Inter] font-semibold text-[20px]">Stay logged in</div>
                            </div>
                            <div className="py-[16.5px] flex flex-row justify-between">
                                <div className="flex flex-col items-start">
                                    <div className="text-[#FFF] font-[Inter] font-semibold text-[20px]">Doesn’t have account?</div>
                                    <a onClick={()=>{
                                        setAuthFuncType("register");
                                    }} className="text-[#6BFFA4] font-[Inter] font-semibold text-[20px] cursor-pointer">Register</a>
                                </div>
                                <button className="bg-gradient-to-b from-[#4CAF72] to-[#3E945F] text-[#FFF] font-[Inter] font-medium text-[16px] px-[35.5px] py-[15.5px] rounded-[10px] outline-none border-[1px] border-[#76BF92] cursor-pointer">
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <form
                    hidden={authFuncType == 'login'}
                    onSubmit={handleSubmit}>
                    <div className="flex flex-col border-[1px] border-[#515865] border-b-0 p-[19px] rounded-[15px] rounded-b-none bg-[rgba(17,25,40,0.5)] backdrop-blur-md">
                        <div className="text-[#FFF] font-[Inter] font-semebold text-[24px]">Register</div>
                    </div>
                    <div
                        className="flex flex-col gap-[20px] border-[1px] border-[#515865] rounded-[15px] rounded-t-none bg-[rgba(17,25,40,0.5)] backdrop-blur-md"
                    >
                        <div className="flex flex-col py-[43px] px-[43px] gap-[17px]">
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter] font-semibold text-[16px] py-[14px]">Email</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px] bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={mail} alt=""/>
                                    </div>
                                    <input
                                        name="email"
                                        type="text"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                        placeholder="Placeholder" className="flex w-[422px] h-[40px] px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575F69] rounded-[10px] bg-[#1F2A37] text-[#FFF] font-[Inter] font-medium text-[20px] focus:outline-none">

                                    </input>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter] font-semibold text-[16px] py-[14px]">Password</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px] bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={mail} alt=""/>
                                    </div>
                                    <input
                                        name="password"
                                        type="text"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                        placeholder="Placeholder"
                                        className="flex w-[422px] h-[40px] px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575F69] rounded-[10px] bg-[#1F2A37] text-[#FFF] font-[Inter] font-medium text-[20px] focus:outline-none">

                                    </input>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter] font-semibold text-[16px] py-[14px]">Confirm password</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px] bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={mail} alt=""/>
                                    </div>
                                    <input
                                        name="password_confirmation"
                                        type="text"
                                        value={formValues.password_confirmation}
                                        onChange={handleInputChange}
                                        placeholder="Placeholder"
                                        className="flex w-[422px] h-[40px] px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575F69] rounded-[10px] bg-[#1F2A37] text-[#FFF] font-[Inter] font-medium text-[20px] focus:outline-none">

                                    </input>
                                </div>
                            </div>
                            <div className="pl-[11px] py-[13px] flex flex-row items-center gap-[13px]">
                                <input type="checkbox" className="color-[#1F2A37] rounded-[5px] h-[25px] w-[25px]"/>
                                <div className="text-[#FFF] font-[Inter] font-semibold text-[20px]">Accept TOS</div>
                            </div>
                            <div className="py-[16.5px] flex flex-row justify-between">
                                <div className="flex flex-col">
                                    <div className="text-[#FFF] font-[Inter] font-semibold text-[20px]">Already registered?</div>
                                    <a onClick={()=>{
                                        setAuthFuncType("login");
                                    }} className="text-[#6BFFA4] font-[Inter] font-semibold text-[20px] cursor-pointer">Login</a>
                                </div>
                                <button className="bg-gradient-to-b from-[#4CAF72] to-[#3E945F] text-[#FFF] font-[Inter] font-medium text-[16px] px-[35.5px] py-[15.5px] rounded-[10px] outline-none border-[1px] border-[#76BF92] cursor-pointer">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};