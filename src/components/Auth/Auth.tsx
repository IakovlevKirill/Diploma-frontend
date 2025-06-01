import {useNavigate} from "react-router-dom";
import {useLoginRequestMutation, useRegisterRequestMutation} from "../../api/testApi.ts";
import React, {FormEvent, useState} from "react"; // Добавлен импорт useState и FormEvent
import {images} from '../../assets/images/images'
import {motion} from "framer-motion";
import {useDocumentTitle} from "../../app/hooks.ts";
import {LayoutBar} from "../LayoutBar.tsx";
import {PulseLoader} from "react-spinners";

export const Auth = () => {

    useDocumentTitle(`Auth - WebNode`);

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

                if (response.result == "success") {

                    localStorage.setItem('authToken', response.data.access_token);
                    localStorage.setItem('userId', response.data.id);
                    localStorage.setItem('userEmail', values.email);

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

                if (response.result == "success") {

                    localStorage.setItem('authToken', response.data.access_token);
                    localStorage.setItem('userId', response.data.id);
                    localStorage.setItem('userEmail', values.email);

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
            className="h-screen w-screen flex flex-col"
        >
            <LayoutBar></LayoutBar>
            <div className="h-[95%] relative items-center justify-center flex flex-col bg-gradient-to-t from-[#65CBE2] to-[#1D2237]">
                <form hidden={!(authFuncType == 'login')} onSubmit={handleSubmit}>
                    <div className="flex flex-col border-[1px] border-[#515865] border-b-0 p-[15px] rounded-[15px] rounded-b-none bg-[rgba(17,25,40,0.5)] backdrop-blur-md">
                        <div className="text-[#FFF] font-[Inter-semibold] text-[20px]">Login</div>
                    </div>
                    <div className="flex flex-col gap-[20px] border-[1px] border-[#515865] rounded-[15px] rounded-t-none bg-[rgba(17,25,40,0.5)] backdrop-blur-md">
                        <div className="flex flex-col p-[30px] gap-[17px]">
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter-semibold] text-[14px] py-[14px]">Email</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px] bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={images.mail} alt=""/>
                                    </div>
                                    <input
                                        name="email"
                                        type="text"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                        placeholder="Placeholder"
                                        className="flex px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575F69] rounded-[10px] bg-[#1F2A37] text-[#FFF] font-[Inter-medium] text-[16px] focus:outline-none">
                                    </input>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter-semibold] text-[14px] py-[14px]">Password</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px] bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={images.mail} alt=""/>
                                    </div>
                                    <input
                                        name="password"
                                        type="text"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                        placeholder="Placeholder"
                                        className="flex px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575F69] rounded-[10px] bg-[#1F2A37] text-[#FFF] font-[Inter-medium] text-[16px] focus:outline-none">
                                    </input>
                                </div>
                            </div>
                            <div className="py-[16.5px] flex flex-row justify-between">
                                <div className="flex flex-col items-start">
                                    <div className="text-[#FFF] font-[Inter-semibold] text-[16px]">Doesn’t have account?</div>
                                    <a onClick={()=>{
                                        setAuthFuncType("register");
                                    }} className="text-[#6BFFA4] font-[Inter-semibold] text-[16px] cursor-pointer">Register</a>
                                </div>
                                <button className="
                                bg-gradient-to-b
                                from-[#4CAF72]
                                to-[#3E945F]
                                text-[#FFF] font-[Inter-medium] text-[14px] px-[25px] h-[40px] rounded-[10px] outline-none border-[1px] border-[#76BF92] cursor-pointer flex items-center justify-center"
                                    disabled={isRegisterLoading || isLoginLoading}
                                >
                                    {isRegisterLoading || isLoginLoading ? (
                                        <PulseLoader
                                            color={'#FFFFFF'}
                                            size={6}
                                        />
                                    ) : (
                                        <div>
                                            Login
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <form hidden={!(authFuncType == 'register')} onSubmit={handleSubmit}>
                    <div className="flex flex-col border-[1px] border-[#515865] border-b-0 p-[15px] rounded-[15px] rounded-b-none bg-[rgba(17,25,40,0.5)] backdrop-blur-md">
                        <div className="text-[#FFF] font-[Inter-semibold] text-[20px]">Register</div>
                    </div>
                    <div className="flex flex-col gap-[20px] border-[1px] border-[#515865] rounded-[15px] rounded-t-none bg-[rgba(17,25,40,0.5)] backdrop-blur-md">
                        <div className="flex flex-col p-[30px] gap-[17px]">
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter-semibold] text-[14px] py-[14px]">Email</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px] bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={images.mail} alt=""/>
                                    </div>
                                    <input
                                        name="email"
                                        type="text"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                        placeholder="Placeholder"
                                        className="flex px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575F69] rounded-[10px] bg-[#1F2A37] text-[#FFF] font-[Inter-medium] text-[16px] focus:outline-none">

                                    </input>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter-semibold] text-[14px] py-[14px]">Password</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px] bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={images.mail} alt=""/>
                                    </div>
                                    <input
                                        name="password"
                                        type="text"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                        placeholder="Placeholder"
                                        className="flex px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575F69] rounded-[10px] bg-[#1F2A37] text-[#FFF] font-[Inter-medium] text-[16px] focus:outline-none">
                                    </input>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter-semibold] text-[14px] py-[14px]">Confirm password</div>
                                <div className="flex flex-row">
                                    <div className="p-[12px] border-[#575F69] rounded-[10px] rounded-r-none border-r-0 border-[1px] bg-[#1F2A37] flex items-center justify-center cursor-pointer">
                                        <img src={images.mail} alt=""/>
                                    </div>
                                    <input
                                        name="password_confirmation"
                                        type="text"
                                        value={formValues.password_confirmation}
                                        onChange={handleInputChange}
                                        placeholder="Placeholder"
                                        className="flex px-[12px] py-[8px] border-[1px] rounded-l-none  border-[#575F69] rounded-[10px] bg-[#1F2A37] text-[#FFF] font-[Inter-medium] text-[16px] focus:outline-none">
                                    </input>
                                </div>
                            </div>
                            <div className="py-[16.5px] flex flex-row justify-between">
                                <div className="flex flex-col">
                                    <div className="text-[#FFF] font-[Inter-semibold] text-[16px]">Already registered?</div>
                                    <a onClick={()=>{
                                        setAuthFuncType("login");
                                    }} className="text-[#6BFFA4] font-[Inter-semibold] text-[16px] cursor-pointer">Login</a>
                                </div>
                                <button
                                    className="
                                    bg-gradient-to-b
                                    from-[#4CAF72]
                                    to-[#3E945F]
                                    text-[#FFF] font-[Inter-medium] text-[14px] px-[25px] h-[40px] rounded-[10px] outline-none border-[1px] border-[#76BF92] cursor-pointer flex items-center justify-center"
                                    disabled={isRegisterLoading || isLoginLoading}
                                >
                                    {isRegisterLoading || isLoginLoading ? (
                                        <PulseLoader
                                            color={'#FFFFFF'}
                                            size={6}
                                        />
                                    ) : (
                                        <div>
                                            Register
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};