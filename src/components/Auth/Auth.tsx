import {useNavigate} from "react-router-dom";
import {useLoginRequestMutation, useRegisterRequestMutation} from "../../api/testApi.ts";
import React, {FormEvent, useState} from "react";

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

            </div>
        </motion.div>
    );
};