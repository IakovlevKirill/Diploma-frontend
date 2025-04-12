import {useNavigate} from "react-router-dom";


export const Menu = () => {

    const navigate = useNavigate();

    const OnLogout = () => {

        localStorage.removeItem('authToken');
        navigate('/auth')
    };

    return (
        <div className="h-[100vh] w-[100vw] flex flex-col ">
            <span className="text-[30px] font-[Inter] absolute left-[5%] top-[5%] select-none">Menu</span>
            <div className="flex items-center justify-center gap-[20px]">
                <button
                    onClick={OnLogout}
                    className="mt-[20%] font-[Inter] border-0 bg-[#FFFFFF] cursor-pointer hover:text-[#0d99ff] underline">
                    Выйти
                </button>
                <button
                    onClick={ ()=>{
                        navigate('/dashboard')
                    }}
                    className="mt-[20%] font-[Inter] border-0 bg-[#FFFFFF] cursor-pointer hover:text-[#0d99ff] underline">
                    Создать проект
                </button>
            </div>
        </div>
    );
};
