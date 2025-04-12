import {useNavigate} from "react-router-dom";


export const Auth = () => {

    const navigate = useNavigate();

    const OnAuth = () => {

        const jwtToken = 'test_token'
        const userName = 'test_user'

        localStorage.setItem('authToken', jwtToken);
        localStorage.setItem('username', userName);

        navigate('/')
    };

    return (
        <div className="h-[100vh] w-[100vw] flex flex-col ">
            <span className="text-[30px] font-[Inter] absolute left-[5%] top-[5%] select-none">Auth</span>
            <div className="flex items-center justify-center gap-[20px]">
                <button
                    onClick={OnAuth}
                    className="mt-[20%] font-[Inter] border-0 bg-[#FFFFFF] cursor-pointer hover:text-[#0d99ff] underline">
                    Войти
                </button>
            </div>
        </div>
    );
};