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
        username: ''
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
        username: string
    }) => {

        if (authFuncType == 'login') {
            try {
                const response = await loginToAccount({
                    email: values.email,
                    password: values.password,
                    username: values.username,
                }).unwrap();

                if (response.access_token) {
                    // Перенес сохранение токена и имени пользователя сюда
                    const jwtToken = response.access_token; // В реальном приложении token должен приходить с сервера
                    const userName = values.username; // Используем имя из формы

                    localStorage.setItem('authToken', jwtToken);
                    localStorage.setItem('username', userName);

                    navigate('/');
                } else {
                    alert('Ошибка');
                }
            } catch (error) {
                alert('Произошла ошибка при регистрации');
                console.error(error);
            }
        }
        if (authFuncType == 'register') {
            try {
                const response = await createAccount({
                    email: values.email,
                    password: values.password,
                    username: values.username,
                }).unwrap();

                if (response.access_token) {
                    // Перенес сохранение токена и имени пользователя сюда
                    const jwtToken = response.access_token; // В реальном приложении token должен приходить с сервера
                    const userName = values.username; // Используем имя из формы

                    localStorage.setItem('authToken', jwtToken);
                    localStorage.setItem('username', userName);

                    navigate('/');
                } else {
                    alert('Ошибка');
                }
            } catch (error) {
                alert('Произошла ошибка при регистрации');
                console.error(error);
            }
        }


    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onAuth(formValues);
    };

    return (
        <div className="h-[100vh] w-[100vw] flex flex-col ">
            <div className="flex h-screen items-center justify-center gap-[20px]">
                <form
                    className="flex flex-col gap-[20px] border-1 border-black p-[20px] rounded-[15px]"
                    onSubmit={handleSubmit} // Добавлен обработчик submit
                >
                    <label
                        className="font-[Inter]"
                        htmlFor="username"
                    >Username</label> {/* Добавлено поле username */}
                    <input
                        className="font-[Inter]"
                        name="username"
                        type="text"
                        value={formValues.username}
                        onChange={handleInputChange}
                    />
                    <label
                        className="font-[Inter]"
                        htmlFor="password"
                    >Password</label>
                    <input
                        className="font-[Inter]"
                        name="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                    />
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
                    <button
                        className="mt-[20px] font-[Inter]"
                        onClick={() => {
                            setAuthFuncType('register');
                        }}
                        type="submit"
                        disabled={isRegisterLoading} // Добавлена блокировка кнопки при загрузке
                    >
                        {isRegisterLoading ? 'Загрузка...' : 'Зарегистрироваться'}
                    </button>
                    <button
                        className="mt-[20px] font-[Inter]"
                        onClick={() => {
                            setAuthFuncType('login');
                        }}
                        type="submit"
                        disabled={isLoginLoading} // Добавлена блокировка кнопки при загрузке
                    >
                        {isRegisterLoading ? 'Загрузка...' : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    );
};