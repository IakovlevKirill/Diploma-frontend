import {useNavigate} from "react-router-dom";
import {useLoginRequestMutation, useRegisterRequestMutation} from "../api/testApi.ts";
import {FormEvent, useState} from "react"; // Добавлен импорт useState и FormEvent

export const Auth = () => {

    const navigate = useNavigate();

    const [authFuncType, setAuthFuncType] = useState<string>('login')

    const [createAccount, { isLoading : isRegisterLoading }] = useRegisterRequestMutation();
    const [loginToAccount, { isLoading : isLoginLoading }] = useLoginRequestMutation();

    // Добавлено состояние для хранения значений формы
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
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

                    navigate('/');
                } else {
                    console.log('Ошибка');
                }
            } catch (error) {
                console.log('Произошла ошибка при регистрации');
                console.error(error);
            }
        }
        if (authFuncType == 'register') {
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

                    navigate('/');
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
        //bg-[url('../../../../src/assets/images/bg.png')]
        <div className="h-[100vh] w-[100vw] flex flex-col ">
            <div className="flex h-screen items-center justify-center gap-[20px]">
                <form
                    className="flex flex-col gap-[20px] border-0 border-black shadow-[0px_6px_6px_6px_rgba(0,_0,_0,_0.1)] p-[20px] py-[40px] rounded-[15px] bg-[#FFF]"
                    onSubmit={handleSubmit} // Добавлен обработчик submit
                >
                    <div className="flex flex-col gap-[10px]">
                        <label
                            className="font-[Inter] text-[18px]"
                            htmlFor="password"
                        >Password</label>
                        <input
                            className="font-[Inter]"
                            name="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label
                            className="font-[Inter]"
                            htmlFor="email"
                        >Email</label>
                        <input
                            className="font-[Inter]"
                            name="email"
                            type="text"
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px] items-center">
                        <button
                            className="font-[Inter] w-1/2 cursor-pointer"
                            onClick={() => {
                                setAuthFuncType('login');
                            }}
                            type="submit"
                            disabled={isLoginLoading} // Добавлена блокировка кнопки при загрузке
                        >
                            {isRegisterLoading ? 'Загрузка...' : 'Войти'}
                        </button>
                        <span className="font-[Inter]">или</span>
                        <button
                            className="font-[Inter] w-auto cursor-pointer"
                            onClick={() => {
                                setAuthFuncType('register');
                            }}
                            type="submit"
                            disabled={isRegisterLoading} // Добавлена блокировка кнопки при загрузке
                        >
                            {isRegisterLoading ? 'Загрузка...' : 'Зарегистрироваться'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};